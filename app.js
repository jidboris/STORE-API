require('dotenv').config();
const express = require("express");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./Db/dbConnect");
//const Products = require("./module/productModel");
const productsRoute = require('./Routes/products.js')

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>STORE API</h1> <a href = "/api/v1/products"> Product Route </a>')
});
app.use('/api/v1/products', productsRoute);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 2020;
const start = async () => {
await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => console.log(`App listenig on port ${PORT}`));}

    start();