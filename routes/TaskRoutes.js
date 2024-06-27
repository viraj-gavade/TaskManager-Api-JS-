const express = require("express")
const { GetMyTask, AddMyTask, Singletask, UpdateMyTask, DeleteMyTask } = require("../controllers/TaskContoller")

const TaskRout = express.Router()

TaskRout.route('/').get(GetMyTask).post(AddMyTask)
TaskRout.route('/:id').get(Singletask).patch(UpdateMyTask).delete(DeleteMyTask)


module.exports = TaskRout