const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.use(express.urlencoded({extended: false}));

// Connect to Mongo!
mongoose.connect('mongodb://localhost/family_tree');

/*
User.create({
    name: "Emily",
    email: 'em@i.ly'
}, function(err, user) {
    if (err) console.log(err);
    console.log("User created!", user)
})
*/
app.get('/', (req,res) => {
    // find one
    User.find({}, function(err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})

/*
app.get('/:name', (req, res) => {
    User.findOne({name: req.params.name}, function(err, user) {
        if (err) res.json(err)
        res.json(user)
    })
})
*/

/*
app.get('/:id', (req, res) => {
    User.findById(req.params.id, function(err, user){
        if (err) {
            res.json(err)
        }
        res.json(user)
    })
})
*/

app.get("/updateall", (req, res) => {
    User.update({name: "Mike"}, 
        {$set: 
            { meta: 
                { age: 24, website: "www.web.site" }
            }
        }, function(err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})

app.get("/updateall", (req, res) => {
    User.findOneAndUpdate({name: "Mike"}, 
        {$set: 
            { meta: 
                { age: 44, website: "test" }
            }
        }, {new: true}, function(err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})

app.get("/delete", (req, res) => {
    User.remove({name: "Emily"}, function(err) {
        if (err) res.json(err);
        res.json({message: "DELETED"})
    })
})

app.get("/destroymike", (req, res) => {
    User.findOneAndRemove({name: "Mike"}, function(err) {
        if (err) res.json(err)
        res .json({message: "DELETED"})
    })
})




app.listen(3000, () => {
    console.log("Hunting cobras on 3000")
})

