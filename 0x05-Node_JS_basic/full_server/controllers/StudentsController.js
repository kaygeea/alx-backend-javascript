import readDatabase from '../utils';

const DB_FILE = process.argv[2] || '';

/**
 * Controller for handling student-related routes.
 * @module full_server/controllers/StudentController
 * @class
 */
class StudentsController {
  /**
  * Retrieves all students from the database and sends the response.
  * @static
  * @param {Object} request - The HTTP request object.
  * @param {Object} response - The HTTP response object.
  * @see module:full_server\utils.js
  * @returns {void}
  */
  static getAllStudents(request, response) {
    let msg = '';

    readDatabase(DB_FILE).then((objOfArr) => {
      Object.keys(objOfArr).forEach((key) => {
        msg += `Number of students in ${key}: ${objOfArr[key].length}. List: ${objOfArr[key].join(', ')}\n`;
      });
      response.status(200).send(`This is the list of our students\n${msg.trim()}`);
    }).catch((error) => {
      response.status(500).send(error.message);
    });
  }

  /**
  * Retrieves students, by major, from the database and sends the response.
  * @static
  * @param {Object} request - The HTTP request object.
  * @param {Object} response - The HTTP response object.
  * @throws {Error} Will throw an error if the wrong parameter is received.
  * @see module:full_server\utils.js
  * @returns {void}
  */
  static getAllStudentsByMajor(request, response) {
    let msg = '';
    const major = (request.params.major).toUpperCase();
    console.log(major);

    if (major === 'CS' || major === 'SWE') {
      readDatabase(DB_FILE).then((objOfArr) => {
        msg = `Number of students in ${major}: ${objOfArr[major].length}. List: ${objOfArr[major].join(', ')}`;
        response.status(200).send(msg);
      }).catch((error) => {
        response.status(500).send(error.message);
      });
    } else {
      response.status(500).send('Major parameter must be CS or SWE');
    }
  }
}

export default StudentsController;
