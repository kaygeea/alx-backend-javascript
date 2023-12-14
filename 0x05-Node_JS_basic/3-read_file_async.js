const fs = require('fs').promises;

module.exports = async function countStudents(path) {
  try {
    // Attempt to read the database file asynchronously
    const csvString = await fs.readFile(path, 'utf-8');
    
    // Split csv content into separate lines
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
    let numOfStudents = studentDataArray.length; // Count the number of students
    console.log(`Number of students: ${numOfStudents}`);

    // Group students by field of study
    const fields = studentDataArray.reduce((group, student) => {
      const { field } = student;
      const groupCopy = { ...group };
      groupCopy[field] = groupCopy[field] || [];
      groupCopy[field].push(student);
      return groupCopy;
    }, {});

    const listOfFields = Object.keys(fields);
    for (const fieldKey of listOfFields) {
      const listOfStudents = fields[fieldKey].map(student => student.firstname).join(', ');
      const numOfStudentsInField = fields[fieldKey].length;
      console.log(`Number of students in ${fieldKey}: ${numOfStudentsInField}. List: ${listOfStudents}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};
