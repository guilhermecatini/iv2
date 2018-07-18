const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const ServerModel = require('../models/ServerModel');


function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

// Create
router.post('/', (req, res) => {
    const body = req.body;
    ServerModel.create(body, (err, data) => {
        callback(res, err, data);
    });
});

// Retrieve
router.get('/', (req, res) => {
    ServerModel.find({}, (err, data) => {
        callback(res, err, data);
    }).populate('provider');
});

router.get('/:_id', (req, res) => {
    const _id = req.params._id;
    ServerModel.findOne({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

// Update
router.put('/', (req, res) => {
    const body = req.body;
    const _id = body._id;
    delete body._id;
    ServerModel.update({ _id: _id }, body, (err, data) => {
        callback(res, err, data);
    });
});

// Delete
router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    ServerModel.remove({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

module.exports = router;