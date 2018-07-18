const jwt = require('jsonwebtoken');
const superSecret = 'dX{KOSm5+m#<?7m{p#.C];p-w(Bul6S&^|{JRd&E&sC5Qox7Rj!MYQ:+AAhl6pR2';

const validate = (security) => {

	const express = require('express');
	const router = express.Router();

	if (security === true) {
		// antes de retornar a rota do express, valida o token
		router.use((req, res, next) => {
			const authorization = req.headers.authorization;

			// verifica o token
			jwt.verify(authorization, superSecret, (err, decoded) => {

				// em caso de erro
				if (err) {
					res.json({error: true, message: err.message})
				} else {
					// deixa dar continuidade
					next();
				}

			});

		})
	}

	return router;

}

module.exports = validate;