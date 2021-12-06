const express = require('express');
const router = express.Router()

const toDoController = require('../../controller/toDoController/todo')
const auth = require('../../middleware/auth')

router.post('/add-todo',auth.verifyjwtToken,toDoController.createToDoItem);
router.get('/view/:id',auth.verifyjwtToken,toDoController.getAllToDoItems);
router.get('/item',auth.verifyjwtToken,toDoController.getSingleToDoItem)
router.put('/update-todo/:id',auth.verifyjwtToken,toDoController.updateToDoItem);
router.delete('/delete-todo',toDoController.deleteToDoItem);
module.exports =  router;

