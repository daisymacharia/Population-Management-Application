const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const LocationSchema = new Schema({
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
  sublocations: [{ type: Schema.Types.ObjectId, ref: 'SubLocation' }],
  totalPopulation: { type: Number },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('Location', LocationSchema)
