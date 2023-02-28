
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const database = client.db("Accessories")
const all_product = database.collection("all_accessories")
const review_collection = database.collection("reviews")

//get all product
const getAllProduct = async (req, res) => {
    try {
        const query = {}
        const data = await all_product.find(query).toArray()

        return res.send({
            status: 200,
            data: data
        })

    } catch (error) {
        console.log(error.message);
    }
}

//get single item with product id
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }

        const single_product = await all_product.findOne(filter)

        return res.send({
            status: 200,
            message: "data loaded successfull",
            data: single_product
        })

    } catch (error) {
        console.log(error.message);
    }
}

//review add in a current product
// if user give a reviw in a product then it will add in a Array
const userReview = async (req, res) => {
    try {
        const reviewObj = req.body;

        const insertReview = await review_collection.insertOne(reviewObj)
        console.log(reviewObj);

        return res.send(insertReview)

    } catch (error) {
        return res.send({
            status: 404,
            message: error.message
        })
    }
}


//get reviews by product ID
const get_review_byId = async (req, res) => {
    try {
        const id = req.params.id
        const query = { product_id: id }

        const find = await review_collection.find(query).toArray()

        return res.send({
            status: 200,
            data: find
        })


    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}

//get all product review
//filter by id
const get_all_product_review = async (req, res) => {
    try {
        const email = req.params.email
        const query = { email: email }
        const allReview = await review_collection.find(query).toArray()

        return res.send({
            status: 200,
            data: allReview
        })

    } catch (error) {
        return res.send({
            status: 404,
            message: error.message
        })
    }
}

//find review single data by id
//to delete single data from collection
const deleteSingleReview = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { product_id: id }

        const result = await review_collection.deleteOne(query)

        console.log(result);
        console.log(id);

        return res.send({
            data: result,
            status: 200
        })

    } catch (error) {
        return res.send({
            status: 404,
            message: error.message
        })
    }
}

module.exports = {
    getAllProduct,
    getSingleProduct,
    userReview,
    get_review_byId,
    get_all_product_review,
    deleteSingleReview
}