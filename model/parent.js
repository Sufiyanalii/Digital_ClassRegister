const mongoose = require('mongoose')


const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
    
  },
  Designation: {
    type: String,
    required: true
    
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students'
  },
 
})


const ParentModel = mongoose.model('parents', parentSchema)

module.exports = ParentModel