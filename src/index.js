const app = require('./app');
require('./config/db');

const port = process.env.port || 3333;

app.listen(port, (err) => {
  if (!err) {
    console.log(`APP STARTING ON PORT ${port}`);
  }
});
