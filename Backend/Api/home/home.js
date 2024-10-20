const express = require('express');
const router = express.Router();
const authProvider = require('../../util/Auth/AuthProvider');

router.get('/home', authProvider, home);

module.exports = router;

function home(req, res) {
    if (!req.user || !req.user.userName) {
        return res.status(400).json({
            status: 'Error',
            message: 'User not found'
        });
    }

    const username = req.user.userName;
    const userid = req.user.userID;
    res.status(200).json({
        status: 'Success',
        userName: username,
        userID:userid
    });
}
