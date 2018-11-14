let express = require('express');
let router = express.Router();
let JobCandidate = require('../models/JobCandidateModel');

router.get('/new', (req, res) => {
    res.render('frm-job-candidate', { data: {} });
});

router.post('', (req, res) => {
    JobCandidate.create(req.body, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })
});

module.exports = router;
