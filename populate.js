require('dotenv').config();
const {json} = require("express");
const { mongoose } = require("mongoose");
const Products = require("./module/productModel");
const connectDB = require("./Db/dbConnect")
const jsonProduct = require("./product")
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
 await Products.deleteMany();        
 await Products.create(jsonProduct);
 console.log('Products successfully added to Database!!!');
 process.exit(0);
}
 catch(error){
        console.log(error)
        process.exit(1);
};
}
start()
