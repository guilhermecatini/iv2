const router = require('./SecurityRoutes')(globalParams.protectRoutes);
const UserModel = require('../models/UserModel');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

// Generate QRCode
router.post('/', (req, res) => {
    const body = req.body;
    const secret = speakeasy.generateSecret({
        length: 32,
        symbols: false,
        otpauth_url: true,
        name: 'Grupo iv2 ( ' + body.name + ' )',
        qr_codes: false,
        google_auth_qr: false
    });

    QRCode.toDataURL(secret.otpauth_url, (err, data) => {
        if (err) {
            callback(res, err, data);
        }
        const ax = {
            secret: secret.base32,
            qrcode: data
        }
        callback(res, err, ax);
    });

});

router.post('/validate', (req, res) => {
    const body = req.body;
    const verified = speakeasy.totp.verify({
        secret: body.secret,
        encoding: 'base32',
        token: body.token
    });
    const data = {
        isValid: verified
    }
    callback(res, null, data);
});

router.put('/updateUser', (req, res) => {
    const body = req.body;
    const _id = body._id;
    delete body._id;
    UserModel.update({ _id: _id }, body, (err, data) => {
        callback(res, err, data);
    });
});


module.exports = router;