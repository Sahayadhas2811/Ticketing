const express = require('express');
const {authProvider, adminAuthProvider} = require('../../../util/Auth/AuthProvider');
const router = express.Router()

router.get('/AdminDashboard', authProvider, adminAuthProvider, routeAdminDashboard);

module.exports = router

function routeAdminDashboard(req, res){
    if(!req.user || req.user.role !== 'Admin'){
        return res.status(400).json({
            status:'error',
            message:'Admin access denined'})
    }else{
        return res.status(200).json({
            status:'Success',
            userID: req.user.userID,
            role: req.user.role,
        })
    }

}