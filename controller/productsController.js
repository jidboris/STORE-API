const Products = require("../module/productModel");
// get controller for diplaying pages
const getAllProducts = async (req,res,next) => {
            const {page,limit} = req.query;
const product = await Products.find({})
 .limit(limit)
 .skip((page-1)*limit)
 const count = await Products.countDocuments()
 res.status(200).json({
    Result: product,
totalPage: Math.ceil(count/limit),
currentPage : page
});
}

// This get controller for filtered product
const getAllProductsStatic = async (req, res, next) => {
    try {
        const Product =
            await Products.find({ price: { $gt: 5000 } })
                .sort('price')
                .select('name price')
        res.status(200).json({ data: Product })
    }
     catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}
     

module.exports = {
    getAllProducts,
    getAllProductsStatic
}

