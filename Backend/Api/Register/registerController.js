const express = require('express');
const router = express.Router();
const registerService = require('./registerService.js')

router.post('/createRegister', createRegister);
router.get('/getRegister', getRegister);
router.put('/updateRegister', updateRegister);
router.delete('/deleteRegister', deleteRegister);

module.exports = router;

async function createRegister(req, res, next){
    const body = req.body ?? {};
    registerService.createReg(body)
    .then((data)=>{
        res.status(201).json({
            status:'success',
            message:data.message,
            data:data.data
        })
    })
    .catch((error)=>{
        next(error)
    })
};

async function getRegister(req, res, next){
    const id = req.query.userID ?? {};
    registerService.getReg(id)
    .then((data)=>{
        res.status(200).json({
            status:'success',
            message:data.message,
            data:data.data
        })
    })
    .catch((error)=>{
        next(error)
    })
}

async function updateRegister(req, res, next){
    const id = req.query.userID ?? {};
    const body = req.body ?? {};
    registerService.updateReg(id, body)
    .then((data)=>{
        res.status(200).json({
            status:'success',
            message:data.message,
            data:data.data
        })
    })
    .catch((error)=>{
        next(error)
    })
}

async function deleteRegister(req, res, next){
    const id = req.query.id ?? {};
    registerService.deleteReg(id)
    .then((data)=>{
        res.status(200).json({
            status:'success',
            message:data.message,
        })
    })
    .catch((error)=>{
        next(error);
    })
}