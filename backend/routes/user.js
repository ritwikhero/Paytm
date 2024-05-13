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

const signInSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})

//SingUp route
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

//SignIn Route

router.post("/signin", async (req,res) => {
    const body = req.body;
    const {sucesss} = signInSchema.safeParse(body);
    if(!sucesss){
        return res.status(411).json({
            msd : "Wrong inputs"
        });
    }

    const user = await User.findOne({
        username : body.username,
        password : body.password
    });

    if(user){
        const token = jwt.sign({
            userId : user._id,
        },JWT_SECRET);
        res.json({
            token : token,
        });
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })

});