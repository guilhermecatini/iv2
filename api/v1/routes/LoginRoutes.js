const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const superSecret = 'dX{KOSm5+m#<?7m{p#.C];p-w(Bul6S&^|{JRd&E&sC5Qox7Rj!MYQ:+AAhl6pR2';
const crypto = require('crypto');


function callback(res, err, data) {
	if (err) return res.status(500).json(err)
	res.status(200).json(data)
}

router.post('/', (req, res) => {
	// hash 1234 example
	// 81dc9bdb52d04dc20036dbd8313ed055
	var hashPassword = crypto.createHash('md5').update(req.body.password).digest('hex');
	let query = { user: req.body.user, password: hashPassword }
	UserModel.findOne(query, (err, data) => {
		if (data != null) {
			jwt.sign({}, superSecret, { algorithm: 'HS512', expiresIn: (60 * 60 * 8) }, (err, token) => {
				res.json({ error: false, message: 'OK', token: token, userId: data._id });
			});
		} else {
			res.json({ error: true, message: 'Usuário ou senha inválida' });
		}
	})
})

module.exports = router;