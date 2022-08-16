const Products = require("../module/productModel");

const getAllProducts = async (req,res,next) => {

}

const getAllProductsStatic = async (req, res, next) => {
     const Products =
      await Products.find({price: {$gt:30}})
     .sort('price')
     .select('name price')
 }

module.exports = {
    getAllProducts,
    getAllProductsStatic
}

