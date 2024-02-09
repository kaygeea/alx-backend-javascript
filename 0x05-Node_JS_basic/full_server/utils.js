import fs from 'fs';

/**
 * Asynchronously reads data from a database file, processes it, and returns an object of arrays.
 * @module full_server/utils
 * @param {string} dbPath - The path to the database file to be parsed.
 * @throws {Error} Will throw an error if the database file is not available.
 * @returns {Promise<Object.<string, string[]>>} - A promise that resolves to an object where each
 *                                                 property is a string key and each value is an
 *                                                 array of strings.
 * @author Koyejo Adinlewa <adinlewakoyejo@yahoo.com>
 */
const readDatabase = (dbPath) => new Promise((resolve, reject) => {
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
      const csStudents = [];
      const sweStudents = [];
      let fieldOne = '';
      let fieldTwo = '';
      const objOfArr = {};

      for (const student of studentDataObj) {
        if (student.field === 'CS') {
          csStudents.push(student.firstname);
          fieldOne = student.field;
        } else if (student.field === 'SWE') {
          sweStudents.push(student.firstname);
          fieldTwo = student.field;
        }
      }
      objOfArr[fieldOne] = csStudents;
      objOfArr[fieldTwo] = sweStudents;

      resolve(objOfArr);
    }
  });
});

export default readDatabase;
