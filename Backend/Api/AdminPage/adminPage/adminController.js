const adminService = require('./adminService');
const ResObject = require('../../../util/utility/ResObject')
const express = require('express');
const router = express.Router()

router.post('/RequestAccess', createAdminAccess)

module.exports = router;


function createAdminAccess(req, res, next){

        const body = req.body ?? {};
        adminService.createAdmin(body).then(obj=>{
            new ResObject(res, obj)
        }).catch(next)
};