const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const urlSchema = new Schema({
  original_url: { type: String, unique: true },
  url_short: { type: String, unique: true }
}, {
  timestamps: true
})
urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})
urlSchema.plugin(uniqueValidator)
const Url = model('url', urlSchema)
module.exports = Url
