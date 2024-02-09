/**
 * Represents a class for controlling the app homepage
 * @module full_server/controllers/AppController.js
 * @class
 */
export class AppController {
  static getHomePage(request, response) {
    response.send('Hello Holberton School');
  }
}
