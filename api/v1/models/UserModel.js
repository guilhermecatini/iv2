const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	user: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		required: true,
		type: String,
		minlength: 4
	},
	name: String,
	secret_google_auth: {
		type: String,
		default: null
	},
	two_fact_auth: {
		type: Boolean,
		default: false
	}
}

const UserSchema = new Schema(_schema, { versionKey: false });
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;