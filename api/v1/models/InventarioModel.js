const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
	marca_equipamento: String,
    modelo: String,
    numero_serie: String,
    observacao: String,
    responsavel: String,
    tipo_equipamento: String,
    valor_estimado: String
}

const InventarioSchema = new Schema(_schema, { versionKey: false });
const InventarioModel = mongoose.model('inventario', InventarioSchema, 'inventario');

module.exports = InventarioModel;