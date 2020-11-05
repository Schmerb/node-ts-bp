/** 
 * 
 * Database
 * 
 *  */
import { Application } from 'express';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import session from 'express-session';

import { MONGODB_URI, SESSION_SECRET } from '../utils/secrets';


// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

const MongoStore = mongo(session);

export const connectToDb = (app: Application) =>  
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.log('>>> connectToDb');

    // database
    app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
      })
    }));

    mongoose.connect(mongoUrl, { 
      useNewUrlParser: true,
      useCreateIndex: true, 
      useUnifiedTopology: true
    }).then(
      () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        resolve(true);
      },
    ).catch(err => {
      console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
      reject(err);
    // process.exit();
    });
  });
