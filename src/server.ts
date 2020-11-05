/** 
 * 
 * Server Entry
 * 
 *  */

import errorHandler from 'errorhandler';

import app from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const PORT = app.get('port');
const ENV = app.get('env');

const server = app.listen(PORT, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    PORT,
    ENV
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
