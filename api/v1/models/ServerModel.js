const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = {
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'provider'
  },
  public_ipv4: String,
  public_ipv6: String,
  private_ipv4: String,
  private_ipv6: String,
  servername: String,
  serverlabel: String,
  location: String,
  vcpu: String,
  ram: String,
  storage: String,
  bandwidth: String,
  os: String,
  instance_type: String,
  complemento: String
}

const ServerSchema = new Schema(_schema, { versionKey: false })
const ServerModel = mongoose.model('server', ServerSchema)

module.exports = ServerModel