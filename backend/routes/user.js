cosnt express = require("express");
const {User} = require("../db");
const {authMiddleware} = require("../middlewares/authorization");
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

//SingUp route
router.post("/signup", async (req,res) =>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg : "Email already present / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username : body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg : "Email already present / Incorrect inputs"
        });
    }

    const dbUser = await User.create({
        username : body.username,
        password : body.password,
        firstName : body.findName,
        lastName : body.lastName
    });

    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});


const signInSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})
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

//UPDATE Route
const updateSchema = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
});

router.put("/uopdate", async (req,res) => {
    const body = req.body;
    const {success} = updateSchema.safeParse(body);

    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        });
    }
    await updateOne({_id : req.userId}, req.body);

    res.json({
        message : "Updated successfully"
    })
});

//GET Route  , get people to send money

router.get("/bulk" , async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        }, 
        {
            lastName : {
                "$regex" : filter
            }
        }]
    });

    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id,
        }));
    });
});