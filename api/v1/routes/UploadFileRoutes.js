const express = require('express')
const router = express.Router()
const fs = require('fs')
const UploadFileModel = require('../models/UploadFileModel')

function callback(res, err, data, status = 200) {
  if (err) return res.status(500).json(err)
    return res.status(status).json(data)
}

function generateFileId() {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text;
}

router.get('/retrieve/:userId', (req, res) => {
  const query = { _userId: req.params.userId }
  UploadFileModel.find(query, (err, data) => {
    callback(res, err, data)
  })
});

router.get('/remove/:_id', (req, res) => {
  const query = { _id: req.params._id }
  UploadFileModel.remove(query, (err, data) => {
    callback(res, err, data)
  })
})

router.post('/upload', (req, res) => {

  const serverUrl = '//'+req.headers.host

  const base64       = req.body.base64
  const extension    = req.body.extension

  const uploadFolder = './public/files/upload/'
  const fileName     = generateFileId() + '.' + extension
  const completePath = uploadFolder + fileName

  const inf = {
    url: '/files/upload/'+fileName,
    fileKey: fileName,
    extension: extension,
    _userId: req.body._userId
  }

  console.log(inf)


  fs.writeFile(completePath, base64, 'base64', function(){

    UploadFileModel.create(inf, (err,data) => {
      res.json( data )
    })
    
  })

})


module.exports = router