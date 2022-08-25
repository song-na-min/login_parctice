const express = require('express')
const app = express()
const port = 3000
const {User}=require('./models/User')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));//applicatino/x-www 
app.use(bodyParser.json()); //applicaion/json
const mongoose = require('mongoose')
const config =require('./config/Key')

mongoose.connect(config.mongoURI,{
}).then(()=>console.log("mongodb connected.."))
    .catch(err=>console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! nodemon')
})

app.post('/register',(req,res)=>{
    //회원가입 필요 정보를 client에서 가져오면
    const user= new User(req.body)//json형식으로 bodyparser
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
    //DB에 넣기

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})