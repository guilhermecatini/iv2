const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {

  nome_completo: String,

  razao_social: String,

  nome_fantasia: String,

  cpf: String,

  rg: String,

  cnpj: String,

  ie: String,

  im: String,

  email_particular: String,

  email_comercial: String,

  telefone_particular: String,

  telefone_comercial: String,

  tipo_entidade: String,

  ativo: String,

  data_cadastro: {
    type: Date,
    default: Date.now
  },

  enderecos: [
    {
      sequencia: Number,
      cep: String,
      logradouro: String,
      numero: String,
      bairro: String,
      localidade: String,
      uf: String,
      complemento: String
    }
  ]



}

const EntidadeSchema = new Schema(_schema, { versionKey:false })
const EntidadeModel  = mongoose.model('entidade', EntidadeSchema)

module.exports = EntidadeModel