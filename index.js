require('dotenv').config()
const express = require('express');
const server = require('./server');
const port = process.env.PORT
server.use(express.json());

 server.listen(port, () => {
    console.log(`API listening on port ${port}`)
 }
