
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  rollNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  standard: {
    type: Number,
    required: true,
   
  },
  section: {
    type: String,
    required: true,
   
  },

  image_url : {
    type: String,
    required: true,
    default: "not available"
  },

  address:{

    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,

  },

  
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'parents'
  }]
})


const StudentModel = mongoose.model('students', studentSchema)
module.exports = StudentModel 