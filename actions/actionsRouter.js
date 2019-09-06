//All these helper methods return a promise. Please use .then().catch() or async/await

const express = require('express');
const actionsDB = require('../data/helpers/actionModel');
const router = express.Router();
router.use(express.json()); 

router.get('/:actionid', validateActionID, (req, res) => {
    const actionId = req.params.actionid;
    actionsDB.get(actionId)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

 router.post('/', validateActionProjectID, validateAction, (req, res) => {
    const action = req.body;
    actionsDB.insert(action)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.put('/:actionid', validateActionID, validateAction, validateActionProjectID, (req, res) => {
    const actionId = req.params.actionid;
    const action = req.body;
    actionsDB.update(actionId, action)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})


 router.delete('/:actionid', validateActionID, (req, res) => {
    const actionId = req.params.actionid;
    actionsDB.remove(actionId)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

//MW
 function validateActionID (req, res, next) {
    const actionId = req.params.actionid
    actionsDB.get(actionId)
    .then(result => {
        if(result) {
            next();
        } else {
            res.status(404).json({message: "The specified Action does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

 function validateAction (req, res, next) {
    const action = req.body;
    if(!action.project_id) {
        res.status(400).json({message: 'Project_id required.'})
    } else if(!action.notes) {
        res.status(400).json({message: 'Notes required, please add and retry'})
    } else if(!action.description){
        res.status(400).json({message: 'Description required, please add and retry'})
    } else {
        next();
    }
}

 function validateActionProjectID (req, res, next) {
    const projectId = req.body.project_id;
    projectsDB.get(projectId)
    .then(result => {
        if(result) {
            next()
        } else {
            res.status(404).json({message: "The specified ActionProject does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}
module.exports = router;