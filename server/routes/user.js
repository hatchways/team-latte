const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/register', async (req, res) => {
    console.log(req.body)

    try{
        const user = new User({
            ...req.body
        })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch (e) {
        if(e.errors){
            const errors = Object.keys(e.errors).map(error => e.errors[error].message);
        res.status(400).send({status: 400,message: errors[0]})
        }
        else if(e.errmsg.includes('duplicate'))
        res.status(400).send({status:400,message:'Account already exists using that email.'})
        else
        res.status(400).send({status:400,message:'There was an error creating the account.'})
    }
})

router.post('/login', async (req,res) => {
    try{
        const user = await User.checkCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch(err) {
        console.log(err.message)
        res.status(401).send({status: 401,message:err.message})
    }
})

router.post('/users/logout', auth, async (req ,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/user/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }catch(e) {
        res.status(404).send(e)
    }
})

module.exports = router