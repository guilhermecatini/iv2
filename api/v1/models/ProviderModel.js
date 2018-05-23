const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
    name: String
}

const ProviderSchema = new Schema(_schema, { versionKey:false })
const ProviderModel  = mongoose.model('provider', ProviderSchema)

module.exports = ProviderModel