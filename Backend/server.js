const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./util/config/db.js');
const PORT = process.env.PORT || 5000;
const registerController = require('./Api/Register/registerController.js');
const loginController = require('./Api/login/loginController.js');
const breakFixController = require('./Api/Ticket/BreakFix/breakFixController.js')
const adminController = require('./Api/AdminPage/adminPage/adminController.js')
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    methods:['POST', 'PUT', 'GET', 'DELETE'],
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json());

app.get('/', (req, res, next)=>{
    if(req.url == '/'){
        res.send("hello world in express")
    }
});

app.use('/api/register', registerController);
app.use('/api/login', loginController);
app.use('/api/ticket', breakFixController);
app.use('/api/adminPage', adminController);

app.listen(PORT, ()=>{
    console.log(`port is running in ${PORT}`)
})