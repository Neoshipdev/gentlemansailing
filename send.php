<?php
/**
 * Gentleman Sailing — spracovanie prihlášky
 * Odošle štruktúrovaný e-mail na info@nautitech.sk.
 *
 * Nasadenie: nahrať spolu s webom na PHP hosting (Apache/PHP so zapnutou funkciou mail()).
 * Ak hosting mail() nepodporuje, front-end (prihlaska.js) sa prepne na mailto: fallback.
 */

header('Content-Type: application/json; charset=utf-8');

// ---- Nastavenia ----
$RECIPIENT = 'info@nautitech.sk';
$FROM      = 'info@nautitech.sk';          // odosielateľ musí byť na doméne webu (anti-spam)
$SUBJECT_PREFIX = 'Nová prihláška — Gentleman Sailing 2027';

// ---- Len POST ----
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// ---- Honeypot (anti-spam): skryté pole "website" musí zostať prázdne ----
if (!empty($_POST['website'])) {
    // Bot — potichu "uspejeme", e-mail neodošleme.
    echo json_encode(['ok' => true]);
    exit;
}

// ---- Pomocná funkcia ----
function val($key) {
    return isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
}

// ---- Povinné polia (server-side validácia) ----
$required = [
    'ucast'            => 'Účastnícky poplatok',
    'Názov / Meno'     => 'Názov spoločnosti / Meno',
    'Adresa'           => 'Adresa',
    'Kontaktná osoba'  => 'Kontaktná osoba',
    'Telefón'          => 'Telefón',
    'Email'            => 'Email',
    'GDPR'             => 'Súhlas GDPR',
];
$missing = [];
foreach ($required as $key => $label) {
    if (val($key) === '') { $missing[] = $label; }
}
$email = val('Email');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $missing[] = 'Email (neplatný formát)';
}
if ($missing) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation', 'missing' => $missing], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---- Poradie a názvy polí v e-maile ----
$fields = [
    'Účastnícky poplatok'  => 'ucast',
    'Názov / Meno'         => 'Názov / Meno',
    'Adresa'               => 'Adresa',
    'IČO'                  => 'IČO',
    'DIČ'                  => 'DIČ',
    'IBAN'                 => 'IBAN',
    'Kontaktná osoba'      => 'Kontaktná osoba',
    'Telefón'              => 'Telefón',
    'Email'                => 'Email',
    'Požiadavky na skippera' => 'Skipper',
    'Doplnková výbava'     => 'Doplnková výbava',
    'Charakteristika posádky' => 'Charakteristika posádky',
    'Loď na celý týždeň' => 'Loď na celý týždeň',
    'Súhlas GDPR'          => 'GDPR',
];

// ---- Zostavenie tela e-mailu ----
$lines = [];
$lines[] = 'NOVÁ PRIHLÁŠKA — GENTLEMAN SAILING 2027';
$lines[] = str_repeat('=', 44);
$lines[] = '';
foreach ($fields as $label => $key) {
    $v = val($key);
    if ($v === '') { $v = '—'; }
    $lines[] = $label . ':';
    $lines[] = '  ' . str_replace(["\r\n", "\n"], "\n  ", $v);
    $lines[] = '';
}
$lines[] = str_repeat('-', 44);
$lines[] = 'Odoslané: ' . date('d.m.Y H:i:s');
$lines[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'n/a');

$body = implode("\n", $lines);

$who     = val('Názov / Meno');
$subject = $SUBJECT_PREFIX . ($who !== '' ? ' · ' . $who : '');

// ---- Hlavičky (UTF-8, MIME encoded subject) ----
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';
$headers[] = 'From: =?UTF-8?B?' . base64_encode('Gentleman Sailing') . '?= <' . $FROM . '>';
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

// ---- Odoslanie ----
$sent = @mail($RECIPIENT, $encodedSubject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail_failed']);
}
