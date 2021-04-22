const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let departmentSchima = new Schema({
    name: String
}, {versionKey: false});

module.exports = mongoose.model('Department', departmentSchima);