/** 
 * 
 * API - Routes
 * 
 *  */
import { Application, Request, Response } from 'express';

// routes
import userRoutes from './user';
import contactRoutes from './contact';
import homeRoutes from './home';
import apiRoutes from './api';
// *__imports
// hook for PLOP file editing



export const initializeApi = async (app: Application) => {
  // eslint-disable-next-line no-console
  console.log('>>> initApi');

  /**
 * Primary app routes.
 */
  app.get('/hello', (req: Request,res: Response) => {
    res.status(200).json({message: 'YESSIR'});
  });

  // users
  userRoutes(app);
  contactRoutes(app);
  apiRoutes(app);
  homeRoutes(app);

// *__init
  // hook for PLOP file editing
};