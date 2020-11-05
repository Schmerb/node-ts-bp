/**
 * API Generator
 *
 *
 */

const { FULL_API, BASIC_API, SERVICE_API } = require('./config');
const prompts = require('./prompts');
const {
  addPrettyModel,
  addPrettyController,
  addPrettyBasicController,
  addPrettyRouter,
  addPrettyBasicRouter,
  addRouterImport,
  addPrettyService,
  addPrettyServiceRouter,
  addPrettyServiceController,
} = require('./actions');

module.exports = {
  description: 'Add an API (model+router+controller|router+controller|service)',
  prompts,
  actions: (data) => {
    const { dbType, apiType, useServiceRouter } = data;

    const actions = [];

    switch (apiType) {
    case FULL_API.value:
      addPrettyModel(actions, dbType);
      addPrettyController(actions, dbType);
      addPrettyRouter(actions);
      addRouterImport(actions);
      break;
    case BASIC_API.value:
      addPrettyBasicController(actions, dbType);
      addPrettyBasicRouter(actions);
      addRouterImport(actions);
      break;
    case SERVICE_API.value:
      addPrettyService(actions);
      if (useServiceRouter) {
        addRouterImport(actions);
        addPrettyServiceRouter(actions);
        addPrettyServiceController(actions);
      }
      break;
    default:
    }

    return actions;
  },
};
