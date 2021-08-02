const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB_URI = process.env.MONGO_DB_URI
const DB = mongoose.connect(MONGO_DB_URI, {
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('BB.DD'))
  .catch(err => console.log(err))

module.exports = DB
