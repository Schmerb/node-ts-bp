/** 
 * 
 * Contact Routes
 * 
 *  */
import { Application } from 'express';

import * as contactController from './contactController';


export const contactRoutes = (app: Application) => {
  app.get('/contact', contactController.getContact);
  app.post('/contact', contactController.postContact);
};

export default contactRoutes;