/** 
 * 
 * api Routes
 * 
 *  */
import { Application } from 'express';
import passport from 'passport';


export const facebookRoutes = (app: Application) => {
  /**
 * OAuth authentication routes. (Sign in)
 */
  app.get('/auth/facebook', 
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
  );
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
      res.redirect(req.session.returnTo || '/');
    });
};

export default facebookRoutes;