const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')


function callback(res,err, data) {
  if (err) return res.status(500).json(err)
    res.status(200).json(data)
}

router.post('/create', (req, res) => {
  const body = req.body
  UserModel.create(body, (err, data) => {
    callback(res, err, data)
  })
});

router.get('/retrieve', (req, res) => {
  UserModel.findOne({}, (err, data) => {
    callback(res, err, data)
  })
});

router.get('/retrieve/:id', (req, res) => {
  const query = { _id: req.params.id }
  UserModel.findOne(query, (err, data) => {
    callback(res, err, data)
  })
});

router.post('/update', (req, res) => {
  
});

router.post('/delete', (req, res) => {
 
});

router.post('/login', (req, res) => {
  let query = { user: req.body.user, password: req.body.password }
  UserModel.findOne(query, (err, data) => {
    callback(res, err, data)
  })
})

module.exports = router;