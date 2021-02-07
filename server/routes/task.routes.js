const express = require('express')
const taskController = require('../controllers/tasks.controller')


const router = express.Router()

router.get('/', taskController.getTasks)
router.post('/create', taskController.createTask)
router.patch('/update', taskController.updateTask)
router.patch('/delete/:taskId', taskController.deleteTask)


module.exports = router