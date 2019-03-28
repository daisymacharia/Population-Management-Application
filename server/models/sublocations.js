const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const subLocationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
  },
  male: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Male population must be an integer',
    },
  },
  female: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Female population must be an integer',
    },
  },
  totalPopulation: { type: Number },
  Location: { type: Schema.Types.ObjectId, ref: 'Location' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('subLocation', subLocationSchema)
