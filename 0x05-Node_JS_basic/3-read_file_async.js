const fs = require('fs');

const countStudent = (dbPath) => new Promise((resolve, reject) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the Database'));
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
      console.log(`Number of students: ${studentDataObj.length}`);
      console.log(`Number of students in ${fieldOne}: ${csStudentCount}. List: ${csStudents.slice(0, -2)}`);
      console.log(`Number of students in ${fieldTwo}: ${sweStudentCount}. List: ${sweStudents.slice(0, -2)}`);

      resolve(true);
    }
  });
});

module.exports = countStudent;
