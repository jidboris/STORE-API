const notFound = async function (req, res) {
     res.status(404).send("page not found")
}

module.exports = notFound