import { spawn } from 'node:child_process';

const commands = [
  ['backend', 'node', ['server.js']],
  ['frontend', 'vite', ['--host', '127.0.0.1']],
];

const children = commands.map(([name, command, args]) => {
  const child = spawn(command, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`[${name}] ${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`[${name}] ${data}`);
  });

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      process.exitCode = code;
    }
  });

  return child;
});

function shutdown() {
  children.forEach((child) => {
    if (!child.killed) child.kill('SIGTERM');
  });
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});
