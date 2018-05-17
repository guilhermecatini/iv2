const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')
const ImageModel = require('../models/ImageModel')


function callback(res,err, data) {
  if (err) return res.status(500).json(err)
    res.status(200).json(data)
}

router.post('/create', (req, res) => {
  const body = req.body
  ImageModel.create(body, (err, data) => {
    callback(res, err, data)
  })
});

router.get('/retrieve/:userId', (req, res) => {
  const query = { _userId: req.params.userId }
  ImageModel.find(query, (err, data) => {
    callback(res, err, data)
  })
});


module.exports = router;