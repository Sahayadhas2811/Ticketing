const express = require('express');
const router = express.Router();
const breakFixService = require('./breakFixService');
const ResObject =  require('../../../util/utility/ResObject');

module.exports = router
 
router.post('/CreateBreakFix', createFix);
router.get('/GetBreakFix', getFix);
router.put('/UpdateBreakFix', updateFix);
router.delete('/DeleteBreakFix', deleteFix);
 
function createFix(req, res, next){
    const body = req.body ?? {};
    breakFixService.createBreakFix(body).then(obj=>{
        new ResObject(res, obj)
    }).catch(next)
};
 
function getFix(req, res, next){
    const id = req.query.userID ?? {};
    breakFixService.getTicket(id).then(obj=>{
        new ResObject(res, obj)
    }).catch(next)
};
 
function updateFix(req, res, next){
    const id = req.query._id ?? {};
    const body = req.body ?? {};
    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }
    breakFixService.updateTicket(id, body).then(obj=>{
        new ResObject(res, obj)
    }).catch(next)
};
 
function deleteFix(req, res, next){
    const id = req.query._id?? {};
    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }
    breakFixService.deleteTicket(id).then(obj=>{
        new ResObject(res, obj)
    }).catch(next)
}