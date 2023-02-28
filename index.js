const express = require("express")
require("dotenv").config()
const app = express()
const cors = require("cors")
const { getAllProduct, getSingleProduct, userReview, get_review_byId, get_all_product_review, deleteSingleReview } = require("./controlar")
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const run = async () => {
    try {
        //get all product
        app.get("/allProducts", getAllProduct)

        // get single product with id
        app.get("/allProduct/:id", getSingleProduct)

        //get user review in a single product as well as update
        app.post('/post_review', userReview)

        //get review by product id
        app.get('/get_review/:id', get_review_byId)

        //get all review 
        app.get('/get_all_review/:email', get_all_product_review)

        //delete single review by id
        app.delete('/delete_review/:id', deleteSingleReview)

    } catch (error) {
        console.log(error.message);
    }
}
run().catch(e => console.log(e.message))

app.listen(port, () => {
    console.log('Server is runnging on ', port);
})