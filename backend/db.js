const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://ritwiksingh91099:QhqWgFfiIB2JzDCh@patymserver.r9l85cu.mongodb.net/patymDB');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        minLength : 3,
        maxLength: 30,
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    }
});



const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true,
    }
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    User,
    Account
}