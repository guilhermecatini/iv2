const router = require('./SecurityRoutes')(false);
const ClienteModel = require('../models/ServerModel');


function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

// Create
router.post('/', (req, res) => {
    const body = req.body;
    ClienteModel.create(body, (err, data) => {
        callback(res, err, data);
    });
});

router.post('/:_id/user', (req, res) => {
    const _id = req.params._id;
    const body = req.body;
    ClienteModel.findOneAndUpdate({ _id: _id }, { $push: { users: body } }, (err, data) => {
        if (err) {
            callback(res, err, data);
        }
        ClienteModel.findOne({ _id: _id }, (err, data) => {
            callback(res, err, data);
        });
    })
});

// Retrieve
router.get('/', (req, res) => {
    ClienteModel.find({}, (err, data) => {
        callback(res, err, data);
    });
});

router.get('/:_id', (req, res) => {
    const _id = req.params._id;
    ClienteModel.findOne({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

// Update
router.put('/', (req, res) => {
    const body = req.body;
    const _id = body._id;
    delete body._id;
    ClienteModel.update({ _id: _id }, body, (err, data) => {
        callback(res, err, data);
    });
});

router.put('/:_id/user/:_idUser', (req, res) => {
    const _id = req.params._id;
    const _idUser = req.params._idUser;
    const body = req.body;
    ClienteModel.updateOne({ _id: _id, 'users._id': _idUser }, { $set: { users: body } }, (err, data) => {
        callback(res, err, data);
    });
});

// Delete
router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    ClienteModel.remove({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

router.delete('/:_id/user/:_idUser', (req, res) => {
    const _id = req.params._id;
    const _idUser = req.params._idUser;
    const body = req.body;
    ClienteModel.findOneAndUpdate({ _id: _id }, { $pull: { users: { _id: _idUser } } }, (err, data) => {
        if (err) {
            callback(res, err, data);
        }
        ClienteModel.findOne({ _id: _id }, (err, data) => {
            callback(res, err, data);
        });
    })
});

module.exports = router;