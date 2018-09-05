const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = {
    serverId: { type: Schema.Types.ObjectId, required: true },
    user: String,
    password: String,
    accesstype: String
}

const ServerUsersSchema = new Schema(_schema, { versionKey: false });
const ServerUsersModel = mongoose.model('serveruser', ServerUsersSchema, 'serverusers', false);
module.exports = ServerUsersModel;