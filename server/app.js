const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors);

mongoose.connect('mongodb://localhost:27017/http_app',
    {useNewUrlParser: true});

app.use('/departments', department_controller);
// app.use('/products', products_controller);

app.listen(3000);

