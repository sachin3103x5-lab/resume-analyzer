/**
 * Entrypoint forwarder for deployment platforms (like Render, Heroku, Railway)
 * that execute `node server.js` inside the server/ directory.
 */
require('./src/server.js');
