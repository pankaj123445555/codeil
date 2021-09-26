const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_development');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"error connection to mongodb"));
db.once('open',function(){
  console.log('successfully connect to database');
});
module.exports = db;