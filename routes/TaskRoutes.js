const express = require("express")
const { GetAllTasks, CreateTask, GetSingleTask, EditTask, DeleteTask } = require("../controllers/TaskContoller")

const TaskRout = express.Router()

TaskRout.route('/').get(GetAllTasks).post(CreateTask)
TaskRout.route('/:id').get(GetSingleTask).patch(EditTask).delete(DeleteTask)


module.exports = TaskRout