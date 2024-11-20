const express = require('express');
const mongoose = require('mongoose');
const assetRouter = require('./route/assets.route.js');
require('dotenv').config()

const app = express();

app.use(express.json());

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));


app.use('/api/assets', assetRouter);
app.use(function(req, res,next) {
    return res.status(404).send({
        success: false,
    
        message: "Not found",
    });
});
app.use(function(error,req, res,next) {
    return res.status(500).send({
        success: false,

        message:   "something went wrong",
        data:[]
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
