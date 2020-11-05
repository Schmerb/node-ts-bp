/** 
 * 
 * Express App main file
 * 
 *  */
import express from 'express';
import path from 'path';

import { initializeApi } from './api';
import { connectToDb } from './modules/database';
import { bindMiddleware } from './modules/middleware';

//
// Create Express server
//
const app = express();

//
// connect to database
//
connectToDb(app);

//
// binds middleware
//
bindMiddleware(app);

//
// Router
//
initializeApi(app);


// set static dir
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);


export default app;
