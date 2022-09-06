const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/index');
const User = db.users;

const register = (req,res) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedpassword) {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            username: req.body.username,
            password: hashedpassword,
            email: req.body.email,
            country: req.body.country,
            role: req.body.role
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User saved successfully'
            })
        } ).catch(error => {
            res.json({ 
                message: 'Error saving user', error})
        })
    })


}

const login = (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else {
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No User found!'
            })
        }
    })
}


module.exports = {register, login}