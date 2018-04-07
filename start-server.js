// To simply start the server

const mongoose = require('mongoose');

const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    'I want to use Async + Await! So, please go to nodejs.org and download version 7.6 or greater if you want to use this app.\n'
  );
  process.exit();
}

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE_URI);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`Mongoose error → ${err.message}`);
});

const app = require('./app');
app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
