const express = require('express')
const { getstudents, getstudentByID, poststudent, updatestudentById, deletestudentByID,getstudentspage } = require('../controller/student');
const { addParentData,getparents } = require('../controller/parent');
const studentRouter = express.Router()


const{authMiddleware}=require("../middlewares/auth")

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


studentRouter.use(authMiddleware)
getstudentspage
studentRouter.get('/students', getstudentspage);
studentRouter.get('/studentsData', getstudents);
studentRouter.get('/students', getstudents);
studentRouter.get('/students/:studentID', getstudentByID);
studentRouter.post('/students',upload.single("image_url"), poststudent);
studentRouter.put('/students/:studentID', updatestudentById);
studentRouter.delete('/students/:studentID', deletestudentByID);

studentRouter.post('/students/:studentID/parent', addParentData);
studentRouter.get('/students/:studentID/parent', getparents)

module.exports = studentRouter 