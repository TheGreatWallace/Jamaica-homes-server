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
    var email = req.body.email;

    User.findOne({username: username, role: req.body.role } || {email: email, role: req.body.role })
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
                    res.cookie('uid', user._id, { expiresIn: '2h' })
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

const logout = (req, res) => {
    res.cookie('uid', user._id, { expiresIn: 0 })
}

const getUsers = (req, res) => {
    User.find(req.body)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Users not found."
        })
    })
}


const getUserById = (req,res) => {
   const id = req.params.id;

    User.findById(id)
    .then(user => {
        if(!user){
            res.status(404).send({message: `User by id  ${id} not found.`});
        }else{
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving House with id=" + id 
        });
    })
}


const updateUser = (req, res) => {
    if(!req.body){
        return res.status(400).send({
         message: "Data to be Updated cannot be empty!"
        });
     }
 
     const id = req.params.id;
 
     User.findByIdAndUpdate(id,req.body,{ useFindAndModify: false }).then(data => {
         if(!data){
             res.status(404).send({
                 message: `Cannot update User with id=${id}. User was not found!`
             })
         }else res.send({message: "User was updated Successfully."})
     }).catch((err)=> {
         res.status(500).send({
             message: `Error updating User with id ${id}.`
         })
     })
}

module.exports = {register, login, getUsers, getUserById, updateUser, logout}