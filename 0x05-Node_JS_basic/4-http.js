const http = require('http');

const hostname = 'localhost';
const port = 1245;

const app = http.createServer((req, res) => {
  res.end('Hello Holberton School!');
});

app.listen(port, hostname, () => {
  console.log(`Server is running and listening on port ${port}`);
});
