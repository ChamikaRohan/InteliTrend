const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const upload = multer({ dest: 'uploads/' }); // specify the directory where files will be uploaded

app.use(bodyParser.json());
app.use(cors());
const regRoutes = require("./routes/Registration")
app.use(regRoutes);


// Import middleware
const authMiddleware = require('./middleware/auth');
// Use the authMiddleware function for the /api/profile route
app.use('/profile', authMiddleware, regRoutes);

const PORT = 8000;
const URL = "mongodb+srv://ChamikaRohan:imGM7unA820lbHUj@databasecluster.qsvupdi.mongodb.net/InteliTrendServer?retryWrites=true&w=majority"

mongoose.connect(URL)
 .then(()=>{
    console.log("Connected")
 })

 .catch((err)=>{
    console.log('DB error',err)
 })


app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
});