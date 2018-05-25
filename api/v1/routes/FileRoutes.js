const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const FileRoutes = require('../models/FileModel');
const fs = require('fs');


function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

// Create
router.post('/', (req, res) => {

    const uploadFolder = './public/files/upload/';
    const _serverid = req.body._serverid;

    // verifica se a pasta existe
    if (!fs.existsSync(uploadFolder + _serverid)) {
        fs.mkdirSync(uploadFolder + _serverid);
    }

    const base64 = req.body.base64;
    const filename = req.body.filename;
    const completePath = uploadFolder + _serverid + '/' + filename;

    const file = {
        filename: filename,
        fileurl: completePath,
        _serverid: _serverid
    }

    fs.writeFile(completePath, base64, 'base64', () => {
        FileRoutes.create(file, (err, data) => {
            callback(res, err, data);
        });
    });

});

// Retrieve
router.get('/', (req, res) => {
    FileRoutes.find({}, (err, data) => {
        callback(res, err, data);
    });
});

router.get('/:_id', (req, res) => {
    const _id = req.params._id;
    FileRoutes.findOne({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

router.get('/byServerId/:_serverid', (req, res) => {
    FileRoutes.find({ _serverid: req.params._serverid }, (err, data) => {
        callback(res, err, data);
    });
});

// Update
router.put('/', (req, res) => {
    const body = req.body;
    const _id = body._id;
    delete body._id;
    FileRoutes.update({ _id: _id }, body, (err, data) => {
        callback(res, err, data);
    });
});

// Delete
router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    FileRoutes.findOne({ _id: _id }, (err, data) => {
        if (err)
            callback(res, err, data);

        // verifica se a pasta existe
        if (!fs.existsSync(data.fileurl)) {
            FileRoutes.remove({ _id: _id }, (err, data) => {
                callback(res, err, data);
            });
        } else {
            fs.unlink(data.fileurl, (err) => {
                if (err)
                    callback(res, err, data);

                FileRoutes.remove({ _id: _id }, (err, data) => {
                    callback(res, err, data);
                });
            });
        }
    });
});

module.exports = router;