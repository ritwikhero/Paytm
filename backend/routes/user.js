cosnt express = require("express");

const zod = require("zod");

const router = express.Router();

const signupSchema = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
});

router.post("/signup", (req,res) =>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            msg : "Email already present / incorrect inputs"
        })
    }
    return res.json({
        msg : "User successfully signed up"
    })

});