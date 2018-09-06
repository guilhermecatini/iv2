const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const UserModel = require('../models/UserModel');
const crypto  = require('crypto');

function callback(res, err, data) {
	if (err) return res.status(500).json(err)
	res.status(200).json(data)
}

// create
if (globalParams.enableRegisterUsers) {
	let r2 = require('./SecurityRoutes')(false);
	let um2 = require('../models/UserModel');
	r2.post('/', (req, res) => {
		const body = req.body
		body.password = crypto.createHash('md5').update(body.password).digest('hex');
		um2.create(body, (err, data) => {
			callback(res, err, data);
		});
	});
}

// alter password
router.put('/alterPassword/:_id', (req, res) => {

	const newPassword = crypto.createHash('md5').update(req.body.new_password).digest('hex');
	const oldPassword = crypto.createHash('md5').update(req.body.old_password).digest('hex');

	UserModel.findById(req.params._id, {password:true, _id:false} ,(err, data) => {
		
		var currentPassword = data.password;

		if (oldPassword == currentPassword) {
			UserModel.update({_id: req.params._id}, {password: newPassword}, (err, data) => {
				callback(res, err, data);
			});
		} else {
			callback(res, err, {error: true, message: 'As senhas não conferem.'});
		}

	});
});

// Retrieve
router.get('/', (req, res) => {
	UserModel.find({}, (err, data) => {
		callback(res, err, data);
	}).populate('provider');
});

router.get('/:_id', (req, res) => {
	const _id = req.params._id;
	UserModel.findOne({ _id: _id }, { email: true, user: true, name: true, two_fact_auth: true }, (err, data) => {
		callback(res, err, data);
	});
});

// router.get('/retrieve', (req, res) => {
// 	UserModel.findOne({}, (err, data) => {
// 		callback(res, err, data)
// 	})
// });

// router.get('/retrieve/:id', (req, res) => {
// 	const query = { _id: req.params.id }
// 	UserModel.findOne(query, (err, data) => {
// 		callback(res, err, data)
// 	})
// });

// router.post('/update', (req, res) => {

// });

// router.post('/delete', (req, res) => {

// });

module.exports = router;