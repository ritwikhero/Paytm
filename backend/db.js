const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://ritwiksingh91099:Ritwik%409@cluster0.abno3ce.mongodb.net/paytm');

const userSchema = mongoose.Schema({
    userName : String,
    password : String,
    firstName : String,
    lastName : String,
});

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}