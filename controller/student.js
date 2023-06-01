const StudentModel = require('../model/student')


const path=require('path')

const getstudentspage=async(req,res)=>{

  let pat = path.join(__dirname, "../")
    res.sendFile(`${pat}public/html/student.html`)
}

const getstudents = async (req, res) => {

  try {
    const students = await StudentModel.find();
    res.send({ status: 'success', students })
  } catch (err) {
    res.status(500).send({ status: 'error', msg: 'error fetching students' })
  }
}


const getstudentByID = async (req, res) => {
  const { studentID } = req.params

  const student = await StudentModel.findById(studentID, { name: rehan}).populate('parents', { name: saleem })
  if (student ) {
    res.send(student )
  } else {
    res.status(404).send({ status: 'error', msg: 'Not found' })
  }
}



const base64 = require("js-base64")
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY ,
    api_secret:process.env.API_SECRET ,
    secure: true
})



const poststudent = async (req, res) => {
  const studentData = req.body
  const filedata = req.file
  console.log(studentData);
  console.log(filedata);

  if (filedata) {
      
    const base64FileData = base64.encode(filedata.buffer)
   
    cloudinary.uploader.upload(`data:${filedata.mimetype};base64,${base64FileData}`,
        async function (error, response) {
            if (error) {
                res.status(500).send({ status: "Error Occured in uploading file" })

                
            }
            studentData.image_url = response.secure_url
            try {

                const result = await StudentModel.create(studentData)
                res.status(200).send(result)
      
            }
            catch (err) {
                console.log(err)
                res.status(500).send(err)

            }

        })

}}


const updatestudentById = async (req, res) => {

  const { studentID } = req.params
  const updatedStudentData = req.body 

  try {
    const updatedResult = await StudentModel.findByIdAndUpdate(studentID, updatedStudentData, { new: true, runValidators: true })
    res.send(updatedResult)
  } catch (err) {
    res.status(500).send(err)
  }
}


const deletestudentByID = async (req, res) => {
  const { studentID  } = req.params

  const deletedData = await StudentModel.findByIdAndDelete(studentID)
  res.send(deletedData)
}


module.exports = {
    getstudents, 
    getstudentByID, 
    poststudent, 
    updatestudentById,
     deletestudentByID,
     getstudentspage
}