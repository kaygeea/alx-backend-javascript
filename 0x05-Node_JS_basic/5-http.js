const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2] || '';

// STEP 1 - Define function to count students, for the '/students' route handler
const countStudent = (dbPath) => new Promise((resolve, reject) => {
  if (!dbPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dbPath) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the Database'));
        return;
      }
      if (data) {
        // Parse CSV content into an array of arrays
        const arrOfFileContent = data.trim().split('\n').map((line) => line.split(','));

        // Convert array of arrays to object, with the csv headers as the keys
        const header = arrOfFileContent[0];

        // Define and map values to their respective keys
        const studentDataObj = arrOfFileContent.slice(1).map((value) => {
          const person = {};
          header.forEach((key, index) => {
            person[key] = value[index];
          });
          return person;
        });

        // Process object to get student data
        let csStudents = '';
        let csStudentCount = 0;
        let sweStudents = '';
        let sweStudentCount = 0;
        let fieldOne = '';
        let fieldTwo = '';

        for (const student of studentDataObj) {
          if (student.field === 'CS') {
            csStudents += `${student.firstname}, `;
            csStudentCount += 1;
            fieldOne = student.field;
          } else if (student.field === 'SWE') {
            sweStudents += `${student.firstname}, `;
            sweStudentCount += 1;
            fieldTwo = student.field;
          }
        }
        const message = `This is the list of our students\nNumber of students: ${studentDataObj.length}\nNumber of students in ${fieldOne}: ${csStudentCount}. List: ${csStudents.slice(0, -2)}\nNumber of students in ${fieldTwo}: ${sweStudentCount}. List: ${sweStudents.slice(0, -2)}`;

        resolve(message); // Resolve the promise with the message to be returned on the page
      }
    });
  };
});

// STEP 2 - Define the route handlers that the received request would be sent to
const routes = {
  '/': (res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200);
    res.write('Hello Holberton School!');
    res.end('\n');
  },
  '/students': (res) => {
    // Call the countStudent function and handle the promise
    countStudent(DB_FILE)
      .then((message) => {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.write(message); // Send the message in the response
        res.end('\n');
      }).catch((error) => {
        res.writeHead(500);
        res.end(error.message); // Send the error message in case of failure
      });
  },
  notFound: (res) => {
    res.writeHead(404);
    res.write('Page Not Found');
    res.end('\n');
  },
};

// STEP 3 - Create request listener app with events for receiving data
const app = http.createServer((req, res) => {
  const endPoint = req.url;
  const invEndPoint = routes.notFound;
  // console.log(endPoint);

  req.on('data', () => {
    // console.log('Data received');
  });
  req.on('end', () => {
    // console.log('Request fully received. Ready to return a response');
    const route = typeof routes[endPoint] !== 'undefined' ? routes[endPoint] : invEndPoint;
    route(res);
  });
});

// STEP 4 - Set app to listen
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
