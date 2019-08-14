const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//check to make sure mongoose is connected
mongoose.connection.on('connected', ()=> {
    console.log('Mongoose is connected')
});