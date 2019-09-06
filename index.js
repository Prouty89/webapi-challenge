require('dotenv').config()
const express = require('express');
const server = require('./server');
const PORT = process.env.PORT || 8000;
server.use(express.json());

 server.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
 });
