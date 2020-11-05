/** 
 * 
 * App Middleware
 * 
 *  */
import { Application, Request, Response } from 'express';
import compression from 'compression';  // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import flash from 'express-flash';
import path from 'path';
import passport from 'passport';

export const bindMiddleware = (app: Application) => {
  // eslint-disable-next-line no-console
  console.log('>>> bindMiddleware');
  // Express configuration
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../../views'));
  app.set('view engine', 'pug');

  // config
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // passport auth
  app.use(passport.initialize());
  app.use(passport.session());
  // dev messages/logging
  app.use(flash());
  // security middleware
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.use((req: Request, res: Response, next: any) => {
    res.locals.user = req.user;
    next();
  });
  app.use((req: Request, res: Response, next: any) => {
  // After successful login, redirect back to the intended page
    if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
      req.session.returnTo = req.path;
    } else if (req.user &&
    req.path == '/account') {
      req.session.returnTo = req.path;
    }
    next();
  });
};