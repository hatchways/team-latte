const express = require('express')
const router = new express.Router()
const AWS = require('aws-sdk')
const multer = require('multer')
const auth = require('../middleware/auth')
const Project = require('../models/project')
const User = require('../models/user')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                return cb(new Error('File must be an image (jpg,jpeg,png).'))
            };

        cb(undefined, true)
    }
})

router.post('/project', auth, upload.array('images', 5), async (req, res) => {

    const s3 = new AWS.S3();
    let promises = req.files.map(file => {
        const params = {
        Bucket: process.env.aws_bucket,
        Key: req.body.title.replace(/[^a-zA-Z0-9]/g, '') + file.originalname,
        Body: file.buffer,
        ACL: 'public-read'
        }

        return s3.upload(params).promise()

    })

    
    let photos= []
    Promise.all(promises).then(results => {
        results.forEach(result => {
            photos.push(result.Location)
        });
        const project = new Project({
            ... req.body,
            photos,
            author: req.user._id
        })
        
        project.save()
        res.send(project)
    }).catch(e => {
        res.status(503).send(e)
    })
})

module.exports = router