const Products = require("../module/productModel");
// get controller for diplaying pages
const getAllProducts = async (req,res,next) => {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const result = {};
            if (endIndex < (await Products.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit,
                };
            }
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
           try {
                result.results = await Products.find().limit(limit).skip(startIndex);
                res.paginatedResult = result;
                next();
} catch (e) {
                res.status(500).json({ message: e.message });
            }
        };

    // app.get('/api/v1/products', paginate(Products), (req, res) => {
    //     console.log(res.paginatedResult)
    //     res.json(res.paginatedResult)
    // });

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

