const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const JWT_SECRET='arpitisgoodboy';
//Create a User using : POST"/api/auth/createuser" . Doesn't require Auth 
router.post('/createuser',[
     //Validate that the user has entered data
      body('email','Enter a valid E-mail').isEmail(),
      body('name','Enter a valid Name').isLength( { min: 3} ),
      body('password','Password Must be at least 5 Characters').isLength( { min: 5} )
],async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400 ).json({ errors:  result.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with same email already exists" });
      }
      const salt =  await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data={
        user:{
          id:user.id
        }
      }
      const authToken= jwt.sign(data,JWT_SECRET);
      // console.log(jwtData);
      // res.json(user);
      res.json({authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error: 'Error Creating Account-Please ENter Unique Value',message:err.message})});
});

//Authenticate a User using : POST"/api/auth/login" . Doesn't require Auth 
router.post('/login',[
  //Validate that the user has entered data
   body('email','Enter a valid E-mail').isEmail(),
  body('password','Password Cannot be Blank').exists()
],async (req,res)=>{ 
 const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({erros:errors.array()});
  }

  const{email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if (!user) {
       return res.status(400).json({msg:'Invalid Credentials'});
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(400).json({msg:"Invalid Credentials"});
     }
     const data={
      user:{
        id:user.id
      }
    }
    const authToken= jwt.sign(data,JWT_SECRET);
    res.json({authToken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;