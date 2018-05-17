const express = require('express');
const router = express.Router();
const EntidadeModel = require('../models/EntidadeModel');


function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

router.post('', (req, res) => {
    const body = req.body;
    EntidadeModel.create(body, (err, data) => {
        callback(res, err, data);
    });
});

router.get('', (req, res) => {
    EntidadeModel.find({}, (err, data) => {
        callback(res, err, data);
    });
});

router.get('/:_id', (req, res) => {
    EntidadeModel.findOne({ _id: req.params._id }, (err, data) => {
        callback(res, err, data);
    });
});

router.put('/:_id', (req, res) => {
    EntidadeModel.update({ _id: req.params._id }, req.body, (err, data) => {
        callback(res, err, data);
    });
});


router.post('/:_id/endereco', (req, res) => {
    const where = { _id: req.params._id }
    const novoEndereco = { $push: { enderecos: req.body } }
    EntidadeModel.update(where, novoEndereco, (err, data) => {
        callback(res, err, data)
    })
})

router.get('/:_id/endereco', (req, res) => {
    const where = { _id: req.params._id }
    EntidadeModel.findOne(where, (err, data) => {
        callback(res, err, data.enderecos)
    })
})

router.get('/:id/endereco/:id_endereco', (req, res) => {
    const where = { _id: req.params.id }
    EntidadeModel.findOne(where, (err, data) => {


        for (let i = 0; i < data.enderecos.length; i++) {
            if (data.enderecos[i]._id == req.params.id_endereco) {
                return callback(res, err, data.enderecos[i])
            }
        }

        callback(res, err, {error: true, message: 'Not found'})

        /*
        data.enderecos.find((x) => {
            if (x._id == req.params.id_endereco) {
                return callback(res, err, x)
            }
        })
*/
        // data.enderecos.forEach((v) => {
        //     if (v._id == req.params.id_endereco) {
        //         callback(res, err, v)
        //     }
        // })
        // console.log('CARALHO')
        // callback(res, err, {error: true, message: 'Not found'})



    })
})


module.exports = router;