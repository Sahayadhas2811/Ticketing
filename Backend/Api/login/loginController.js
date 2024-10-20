const express = require('express');
const router = express.Router();
const loginService = require('./loginService.js');

router.post('/loginUser', loginUser);

module.exports = router;

function loginUser(req, res, next ){
    const body =req.body ?? {};
    loginService.login(body)
    .then((data)=>{
        res.status(200).json({
            status:"Success",
            message:data.message,
            data:data.data,
            token:data.token
        })
    })
    .catch((error)=>{
        next(error)
    })
};