/**
 * API Generator Prompts
 *
 *
 */

const {
  MONGODB,
  SEQUELIZE,
  FULL_API,
  BASIC_API,
  SERVICE_API,
} = require('./config');
const fileExists = require('../../utils/fileExists');

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'CustomAPI',
    validate: (value) => {
      if (/.+/.test(value)) {
        return fileExists(value)
          ? 'A file with this name already exists.'
          : true;
      }

      return 'The name is required';
    },
  },
  {
    type: 'list',
    name: 'apiType',
    message: 'Select which you would like to generate:',
    default: '(model|router|controller)',
    choices: [
      { name: FULL_API.name, value: FULL_API.value },
      { name: BASIC_API.name, value: BASIC_API.value },
      { name: SERVICE_API.name, value: SERVICE_API.value },
    ],
  },
  {
    type: 'confirm',
    name: 'useServiceRouter',
    message: 'Would you like a router/controller for your service?',
    default: 'yes',
    when: (answers) => {
      // no need to choose db when adding a new service
      return answers.apiType === SERVICE_API.value;
    },
  },
  {
    type: 'list',
    name: 'dbType',
    message: 'Which database format would you like to use?',
    default: 'MongoDB',
    choices: [
      { name: MONGODB.name, value: MONGODB.value },
      { name: SEQUELIZE.name, value: SEQUELIZE.value },
    ],
    when: (answers) => {
      // no need to choose db when adding a new service
      return (
        answers.apiType !== SERVICE_API.value &&
        answers.apiType !== BASIC_API.value
      );
    },
  },
];
