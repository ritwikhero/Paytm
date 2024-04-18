cosnt express = require("express");
const {User} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const zod = require("zod");
const router = express.Router();

const signupSchema = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
});

router.post("/signup", async (req,res) =>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            msg : "Email already present / incorrect inputs"
        });
    }

    const user = User.findOne({
        username : body.username
    })

    if(user._id){
        return res.json({
            msg : "Email already present / incorrect inputs"
        });
    }

    const dbUser = await user.create(body);

    const token = jwt.sign({
        userId : user._id,
        
    },JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token
    })
});