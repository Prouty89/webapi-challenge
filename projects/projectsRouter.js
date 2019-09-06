//All these helper methods return a promise. Please use .then().catch() or async/await

const express = require('express');
const projectsDB = require('../data/helpers/projectModel');
const router = express.Router();
router.use(express.json()); 

router.get('/:id',validateProjectID, (req, res) => {
    const id = req.params.id;
    projectsDB.get(id)
    .then(result => {
        res.status(200).JSON(result)
    })
    .catch(err => {
        res.status(500).JSON({error: err})
    });
})

router.put('/:id', validateProjectID, validateProject, (req, res) => {
    const id = req.params.id
    const project = req.body;
    projectsDB.update(id, project)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.post('/', validateProject, (req, res) => {
    const project = req.body;
    projectsDB.insert(project)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

//MW
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
    });
}


function validateProject(req, res, next) {
    const project = req.body;
    console.log(project)
    if(!project.name) {
        res.status(400).json({message: "Name required."})
    } else if(!project.description) {
        res.status(400).json({message: "Description required."})
    } else if(!project){
        res.status(400).json({message: "Invalid project details, please add and retry."})
    } else {
        next();
    }
}

module.exports = router;