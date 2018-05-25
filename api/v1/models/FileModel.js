const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
    _serverid: Schema.Types.ObjectId,
    filename: String,
    fileurl: String,
}

const FileSchema = new Schema(_schema, { versionKey:false })
const FileModel  = mongoose.model('file', FileSchema)

module.exports = FileModel