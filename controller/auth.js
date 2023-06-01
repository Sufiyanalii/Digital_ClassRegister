const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')

const path=require('path')

const signupform=async(req,res)=>{

  let pat = path.join(__dirname, "../")
    res.sendFile(`${pat}public/html/signup.html`)
}


const loginform=async(req,res)=>{

  let pat = path.join(__dirname, "../")
    res.sendFile(`${pat}public/html/login.html`)
}


const logoutform=async(req,res)=>{

  let pat = path.join(__dirname, "../")
    res.sendFile(`${pat}public/html/logout.html`)
}




const signUpController = async (req, res) => {
    
  const userdata = req.body
  
  console.log(userdata);
 
 
              try {
                  const result = await UserModel.create(userdata)

                  const userPayload = userdata 

                  const token = jwt.sign(userPayload, process.env.AUTH_SECRET_KEY, { algorithm: 'HS384', expiresIn: '1d' })
                  res.cookie('jwt', token, { maxAge: 900000 })
                  res.redirect("/login")
                
                  
              }
              catch (err) {
                  console.log(err)
                  res.send(err.errors)

              }

          }
  


const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email, password })

    if (!user) {
      res.status(401).send({ status: 'error', msg: 'User Not Found' })
    }


    const userPayload = { email, }

    
    const token = jwt.sign(userPayload, process.env.AUTH_SECRET_KEY, { algorithm: 'HS384', expiresIn: '1d' })
    res.cookie('jwt', token, { maxAge: 365 , expiresIn :35  , expires : 365})
    res.redirect("/studentsData")

  } catch (err) {
    res.status(401).send({ status: 'error', msg: err })
  }
}

const logoutController = (req, res) => {
  res.cookie('jwt', '', { maxAge: 3000 })
  res.send({ status: 'success', msg: 'Logged out successfully' })
}

module.exports = {
  loginController,
  logoutController,
  signUpController,
  signupform,
  loginform,
  logoutform

  
}
