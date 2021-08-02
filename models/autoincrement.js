const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const autoIncSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
})
autoIncSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})
autoIncSchema.plugin(uniqueValidator)
const AutoInc = model('counter', autoIncSchema)
const getNextValue = async (query) => {
  const sequenceValue = await AutoInc.findOneAndUpdate({ _id: query }, { $inc: { seq: 1 } }, { new: true })
  return sequenceValue.seq
}
module.exports = getNextValue
