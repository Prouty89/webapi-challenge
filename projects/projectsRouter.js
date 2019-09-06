//All these helper methods return a promise. Please use .then().catch() or async/await

const express = require('express');
const projectsDB = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/:id',validateProjectID, (req, res) => {
    const id = req.params.id;
    projectsDB.get(id)
    .then(result => {
        res.status(200).JSON(result)
    })
    .catch(err => {
        res.status(500).JSON({error: err})
    })
})


function validateProjectID (req, res, next) {
    const id = req.params.id
    projectsDB.get(id)
    .then(result => {
        if(result) {
            next();
        } else {
            res.status(400).JSON({message: "The specified project does not exist"})
        }
    })
    .catch(err => {
        res.status(500).JSON({error: err})
    })
}
module.exports = router;