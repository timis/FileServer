var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Validator = require('validator');
const isEmpty = require("is-empty");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");

const db = require("../database");

const username_constraint = 'users_username_key';
const email_constraint = 'users_email_key';

// pool.query('select NOW()', (err,res) => {
//   console.log(err,res);
// })

const saltRounds = 8;

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(56)
  .has().uppercase()
  .has().lowercase()
  .has().not().spaces();

 
function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password= !isEmpty(data.password) ? data.password : "";

  if(Validator.isEmpty(data.username)){
    errors.name = "Username field is required";
  }

  if(Validator.isEmpty(data.email)){
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)){
    errors.email = "Email is invalid";
  }

  if(!passwordSchema.validate(data.password)){
    errors.password = "Password invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if(Validator.isEmpty(data.username)){
    errors.username="Username field is required";
  } 

  if(Validator.isEmpty(data.password)){
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

/* GET users listing. */
router.get('/foo', function(req, res, next) {
  // res.send('respond with a resource');
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

router.get('/allusers', function(req,res,next) {
  db.getAllUsers()
  .then(users => {
    console.log("users 2.0:", users);
    res.send(JSON.stringify(users));
  })
  .catch(err => {
    console.log(err);
  })
  
})

router.post("/reg", function(req,res,next) {
  validation = validateRegisterInput(req.body);
  if(!validation.isValid){
    console.log("Registration invalid: ", JSON.stringify(validation));
    return res.send({errors: validation.errors});
  }
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  bcrypt.hash(password, saltRounds)
    .then(hash => {
      console.log(hash);
      db.addUser(username,email,hash)
      .then(userID => {
        res.json(userID);
      })
      .catch(err => {
        //Handle database constraint issues
        console.log(err);
        errors = {}
        errorMessage = "Internal Error - Could not register account";
        if(err.constraint === email_constraint){
          errors.email = "Email already exists";
        } else if (err.constraint === username_constraint){
          errors.username = "Username already exists";
        }
        res.json({errors: errors});
      })
    })
    .catch(err => {
    console.log(err);
  })
})

router.post("/login", function(req,req,next) {
  let {errors,isValid} = validateLoginInput(req.body);

  let username = req.body.username;
  let password = req.body.password;

  db.getUserByUsername(username)
  .then(user => {
    if(!user){
      return res.status(404).json({errors: {login: "Could not login. Please check credentials again"}});
    }

    bcrypt.compare(password,user.passhash)
    .then(match => {
      if(match){
        const payload = {
          id: user.id,
          username: user.username
        };

        jwt.sign(
          payload,
          "supersecret",
          {
            expiresIn: 60*60*24
          },
          (err,token) => {
            res.json({
              success:true,
              token: "Bearer "+token
            });
          }
        );
      } else {
        return res.status(404).json({errors: {login: "Could not login. Please check credentials again"}});
      }
    })
  })
})

module.exports = router;
