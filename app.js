const express = require("express");
const {mongoose} = require("mongoose");
const Products = require("./module/userModel");
const app = express();

mongoose
    .connect("mongodb://localhost:27017/products",{
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

const db = mongoose.connection;
db.once("open", async () => {
await Products.deleteMany();
    // if ((await Products.countDocuments().exec()) > 0)
    //     return console.log("product already inserted to database");

    Promise.all ([
        Products.create({ name: "Saisho sandwhich maker", description: "Saisho Sandwich Maker is a must-have in the Home. With this handy appliance, you make ready-to-serve sandwich delicacies in only few minutes. It also features heating plates made from durable, non-stick material. These plates also make the entire process of cleaning it very convenient.", price: "#15500"}),
        Products.create({ name: "Oraimo OPB Mah Power Bank Dual Fast Charging", description: "Newest Oraimo Product and is perfect for everyday use. ", price: "#5800"}),
        Products.create({ name: "Binatone Inch Powerful Super Cool Quiet Standing Fan A" ,  description: "This is fan is a onetime investment and is perfect for domestic use. This is one of Binatone most sturdy models. It can revolve 360 degrees and its height is adjustable to"}, {price: "15500"}),
        Products.create({ name: "Quartz Watch Stainless Steel Band", description: "This is a ATM water resistant quartz watch for men, precise quartz movement for accurate time keeping.", price: "4000"}),
        Products.create({ name: "Mens Oblique Zippers Hoodie Jacket Sweatshirts BLACK" , description: "Zip Up hoodie with color block zippers and fleece lining.", price: "3600"}),
        Products.create({ name: "Women's Shoulder Shopping Bag", description: "Material Polyester Size about", price: "1600"}),
        Products.create({ name: "Oraimo FreePods- Wireless Stereo Earbuds" , description: "FreePods has two different Smart Modes in each pair", price: "17700"}),
        Products.create({ name: "Samsung Galaxy S Plus", description: "The Samsung range captures the belief that there is no limit.", price: "190000"}),
        Products.create({ name: "Earpiece",  description: "FreePods has two different Smart Modes in each pair" , price: "17700" }),
    ])
        .then(() => console.log("Added products to database"))
        //.catch(() => console.log("error occured while inserting products to database"));
});



function paginate(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = {};
        if (endIndex < (await model.countDocuments().exec())) {
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
            result.results = await model.find().limit(limit).skip(startIndex);
            res.paginatedResult = result;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}

app.get('/api/v1/products', paginate(Products), (req, res) => {
    console.log(res.paginatedResult)
    res.json(res.paginatedResult)
});

const PORT = process.env.PORT || 2020;

app.listen(PORT, () => console.log(`App listenig on port ${PORT}`));