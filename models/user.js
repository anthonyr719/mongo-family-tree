const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    meta: {
        age: Number,
        website: String
    }
})

userSchema.methods.sayHello = function() {
    return "Hi " + this.name;
}


const User = mongoose.model('User', userSchema);

module.exports = User;