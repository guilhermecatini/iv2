const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  urlImage: {
    type: String,
    required: true,
  },
  date_upload: {
    type: Date,
    required: true,
    default: Date.now
  }
}

const ImageSchema = new Schema(_schema, { versionKey:false })
const ImageModel  = mongoose.model('image', ImageSchema)

module.exports = ImageModel