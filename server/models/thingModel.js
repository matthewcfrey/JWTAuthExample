const mongoose = require('mongoose')

const thingSchema = new mongoose.Schema({
  thing: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Thing', thingSchema, 'things')