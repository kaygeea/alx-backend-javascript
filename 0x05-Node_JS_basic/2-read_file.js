const fs = require('fs');

const countStudents = (dbPath) => {
  // Check if file exists
  if (!fs.existsSync(dbPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dbPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Parse CSV content into an array of arrays
  const dataToArray = (dbPath) => {
    const fileContent = fs.readFileSync(dbPath, 'utf-8').trim();
    return fileContent.split('\n').map((line) => line.split(','));
  };
  const arrOfData = dataToArray(dbPath);

  // Convert array of arrays into object, with the headers as the key
  const arrToObj = (arrData) => {
    // Define object keys
    const header = arrData[0];

    // Define and map values to each key
    const studentDataObj = arrData.slice(1).map((value) => {
      const person = {};
      header.forEach((key, index) => {
        person[key] = value[index];
      });
      return person;
    });
    return studentDataObj;
  };
  const objOfData = arrToObj(arrOfData);

  // Process object to get student data
  let csStudents = '';
  let csStudentCount = 0;
  let sweStudents = '';
  let sweStudentCount = 0;
  let fieldOne = '';
  let fieldTwo = '';

  for (const student of objOfData) {
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
  console.log(`Number of students: ${objOfData.length}`);
  console.log(`Number of students in ${fieldOne}: ${csStudentCount}. List: ${csStudents.slice(0, -2)}`);
  console.log(`Number of students in ${fieldTwo}: ${sweStudentCount}. List: ${sweStudents.slice(0, -2)}`);
};

module.exports = countStudents;
