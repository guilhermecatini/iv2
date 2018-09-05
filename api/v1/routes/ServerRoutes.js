const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const ServerModel = require('../models/ServerModel');
const ServerUsersModel = require('../models/ServerUsersModel');


function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}


// ## Users
// Create
router.post('/users', (req, res) => {
    const body = req.body;
    ServerUsersModel.create(body, (err, data) => {
        callback(res, err, data);
    });
});

// Retrieve
router.get('/users', (req, res) => {
    ServerUsersModel.find({}, (err, data) => {
        callback(res, err, data);
    });
});

// Retrieve
router.get('/users/getByServerId/:serverId', (req, res) => {
    const serverId = req.params.serverId;
    ServerUsersModel.find({serverId: serverId}, (err, data) => {
        callback(res, err, data);
    });
});

// Update
router.put('/users', (req, res) => {
    const body = req.body;
    const _id = body._id;
    delete body._id;
    ServerUsersModel.update({ _id: _id }, body, (err, data) => {
        callback(res, err, data);
    });
});

// Delete
router.delete('/users/:_id', (req, res) => {
    const _id = req.params._id;
    ServerUsersModel.remove({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

// ## servers ## //
// Create
router.post('/', (req, res) => {
    const body = req.body;
    ServerModel.create(body, (err, data) => {
        callback(res, err, data);
    });
});

// Retrieve
router.get('/', (req, res) => {
    ServerModel.aggregate([
        {
            $lookup: {
                from: 'serverusers',
                localField: "_id",
                foreignField: "serverId",
                as: 'users'
            }
        },
        {
            $lookup: {
                from: 'providers',
                localField: "provider",
                foreignField: "_id",
                as: 'provider'
            }
        }
    ], (err, data) => {
        data.forEach(function(v){
            v.provider = v.provider[0];
        });
        callback(res, err, data);
    });
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