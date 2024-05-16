const express = require('express');
const { Account } = require('../db');
const authMiddleware = require('../middlewares/authorization');
const { default: mongoose } = require('mongoose');

const router = express.Router();

//get user balance

router.get("/balance",authMiddleware ,async(req,res) => {
    const account = await Account.findOne({
        userId : req.userId,
    });
    res.status(200).json({
        balance : account.balance,
    })
});

//transfer money money to someone

router.post("/transfer", authMiddleware, async(req,res) =>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount, to} = req.body;

    //fetch account within the transction
    const account = await Account.findOne({userId : req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();

        return res.status(400).json({
            message : "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount){
        await session.abortTransaction();

        return res.status(400).json({
            message : "Invalid account"
        });
    }

    //perform transaction
    await Account.updateOne({userId : req.userId},{$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to},{$inc : {balance : amount}}).session(session);

    //commit transaction
    await session.commitTransaction();
    res.status(200).json({
        message : "Transfer successful"
    })
});

module.exports = router;