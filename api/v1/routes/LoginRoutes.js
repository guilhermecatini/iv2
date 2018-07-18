const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const superSecret = 'dX{KOSm5+m#<?7m{p#.C];p-w(Bul6S&^|{JRd&E&sC5Qox7Rj!MYQ:+AAhl6pR2';
const speakeasy = require('speakeasy');
const crypto = require('crypto');


function callback(res, err, data) {
	if (err) return res.status(500).json(err)
	res.status(200).json(data)
}

// create
if (globalParams.enableRegisterUsers) {
	router.post('/register', (req, res) => {
		const body = req.body
		body.password = crypto.createHash('md5').update(body.password).digest('hex');
		UserModel.create(body, (err, data) => {
			callback(res, err, data)
		})
	});
}

router.post('/validate', (req, res) => {

	const userId = req.body.userId;
	const token = req.body.token;

	UserModel.findOne({ _id: userId }, (err, data) => {
		if (data != null) {
			const secret = data.secret_google_auth;
			const verified = speakeasy.totp.verify({
				secret: secret,
				encoding: 'base32',
				token: token
			});
			if (verified) {
				jwt.sign({}, superSecret, { algorithm: 'HS512', expiresIn: (60 * 60 * 8) }, (err, token) => {
					res.json({ error: false, twoFactAuth: false, message: 'OK', token: token, userId: data._id, isValid: true });
				});
			} else {
				res.json({ error: true, twoFactAuth: false, message: 'Token Inválido', isValid: false });
			}
		}
	});
});

router.post('/', (req, res) => {
	// hash 1234 example
	// 81dc9bdb52d04dc20036dbd8313ed055
	var hashPassword = crypto.createHash('md5').update(req.body.password).digest('hex');
	let query = { user: req.body.user, password: hashPassword }
	UserModel.findOne(query, (err, data) => {
		if (data != null) {
			if (data.two_fact_auth) {
				res.json({ error: false, twoFactAuth: true, message: 'OK', userId: data._id });
			} else {
				jwt.sign({}, superSecret, { algorithm: 'HS512', expiresIn: (60 * 60 * 8) }, (err, token) => {
					res.json({ error: false, twoFactAuth: false, message: 'OK', token: token, userId: data._id });
				});
			}
		} else {
			res.json({ error: true, message: 'Usuário ou senha inválida' });
		}
	})
})

module.exports = router;