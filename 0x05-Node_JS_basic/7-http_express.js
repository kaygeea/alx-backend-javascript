const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
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
  }
});

// STEP 2 - Define route handlers
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  // Call the countStudent function and handle the promise
  countStudent(DB_FILE)
    .then((message) => {
      res.setHeader('Content-Type', 'text/plain');
      res.write(message); // Send the message in the response
      res.end();
    }).catch((error) => {
      res.writeHead(500);
      res.end(error.message); // Send the error message in case of failure
    });
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on Port: ${PORT}`);
});

module.exports = app;
