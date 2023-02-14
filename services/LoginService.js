const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing feedback data
 */
class LoginService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the feedback data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get list of registered users
   */
  async getUsersList() {
    const data = await this.getUsers();
    return data;
  }

  /**
   * Add a new feedback item
   * @param {*} name The name of the user
   * @param {*} title The title of the feedback message
   * @param {*} message The feedback message
   */
  async addUser(username, password) {
    const users = (await this.getUsers()) || [];
    users.unshift({ username, password });
    return writeFile(this.datafile, JSON.stringify(users));
  }

  /**
   * Fetches users data from the JSON file provided to the constructor
   */
  async getUsers() {
    const users = await readFile(this.datafile, 'utf8');
    if (!users) return [];
    return JSON.parse(users);
  }
}

module.exports = LoginService;
