const fs = require('fs');
const readline = require('readline');


const countStudents = (dbPath) => {

  // Check if file exists
  fs.open(dbPath, (err) => {
    if (err) {
      throw new Error('Cannot load the database');
    }
  });

  const processDataToObj = (data) => {
    // Function to process the data after it has been read in the 'line' event.
    // Because the 'line' event is non-blocking (async), this func will only be
    // called in the 'close' event handler to be sure that there is data.

    // Define keys of object
    const header = data[0];

    // Define and map values to each key
    const studentDataObj = data.slice(1).map((value) => {
      const person = {};
      header.forEach((key, index) => {
        person[key] = value[index];
      });
      return person;
    });
    return studentDataObj;
  };

  // Create readline interface to receive stream from file
  const rl = readline.createInterface({
    input: fs.createReadStream(dbPath, 'utf-8'),
    crlfDelay: Infinity
  });

  // Process the data in the file, line by line
  let arrOfData = []; // Add each line as an array to this
  rl.on('line', (line) => {
    const splitLine = line.split(',');
    arrOfData.push(splitLine);
  });

  rl.on('close', () => {
    const studentData = processDataToObj(arrOfData)

    let csStudents = '';
    let csStudentCount = 0;
    let sweStudents = '';
    let sweStudentCount = 0;

    for (const student of studentData) {
      if (student.field === 'CS') {
        csStudents += student.firstname + ', ';
        csStudentCount += 1;
      } else if (student.field === 'SWE') {
        sweStudents += student.firstname + ', ';
        sweStudentCount += 1;
      };
    };
    console.log(`Number of students: ${studentData.length}`);
    console.log(`Number of students in CS: ${csStudentCount}. List: ${csStudents.slice(0, -2)}`);
    console.log(`Number of students in SWE: ${sweStudentCount}. List: ${sweStudents.slice(0, -2)}`);
  });
};

module.exports = countStudents;

