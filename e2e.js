const { spawn } = require('child_process');

process.setMaxListeners(20); // increase listeners limit

const initQuestions = [
  { search: /^\? Please pick a preset:.+/, response: 'default' },
  { search: /^\?.+/, response: '\n' },
];

/* eslint-disable max-len */
const commands = [
  { cmd: 'rm', args: ['-r', 'test-project'], ignoreErrors: true },
  { cmd: './node_modules/.bin/vue', args: ['create', 'test-project'], responses: initQuestions },
  { cmd: 'npm', args: ['install'], cwd: 'test-project' },
  { cmd: 'npm', args: ['run', 'lint'], cwd: 'test-project' },
  { cmd: 'npm', args: ['run', 'test'], cwd: 'test-project' },
  { cmd: 'npm', args: ['run', 'build'], cwd: 'test-project' },
];
/* eslint-enable max-len */

function executeCommand(command, index) {
  return new Promise((resolve, reject) => {
    const cp = spawn(command.cmd, command.args, { cwd: command.cwd });
    process.on('exit', cp.kill);
    cp.stdout.setEncoding('utf-8');
    cp.stdin.setEncoding('utf-8');
    cp.stderr.setEncoding('utf-8');

    // Ignore pipe errors
    cp.stdin.on('error', () => { });
    cp.stdout.on('error', () => { });

    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);

    let rejected = false;
    if (!rejected && command.responses) {
      const registerResponse = (q) => {
        cp.stdout.on('data', (output) => {
          if (q.search.test(output)) {
            // console.log('sending', q);
            cp.stdin.write(q.response);
          }
        });
      };

      command.responses.forEach(registerResponse);
    }
    cp.once('error', (code) => {
      if (!rejected) {
        reject(code);
        rejected = true;
      }
    });

    cp.once('exit', (code) => {
      if (code) {
        reject(code);
        rejected = true;
      } else {
        console.log(
          '=> process',
          (index + 1),
          'of',
          commands.length,
          'exit with status',
          code,
        );
        resolve(code);
      }
    });
  });
}

commands.reduce(
  (prev, next, index) => prev.then(() => executeCommand(next, index).catch((code) => {
    console.log('child process exit with', code);
    if (!next.ignoreErrors) process.exit(code);
  })),
  Promise.resolve(),
);
