const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const ProviderModel = require('../models/ProviderModel');


function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

// Create
router.post('/', (req, res) => {
    const body = req.body;
    ProviderModel.create(body, (err, data) => {
        callback(res, err, data);
    });
});

// Retrieve
router.get('/', (req, res) => {
    ProviderModel.find({}, (err, data) => {
        callback(res, err, data);
    });
});

router.get('/:_id', (req, res) => {
    const _id = req.params._id;
    ProviderModel.findOne({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

// Update
router.put('/', (req, res) => {
    const body = req.body;
    const _id = body._id;
    delete body._id;
    ProviderModel.update({ _id: _id }, body, (err, data) => {
        callback(res, err, data);
    });
});

// Delete
router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    ProviderModel.remove({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

module.exports = router;