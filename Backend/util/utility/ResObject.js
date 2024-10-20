const express = require('express');

class ResObject{
    constructor(res, data){
        let json = {
            status:'Success',
            message:data.message,
            data:data.data
        }

        return res.send(json)
    }
}

module.exports =  ResObject;