const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/register', async (req, res) => {
    const user = new User({
        ...req.body
    })
    try{
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        
        const errors = Object.keys(e.errors).map(error => e.errors[error].message);
        res.status(400).send(errors)
    }
})

router.post('/login', async (req,res) => {
    try{
        const user = await User.checkCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch(e) {
        res.status(401).send(e)
    }
    
})

module.exports = router