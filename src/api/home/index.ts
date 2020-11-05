/** 
 * 
 * home Routes
 * 
 *  */
import { Application } from 'express';

import * as homeController from './homeController';


export const homeRoutes = (app: Application) => {
  app.get('/', homeController.index);
};

export default homeRoutes;