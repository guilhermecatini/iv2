const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
  nome_completo: String,
  email: String,
  cep: String,
  logradouro: String,
  numero: String,
  bairro: String,
  localidade: String,
  uf: String
}

const ClienteSchema = new Schema(_schema, { versionKey:false })
const ClienteModel  = mongoose.model('cliente', ClienteSchema)

module.exports = ClienteModel