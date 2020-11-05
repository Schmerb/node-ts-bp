/** 
 * 
 * User Routes
 * 
 *  */
import { Application, Request, Response } from 'express';

import * as userController from './userController';

// API keys and Passport configuration
import * as passportConfig from '../../config/passport';

export const userRoutes = (app: Application) => {
  app.get('/users', (req: Request, res: Response) => {
    userController.getUsers()
      .then((data: any) => {
        res.status(200).json({users: data});
      })
      .catch(err => {
        return res.status(err.code || 500).send(err);
      });
  });

  app.get('/login', userController.getLogin);
  app.post('/login', userController.postLogin);
  app.get('/logout', userController.logout);
  app.get('/forgot', userController.getForgot);
  app.post('/forgot', userController.postForgot);
  app.get('/reset/:token', userController.getReset);
  app.post('/reset/:token', userController.postReset);
  app.get('/signup', userController.getSignup);
  app.post('/signup', userController.postSignup);

  app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
  app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
  app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
  app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
  app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
};

export default userRoutes;