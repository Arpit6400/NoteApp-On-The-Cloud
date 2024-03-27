const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using : POST"/api/auth" . Doesn't require Auth 
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
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error: 'Error Creating Account-Please ENter Unique Value',message:err.message})});
});

module.exports = router;