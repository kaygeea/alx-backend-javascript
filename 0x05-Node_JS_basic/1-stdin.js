const { stdin, stdout } = process;
stdout.write('Welcome to Holberton School, what is your name?\n');
stdin.on('data', (data) => {
  if (data && data.toString().length > 1) {
    const name = `Your name is: ${data.toString()}`;
    stdout.write(name);
    process.exit();
  } else {
    process.exit(9);
  }
});
process.on('exit', () => {
  console.log('This important software is now closing');
});
