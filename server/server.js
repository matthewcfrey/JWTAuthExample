require('dotenv').config()
const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const thingRoutes = require('./routes/thing')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true})); 

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/things', thingRoutes)

// create connection to database
require('./handlers/dataConnector.js').connect();

const port = process.env.PORT || 8080;
app.listen(port, () => {
 console.log("Server running at port= " + port);
}); 
