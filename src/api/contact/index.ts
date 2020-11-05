/** 
 * 
 * Contact Routes
 * 
 *  */

import * as contactController from './contactController';


export const contactRoutes = (app) => {
  app.get('/contact', contactController.getContact);
  app.post('/contact', contactController.postContact);
};

export default contactRoutes;