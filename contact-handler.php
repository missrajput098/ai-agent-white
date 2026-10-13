<?php
/**
 * Factonix Technologies — Contact & AI Agent Configurator Form Handler
 * Validates form input, logs enquiries on the server, and conditionally sends
 * a confirmation email to the user ONLY when "Get response on email" is checked.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// ==========================================
// Optional SMTP Configuration (For Localhost / XAMPP / Gmail SMTP)
// If SMTP_USERNAME & SMTP_PASSWORD are set, emails are sent via authenticated SMTP.
// Otherwise, PHP's native mail() function is used automatically.
// ==========================================
const SMTP_HOST       = 'smtp.gmail.com';
const SMTP_PORT       = 465; // 465 for SSL, 587 for TLS
const SMTP_USERNAME   = '';  // e.g. 'your-email@gmail.com' (or set via env FACTONIX_SMTP_USER)
const SMTP_PASSWORD   = '';  // e.g. 16-char Gmail App Password (or set via env FACTONIX_SMTP_PASS)
const SMTP_FROM_EMAIL = 'no-reply@factonix.com';
const SMTP_FROM_NAME  = 'Factonix Technologies';

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Please submit the form using POST.'
    ]);
    exit;
}

// Support both standard FormData / URL-encoded POST and JSON request payloads
$input = $_POST;
if (empty($input)) {
    $rawBody = file_get_contents('php://input');
    if (!empty($rawBody)) {
        $decoded = json_decode($rawBody, true);
        if (is_array($decoded)) {
            $input = $decoded;
        }
    }
}

/**
 * Sanitize single-line text input and strip control characters / header injection
 */
function sanitize_text(string $value, int $maxLength = 255): string
{
    $clean = trim(strip_tags($value));
    $clean = str_replace(["\r", "\n", "\0"], ' ', $clean);
    $clean = preg_replace('/\s+/', ' ', $clean) ?? $clean;
    if (function_exists('mb_substr')) {
        return mb_substr($clean, 0, $maxLength, 'UTF-8');
    }
    return substr($clean, 0, $maxLength);
}

/**
 * Native PHP SMTP Mailer (Zero external dependencies)
 */
function send_via_smtp(
    string $toEmail,
    string $subject,
    string $htmlBody,
    string $smtpHost,
    int $smtpPort,
    string $smtpUser,
    string $smtpPass,
    string $fromEmail,
    string $fromName
): bool {
    $remote = ($smtpPort === 465 ? 'ssl://' : '') . $smtpHost . ':' . $smtpPort;
    $errno = 0;
    $errstr = '';
    $socket = @stream_socket_client($remote, $errno, $errstr, 12);
    if (!$socket) {
        return false;
    }

    stream_set_timeout($socket, 12);

    $readResponse = static function ($fp): string {
        $data = '';
        while ($str = fgets($fp, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') {
                break;
            }
        }
        return $data;
    };

    $sendCmd = static function ($fp, string $cmd) use ($readResponse): string {
        fwrite($fp, $cmd . "\r\n");
        return $readResponse($fp);
    };

    $greeting = $readResponse($socket);
    if (strpos($greeting, '220') !== 0) {
        fclose($socket);
        return false;
    }

    $ehlo = $sendCmd($socket, 'EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    if ($smtpPort === 587 && strpos($ehlo, 'STARTTLS') !== false) {
        $tlsResp = $sendCmd($socket, 'STARTTLS');
        if (strpos($tlsResp, '220') !== 0) {
            fclose($socket);
            return false;
        }
        if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }
        $sendCmd($socket, 'EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    }

    $authResp = $sendCmd($socket, 'AUTH LOGIN');
    if (strpos($authResp, '334') !== 0) {
        fclose($socket);
        return false;
    }
    $userResp = $sendCmd($socket, base64_encode($smtpUser));
    if (strpos($userResp, '334') !== 0) {
        fclose($socket);
        return false;
    }
    $passResp = $sendCmd($socket, base64_encode($smtpPass));
    if (strpos($passResp, '235') !== 0) {
        fclose($socket);
        return false;
    }

    $senderAddress = filter_var($smtpUser, FILTER_VALIDATE_EMAIL) ? $smtpUser : $fromEmail;
    if (strpos($sendCmd($socket, "MAIL FROM:<{$senderAddress}>"), '250') !== 0) {
        fclose($socket);
        return false;
    }
    if (strpos($sendCmd($socket, "RCPT TO:<{$toEmail}>"), '250') !== 0) {
        fclose($socket);
        return false;
    }
    if (strpos($sendCmd($socket, 'DATA'), '354') !== 0) {
        fclose($socket);
        return false;
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        'Date: ' . date('r'),
        "To: <{$toEmail}>",
        "From: {$fromName} <{$senderAddress}>",
        "Reply-To: {$senderAddress}",
        "Subject: {$encodedSubject}",
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
    $dataResp = $sendCmd($socket, $payload);
    $sendCmd($socket, 'QUIT');
    fclose($socket);

    return strpos($dataResp, '250') === 0;
}

// Known service labels map
$serviceLabels = [
    'build-my-agent'      => 'Build My Agent — Custom AI Agent Pod',
    'sales-ai'            => 'Sales & Lead Qualification AI (LEADR-3000)',
    'customer-support-ai' => 'Customer Support AI (SUPPORTR-X)',
    'social-automation'   => 'Social Media DM Automation (INSTAGUARD)',
    'ai-automation'       => 'AI Workflow Automation (DISPATCH-BOT)',
    'whatsapp-automation' => 'WhatsApp Business AI Automation',
    'ecommerce'           => 'E-commerce AI Automation',
    'web-development'     => 'AI-Powered Web Development',
    'voice-ai'            => 'Autonomous Voice AI Agent (VOICE-NEXUS)',
    'data-intelligence'   => 'Enterprise Data Intelligence AI (DATAFLEX)',
    'book-demo'           => 'Live Architecture Demo & Strategy Call',
];

// Extract & sanitize form fields
$fullName      = sanitize_text((string)($input['full_name'] ?? ''), 120);
$workEmailRaw  = trim((string)($input['work_email'] ?? ''));
$workEmail     = str_replace(["\r", "\n", "\0"], '', filter_var($workEmailRaw, FILTER_SANITIZE_EMAIL) ?: '');
$companyName   = sanitize_text((string)($input['company_name'] ?? ''), 150);
$serviceSlug   = sanitize_text((string)($input['service'] ?? $input['service_slug'] ?? ''), 80);
$agentCode     = sanitize_text((string)($input['agent_code'] ?? 'CUSTOM-POD'), 60);
$teamSize      = sanitize_text((string)($input['team_size'] ?? '1 - 10 Employees'), 80);
$platform      = sanitize_text((string)($input['platform'] ?? 'HubSpot & Salesforce'), 120);
$knowledgeBase = sanitize_text((string)($input['knowledge_base'] ?? 'Company SOPs & PDFs'), 120);
$projectNotes  = sanitize_text((string)($input['project_notes'] ?? ''), 1000);

// Check "Get response on email" checkbox state
$rawCheckbox = $input['get_email_response'] ?? null;
$getEmailResponse = false;
if ($rawCheckbox !== null) {
    $normalizedCheck = strtolower(trim((string)$rawCheckbox));
    $getEmailResponse = in_array($normalizedCheck, ['1', 'true', 'on', 'yes'], true);
}

// ==========================================
// Server-Side Validation
// ==========================================
$errors = [];

if ($fullName === '' || strlen($fullName) < 2) {
    $errors['full_name'] = 'Please enter your full name (at least 2 characters).';
} elseif (!preg_match("/^[\p{L}\p{M}\s'.\-]+$/u", $fullName)) {
    $errors['full_name'] = 'Please enter a valid full name.';
}

if ($workEmail === '' || !filter_var($workEmail, FILTER_VALIDATE_EMAIL)) {
    $errors['work_email'] = 'Please enter a valid work email address.';
}

if ($companyName === '' || strlen($companyName) < 2) {
    $errors['company_name'] = 'Please enter your company name (at least 2 characters).';
}

if ($serviceSlug === '') {
    $errors['service'] = 'Please select a service or enquiry topic.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => reset($errors),
        'errors'  => $errors,
    ]);
    exit;
}

$serviceTitle = $serviceLabels[$serviceSlug] ?? $serviceSlug;

// ==========================================
// Persist Enquiry Submission on Server
// ==========================================
$submissionRecord = [
    'id'                 => uniqid('fnx_', true),
    'submitted_at'       => gmdate('Y-m-d\TH:i:s\Z'),
    'full_name'          => $fullName,
    'work_email'         => $workEmail,
    'company_name'       => $companyName,
    'service_slug'       => $serviceSlug,
    'service_title'      => $serviceTitle,
    'agent_code'         => $agentCode,
    'platform'           => $platform,
    'knowledge_base'     => $knowledgeBase,
    'team_size'          => $teamSize,
    'project_notes'      => $projectNotes,
    'get_email_response' => $getEmailResponse,
    'ip_address'         => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
];

$storageDir = __DIR__ . DIRECTORY_SEPARATOR . 'submissions';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0755, true);
}
if (is_dir($storageDir) && is_writable($storageDir)) {
    $logFile = $storageDir . DIRECTORY_SEPARATOR . 'enquiries.json';
    $existing = [];
    if (file_exists($logFile)) {
        $rawExisting = @file_get_contents($logFile);
        if (!empty($rawExisting)) {
            $decodedExisting = json_decode($rawExisting, true);
            if (is_array($decodedExisting)) {
                $existing = $decodedExisting;
            }
        }
    }
    $existing[] = $submissionRecord;
    @file_put_contents($logFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

// ==========================================
// Conditional Email Dispatch Based on Checkbox
// ==========================================
$emailSent = false;

if ($getEmailResponse) {
    $safeName      = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $safeCompany   = htmlspecialchars($companyName, ENT_QUOTES, 'UTF-8');
    $safeService   = htmlspecialchars($serviceTitle, ENT_QUOTES, 'UTF-8');
    $safeAgent     = htmlspecialchars($agentCode, ENT_QUOTES, 'UTF-8');
    $safePlatform  = htmlspecialchars($platform, ENT_QUOTES, 'UTF-8');
    $safeKnowledge = htmlspecialchars($knowledgeBase, ENT_QUOTES, 'UTF-8');
    $safeTeam      = htmlspecialchars($teamSize, ENT_QUOTES, 'UTF-8');
    $safeNotes     = $projectNotes !== '' ? htmlspecialchars($projectNotes, ENT_QUOTES, 'UTF-8') : 'None specified';

    $subject = "We received your enquiry regarding {$serviceTitle} | Factonix Technologies";

    $htmlMessage = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Factonix Technologies Enquiry Confirmation</title>
</head>
<body style="margin:0;padding:24px;background-color:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0f172a,#1e3a8a);padding:24px;color:#ffffff;">
            <div style="font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#38bdf8;font-weight:bold;margin-bottom:6px;">
                FACTONIX TECHNOLOGIES // NEURAL AI ARCHITECTURE
            </div>
            <h2 style="margin:0;font-size:20px;color:#ffffff;">Thank you for reaching out to Factonix!</h2>
        </div>
        <div style="padding:24px;line-height:1.6;font-size:15px;color:#334155;">
            <p style="margin-top:0;">Hi <strong>{$safeName}</strong>,</p>
            <p>Thank you for reaching out to <strong>Factonix Technologies</strong>. We have received your enquiry regarding <strong>{$safeService}</strong> and our AI engineering team will get back to you soon.</p>
            <div style="background:#f1f5f9;border-left:4px solid #2563eb;padding:16px;border-radius:8px;margin:20px 0;">
                <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#1d4ed8;margin-bottom:8px;">Your Submitted AI Blueprint Summary</div>
                <p style="margin:4px 0;"><strong>Enquiry Regarding:</strong> {$safeService}</p>
                <p style="margin:4px 0;"><strong>Agent Role Code:</strong> {$safeAgent}</p>
                <p style="margin:4px 0;"><strong>Integration Platform:</strong> {$safePlatform}</p>
                <p style="margin:4px 0;"><strong>Knowledge Source:</strong> {$safeKnowledge}</p>
                <p style="margin:4px 0;"><strong>Company:</strong> {$safeCompany} ({$safeTeam})</p>
                <p style="margin:4px 0;"><strong>Workflow Goal / Notes:</strong> {$safeNotes}</p>
            </div>
            <p style="margin-bottom:0;">Warm regards,<br><strong>Factonix Technologies AI Engineering Team</strong></p>
        </div>
    </div>
</body>
</html>
HTML;

    // Save preview of confirmation email in submissions/ for local inspection
    if (is_dir($storageDir) && is_writable($storageDir)) {
        @file_put_contents($storageDir . DIRECTORY_SEPARATOR . 'last_confirmation_email.html', $htmlMessage);
    }

    $smtpUser = getenv('FACTONIX_SMTP_USER') ?: SMTP_USERNAME;
    $smtpPass = getenv('FACTONIX_SMTP_PASS') ?: SMTP_PASSWORD;
    $smtpHost = getenv('FACTONIX_SMTP_HOST') ?: SMTP_HOST;
    $smtpPort = (int)(getenv('FACTONIX_SMTP_PORT') ?: SMTP_PORT);

    if ($smtpUser !== '' && $smtpPass !== '') {
        $emailSent = send_via_smtp(
            $workEmail,
            $subject,
            $htmlMessage,
            $smtpHost,
            $smtpPort,
            $smtpUser,
            $smtpPass,
            SMTP_FROM_EMAIL,
            SMTP_FROM_NAME
        );
    }

    if (!$emailSent) {
        $serverHost = $_SERVER['HTTP_HOST'] ?? 'factonix.com';
        $serverHost = preg_replace('/[^a-zA-Z0-9.\-]/', '', $serverHost) ?: 'factonix.com';
        if ($serverHost === 'localhost' || filter_var($serverHost, FILTER_VALIDATE_IP)) {
            $serverHost = 'factonix.com';
        }

        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . SMTP_FROM_NAME . " <no-reply@{$serverHost}>",
            "Reply-To: support@{$serverHost}",
            'X-Mailer: PHP/' . phpversion(),
        ];

        $emailSent = @mail($workEmail, $subject, $htmlMessage, implode("\r\n", $headers));
    }

    echo json_encode([
        'success'         => true,
        'email_requested' => true,
        'email_sent'      => (bool)$emailSent,
        'recipient_email' => $workEmail,
        'service_title'   => $serviceTitle,
        'message'         => "Thank you for reaching out to Factonix. We'll get back to you soon.",
        'email_notice'    => $emailSent
            ? "A confirmation email has been sent to {$workEmail}."
            : "Confirmation email queued for {$workEmail} (Configure SMTP_USERNAME & SMTP_PASSWORD in contact-handler.php for localhost email delivery).",
    ]);
    exit;
}

// When "Get response on email" is UNCHECKED: do NOT send any email
echo json_encode([
    'success'         => true,
    'email_requested' => false,
    'email_sent'      => false,
    'service_title'   => $serviceTitle,
    'message'         => "Thank you for reaching out to Factonix. We'll get back to you soon.",
]);
exit;
