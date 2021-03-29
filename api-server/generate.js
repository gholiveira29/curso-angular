var mongoose = require('mongoose');
var Product = require('./product');
var faker = require('faker');

mongoose.connect('mongodb://localhost:27017/http_client',{useNewUrlParser: true});

async function genereteProducts() {
    for(let i = 0; i < 20; i++) {
        let p = new Product({
            name: faker.commerce.productName(),
            department: faker.commerce.department(),
            price: faker.commerce.price(),
        });
        try {
            await p.save();
        }
        catch(err) {
            throw new Error("Error generating products");
        }
    }
}

genereteProducts().then(() => {
    mongoose.disconnect();
    console.log("OK!!!");
})