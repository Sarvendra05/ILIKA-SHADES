/**
 * ILIKA SHADES — Dev Server Launcher
 * Detects Google Chrome on Windows and opens the dev server in it.
 * Falls back to the system default browser if Chrome is not installed.
 */
const { spawn } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

// Common Chrome installation paths on Windows
const chromePaths = [
    join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    join(process.env.PROGRAMFILES || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    join(process.env['PROGRAMFILES(X86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
];

const chromePath = chromePaths.find(p => existsSync(p));

if (chromePath) {
    process.env.BROWSER = chromePath;
    console.log('\x1b[32m✓\x1b[0m Google Chrome detected — opening in Chrome');
} else {
    console.log('\x1b[33mℹ\x1b[0m Chrome not found — opening in default browser');
}

// Launch Vite dev server (inherits stdio so logs stream to terminal)
const child = spawn('npx', ['vite', '--open'], {
    stdio: 'inherit',
    shell: true,
    env: process.env,
    cwd: join(__dirname, '..')
});

child.on('error', (err) => {
    console.error('Failed to start dev server:', err.message);
    process.exit(1);
});
