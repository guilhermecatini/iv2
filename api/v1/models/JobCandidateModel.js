const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
    full_name: String,
    interview_date: Date,
    curriculum: String,
    vacancy: String,
    observations: String
}

const mySchema = new Schema(_schema, { versionKey: false });
const myModel = mongoose.model('jobcandidate', mySchema, 'jobcandidates');

module.exports = myModel;