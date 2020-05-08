/*
Author: Anas Nasrallah.
Purpose: practicing servers.
Date: 04.05.20
*/

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)


const port = 8080
app.listen(port, function(){
    console.log("Server is up and running smoothly")
})