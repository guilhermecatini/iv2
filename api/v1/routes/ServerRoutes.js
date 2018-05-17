const express = require('express');
const router = express.Router();
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

// Delete
router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    ClienteModel.remove({ _id: _id }, (err, data) => {
        callback(res, err, data);
    });
});

module.exports = router;