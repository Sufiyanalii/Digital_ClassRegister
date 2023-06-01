const StudentModel = require("../model/student")
const ParentModel = require("../model/parent")
const mongoose = require('mongoose')


const addParentData = async (req, res) => {

  const newData = req.body
  const { studentID } = req.params
  
  try {
    const parent = await ParentModel.create({ newData , student_id: studentID })

   
    const studentData = await StudentModel.findByIdAndUpdate(studentID, {
      $push: {
        parents: parent._id
      }
    })
    console.log(parent)
    res.send({ status: 'success' })
  } catch (err) {
    console.log(err)
    res.send({ status: 'error' })
  }
}

const getparents = async (req, res) => {
  const { studentID} = req.params

 
  try {
    const parent = await ParentModel.find({ student_id: studentID}).populate('student_id', { name: rehan })
    res.send({ status: 'success', parent })
  } catch (err) {
    console.log(err)
    res.send({ status: 'error' })
  }
}
module.exports = {
    addParentData,
    getparents
}