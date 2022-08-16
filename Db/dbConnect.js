//const express = require("express");
const { mongoose } = require("mongoose");
const Products = require("../module/productModel");


const connectDB = (url) => {
return mongoose
    .connect("mongodb://localhost:27017/Product", {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    })
    .then(() => {
        console.log("Connected to MongoDB Successfully");
    })
    .catch((err) => {
        console.log("Could not connect to MongoDB");
        console.error(err);
    })
} 
    module.exports = connectDB