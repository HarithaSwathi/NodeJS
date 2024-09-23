const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.post("/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const isEmployeeExisted = await Employee.findOne({ email });
  try {
    if (isEmployeeExisted) {
      res.status(401).send("Employee already existed, please login");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = new Employee({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      const employee = await newEmployee.save();
      res.send(employee);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async(req,res)=>{
    const {email,password}= req.body
    const isEmployeeExisted = await Employee.findOne({email})
    try{
      if(!isEmployeeExisted){
        res.status(401).send("please register")
      }else{
        const isPasswordMatched = await bcrypt.compare(password,isEmployeeExisted.password)
        if(!isPasswordMatched){
            res.status(401).send('password is incorrect')
        }else{
            const payload = {email}
            const jwtToken = jwt.sign(payload, "secret_key")

            res.send({token:jwtToken})
        }
      }

    }catch(e){
       res.status(400).send(e)
    }
})

module.exports = router;
