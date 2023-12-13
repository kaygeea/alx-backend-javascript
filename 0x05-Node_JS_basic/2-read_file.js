const fs = require('fs');
// import fs from 'fs';

module.exports = function countStudents(path) {
  try {
    // Open file and split csv content into separate lines
    const csvString = fs.readFileSync(path, 'utf-8');
    const studentData = csvString.split(/\r?\n/);

    // Extract line with fields to use as object keys
    const studentDataKeys = studentData[0].split(',');

    // Build an array of objects from CSV file
    const studentDataArray = studentData.slice(1).map((line) => {
      const values = line.split(',');
      const obj = {};
      studentDataKeys.forEach((key, index) => {
        obj[key] = values[index];
      });
      return obj;
    });
    studentDataArray.pop(); // Pop extra undefined object returned with set.

    // Process data accordingly
    let numOfStudents = 0;
    const listOfCsStudents = [];
    const listOfSweStudents = [];
    studentDataArray.forEach(() => {
      numOfStudents += 1;
    });
    console.log(`Number of students: ${numOfStudents}`);

    // Group students by field of study

    // const fields = Object.groupBy(studentDataArray, ({ field }) => field);
    const fields = studentDataArray.reduce((group, student) => {
      const { field } = student;
      const groupCopy = { ...group };
      groupCopy[field] = groupCopy[field] || [];
      groupCopy[field].push(student);
      return groupCopy;
    }, {});

    const listOfFields = Object.keys(fields);
    for (const fieldKey of listOfFields) {
      if (fields[fieldKey][0].field === listOfFields[0]) {
        for (const names of fields[fieldKey]) {
          const firstnames = names.firstname;
          listOfCsStudents.push(firstnames);
        }
        const numOfCsStudents = listOfCsStudents.length;
        console.log(`Number of students in ${fieldKey}: ${numOfCsStudents}. List: ${listOfCsStudents}`);
      } else if (fields[fieldKey][0].field === listOfFields[1]) {
        for (const names of fields[fieldKey]) {
          const firstnames = names.firstname;
          listOfSweStudents.push(firstnames);
        }
        const numOfSweStudents = listOfSweStudents.length;
        console.log(`Number of students in ${fieldKey}: ${numOfSweStudents}. List: ${listOfSweStudents}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};
