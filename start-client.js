// To start the client in a cross-platform way

const args = ['start'];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('yarn', args, opts);
