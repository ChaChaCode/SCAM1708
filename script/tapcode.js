function generateRandomBashScript() {
    const commands = [
        'apt update -y',
        'apt install -y git curl wget',
        'service apache2 stop',
        'systemctl start apache2',
        'systemctl stop apache2',
        'cd /tmp',
        'mkdir /tmp/stealth',
        'rm -rf /tmp/stealth',
        'touch /tmp/secret_file',
        'echo "Access Granted" > /tmp/secret_file',
        'chmod 777 /tmp/secret_file',
        'chown nobody:nobody /tmp/secret_file',
        'mv /tmp/secret_file /tmp/secret_file.bak',
        'cp /tmp/secret_file.bak /tmp/secret_file',
        'ls -la /tmp',
        'df -h',
        'free -m',
        'uname -a',
        'uptime',
        'dmesg | tail',
        'rm -rf /tmp/*'
    ];

    const conditions = [
        'if [[ $(/usr/bin/id -u) -ne 0 ]]; then',
        'if [[ -f /tmp/secret_file ]]; then',
        'if [[ -d /tmp/stealth ]]; then',
        'if [[ $(df / | grep -oP "\\d+%") -gt 90 ]]; then'
    ];

    const actions = [
        'echo "ALERT: Not running as root! Escalating privileges!"',
        'echo "WARNING: Secret file detected. Taking evasive actions!"',
        'echo "CAUTION: Stealth directory exists! Initiating countermeasures!"',
        'echo "CRITICAL ERROR: Disk space critical. Performing cleanup!"',
        'exit'
    ];

    const variables = [
        'SECRET_KEY="super_secret_key_123"',
        'FLAG="UNLOCKED"',
        'ATTEMPTS=0',
        'MAX_ATTEMPTS=10',
        'TARGET_DIR="/opt/secure"'
    ];

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Генерация случайного bash-скрипта с элементами эпичности и юмора
    const scriptLines = [
        '#!/bin/bash',
        '',
        '# █████████████████████████████████████████',
        '# Begin the infinite loop of searching, interacting with the user for password input',
        '# █████████████████████████████████████████',
        '',
        'echo "[*] WARNING: THIS SCRIPT IS PART OF A HIGHLY CONFIDENTIAL OPERATION. PROCEED WITH CAUTION!"',
        'sleep 2',
        'echo "[*] Initializing advanced security protocols. Expect the unexpected..."',
        'sleep 1',
        'echo "[*] Applying random system modifications. Hold on tight!"',
        '',
        getRandomElement(variables),
        '',
        'echo "[*] Commencing epic checks and balances..."',
        getRandomElement(conditions),
        `    ${getRandomElement(actions)}`,
        'fi',
        '',
        'echo "[*] Executing high-priority commands with stealth mode activated..."',
        'echo "[*] Just kidding, executing some boring commands, but still exciting!"',
        ...Array.from({ length: 5 }, () => `# ${getRandomElement(commands)}`),
        '',
        'echo "[*] Performing additional high-risk operations. Don\'t worry, it\'s all under control!"',
        'sleep 1',
        ...Array.from({ length: 5 }, () => `# ${getRandomElement(commands)}`),
        '',
        'echo "[*] Finalizing operation. Brace yourself for potential consequences and a dash of surprise..."',
        'sleep 1',
        'echo "[*] Operation complete. If you survived, congratulations! Exiting now."',
        'exit',
        '',
        '# █████████████████████████████████████████',
        '# End of the infinite loop of searching. Hope you enjoyed the ride!',
        '# █████████████████████████████████████████'
    ];

    // Форматируем скрипт с сохранением пробелов и отступов
    return scriptLines.join('\n');
}

// Функция для получения сгенерированного кода
function getTapCodeText() {
    return generateRandomBashScript();
}

// Периодическая генерация кода
function startGeneratingCode(interval) {
    // Убедимся, что интервал является числом и больше нуля
    if (typeof interval !== 'number' || interval <= 0) {
        throw new Error('Интервал должен быть положительным числом.');
    }

    // Запуск бесконечной генерации кода с указанным интервалом
    setInterval(() => {
        console.clear(); // Очистка консоли перед выводом нового кода
        console.log(getTapCodeText()); // Вывод сгенерированного кода в консоль
    }, interval);
}

// Запуск бесконечной генерации кода каждые 3 секунды (3000 мс)
startGeneratingCode(3000);
