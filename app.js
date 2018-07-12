const express = require('express');
let app = express();

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('./app/configs')[env];
require('./app/configs/express')(app);
//require('./app/configs/mongoose')(config);
require('./app/models');
require('./app/routes')(app);
app.listen(config.port, config.host, ()=>{
  console.log(`Server Running at: http://${config.host}:${config.port}/ on ${env} enviornment`);
});
