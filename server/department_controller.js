const express = require('express');
let router = express.Router();
let Department = require('./department');

router.post('/', function(req, res) {
    console.log(req.body);
    let d = new Department({name: req.body.name});
    d.save((err, dep) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(dep)
        }
    });
})

router.get('/', function(req, res) {
    Department.find().exec((err, deps) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(deps)
        }
    });
})