const express = require('express')
const app = express()
const port = 3000
const {User}=require('./models/User')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({extended:true}));//applicatino/x-www 
app.use(bodyParser.json()); //applicaion/json
app.use(cookieParser())
const mongoose = require('mongoose')
const config =require('./config/Key')
const {auth}=require('./middleware/auth')

mongoose.connect(config.mongoURI,{
}).then(()=>console.log("mongodb connected.."))
    .catch(err=>console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! nodemon')
})

app.post('/api/users/register',(req,res)=>{
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

app.post('/api/users/login',(req,res)=>{
  //요청된 email 을 DB에서 찾기
  User.findOne({ email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message:"유저가 없습니다"
      })
    }else{//있으면 비밀번호가 같은지 확인
      user.comparePassword(req.body.password,(err,isMatch)=>{
        if(!isMatch) 
        return res.json({loginSuccess:false,message:"Password error"})
        //비밀번호가 같다면 token 생성
        user.generateToken((err,user)=>{
          if(err) return res.status(400).send(err);
          //토큰을 저장한다.쿠키,local storage => 쿠키에 저장할거다
          res.cookie("x_auth",user.token).status(200)
          .json({loginSuccess:true,userId:user._id})
        })
      })
    }
  })

})

app.get('/api/users/auth',auth,(req,res)=>{
  //미들웨어를 통과했다=>authentication = ture이다

  res.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role===0?false:true,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    role:req.user.role,
    image:req.user.image
  })
})
//로그아웃 => 토큰지우기
app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user.id},
    {token:""}
    ,(err,user)=>{
      if(err) return res.json({success:false,err})
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})