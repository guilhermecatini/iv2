const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const UserModel = require('../models/UserModel');

function callback(res, err, data) {
	if (err) return res.status(500).json(err)
	res.status(200).json(data)
}

// create
if (globalParams.enableRegisterUsers) {
	router.post('/', (req, res) => {
		const body = req.body
		body.password = crypto.createHash('md5').update(body.password).digest('hex');
		UserModel.create(body, (err, data) => {
			callback(res, err, data)
		})
	});
}

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