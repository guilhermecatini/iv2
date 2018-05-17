const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
  provider: String,
  ipv4: String,
  ipv6: String,
  servername: String,
  serverlabel: String,
  location: String,
  user: String,
  password: String,
  vcpu: String,
  ram: String,
  storage: String,
  bandwidth: String,
  os: String
}

const ServerSchema = new Schema(_schema, { versionKey:false })
const ServerModel  = mongoose.model('server', ServerSchema)

module.exports = ServerModel