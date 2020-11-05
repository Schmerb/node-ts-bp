/** 
 * 
 * api Routes
 * 
 *  */
import { Application } from 'express';

import * as apiController from './apiController';
// API keys and Passport configuration
import * as passportConfig from '../../config/passport';

export const apiRoutes = (app: Application) => {
  
  /**
 * API examples routes.
 */
  app.get('/api', apiController.getApi);
  app.get('/api/facebook', 
    passportConfig.isAuthenticated,
    passportConfig.isAuthorized,
    apiController.getFacebook);
};

export default apiRoutes;