/**
 * Generator Actions
 *
 */

const path = require('path');

const SRC = '../../../src';
const TEMPLATES = './api/templates';

/**
 * Add router to app init function and prettify
 *
 * @param {*} actions
 */
const addRouterImport = (actions) => {
  actions.push({
    type: 'modify',
    path: path.resolve(__dirname, `${SRC}/api/index.ts`),
    pattern: '// *__imports',
    templateFile: `${TEMPLATES}/routerImport.hbs`,
    abortOnFail: true,
  });

  actions.push({
    type: 'modify',
    path: path.resolve(__dirname, `${SRC}/api/index.ts`),
    pattern: '// *__init',
    templateFile: `${TEMPLATES}/routerInit.hbs`,
    abortOnFail: true,
  });

  actions.push({
    type: 'prettify',
    path: path.resolve(__dirname, `${SRC}/api/index.ts`),
    templateFile: `${TEMPLATES}/routerImport.hbs`,
    abortOnFail: true,
  });
};

/**
 * add Model
 *
 * @param {*} actions
 * @param {*} dbType
 */
const addPrettyModel = (actions, dbType) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(__dirname, `${SRC}/models/{{ properCase name }}.ts`),
    templateFile: `${TEMPLATES}/${dbType}/${dbType}-model.hbs`,
  });
};

/**
 * add Controller
 *
 * @param {*} actions
 * @param {*} dbType
 */
const addPrettyController = (actions, dbType) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(
      __dirname,
      `${SRC}/api/{{ camelCase name }}/{{ camelCase name }}Controller.ts`,
    ),
    templateFile: `${TEMPLATES}/${dbType}/${dbType}-controller.hbs`,
  });
};
const addPrettyBasicController = (actions) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(
      __dirname,
      `${SRC}/api/{{ camelCase name }}/{{ camelCase name }}Controller.ts`,
    ),
    templateFile: `${TEMPLATES}/basic/controller.hbs`,
  });
};

/**
 * add Router
 *
 * @param {*} actions
 */
const addPrettyRouter = (actions) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(__dirname, `${SRC}/api/{{ camelCase name }}/index.ts`),
    templateFile: `${TEMPLATES}/router.hbs`,
  });
};
const addPrettyBasicRouter = (actions) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(__dirname, `${SRC}/api/{{ camelCase name }}/index.ts`),
    templateFile: `${TEMPLATES}/basic/router.hbs`,
  });
};

/**
 * add Service
 *
 * @param {*} actions
 */
const addPrettyService = (actions) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(
      __dirname,
      `${SRC}/services/{{ camelCase name }}/index.ts`,
    ),
    templateFile: `${TEMPLATES}/service/service.hbs`,
  });
};

/**
 * add Service Router
 *
 * @param {*} actions
 */
const addPrettyServiceRouter = (actions) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(__dirname, `${SRC}/api/{{ camelCase name }}/index.ts`),
    templateFile: `${TEMPLATES}/service/service-router.hbs`,
  });
};

/**
 * add Service Controller
 *
 * @param {*} actions
 */
const addPrettyServiceController = (actions) => {
  actions.push({
    type: 'pretty-add',
    path: path.resolve(
      __dirname,
      `${SRC}/api/{{ camelCase name }}/{{ camelCase name }}Controller.ts`,
    ),
    templateFile: `${TEMPLATES}/service/service-controller.hbs`,
  });
};

exports.addRouterImport = addRouterImport;
exports.addPrettyModel = addPrettyModel;
exports.addPrettyController = addPrettyController;
exports.addPrettyBasicController = addPrettyBasicController;
exports.addPrettyRouter = addPrettyRouter;
exports.addPrettyBasicRouter = addPrettyBasicRouter;
exports.addPrettyService = addPrettyService;
exports.addPrettyServiceRouter = addPrettyServiceRouter;
exports.addPrettyServiceController = addPrettyServiceController;
