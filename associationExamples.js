// One to many -- embedded documents


const mongoose = require('mongoose');

// Comment Model
const commentSchema = mongoose.Schema({
    header: String,
    content: String
}, {
    timestamps: true
});

// blogPost Model
const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    comments: [commentSchema]
})

module.exports = mongoose.model('BlogPost', blogPostSchema);

//------------------------------------------------------------//
const BlogPost = require('./models/blogPost');

app.post('/blogposts', (req, res) => {
    BlogPost.create({
        title: "Cat",
        body: "Yeehaw!"
    }, function(err, blogPost) {
        res.json(blogPost)
    })
})

app.post("/blogposts/:id/comments", (req, res) => {
    BlogPost.findById(req.params.id, function(err, blogPost) {
        blogPost.comments.push({title: "My Comment", content: "What?"})
        blogPost.save( function(err, blogPost) {
            //err handling
            res.json(blogPost)
        })
    })
})

//---------------------------------------------------------------------//


// One-to-Many -- using Document References

// productSchema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
})

module.exports = mongoose.model('Product', productSchema);

// orderSchema
const orderSchema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}]
})

module.exports = mongoose.model('Order', orderSchema);

app.get("/orders/:id", (req, res) => {
    orderSchema.findById(req.params.id).populate('products').exec( function(err, order) {
        if (err) res.json(err)
        res.json(order);
    })
})

app.post("/orders/:id", (req, res) => {
    Order.findById(req.params.id, function(err, order) {
        Product.findById(req.body.id, function(err, product) {
            order.products.push(product);
            order.save( function(err) {
                product.orders.push(order);
                product.save( function(err) {
                    if (err) res.json(err)
                    res.json(order)
                })
            })
        })
    })
})



//------------------------------------------------------------------------------//


