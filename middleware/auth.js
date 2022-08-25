const {User}=require('../models/User')
let auth=(req,res,next)=>{
    //인증처리

    //클라이언트 쿠키에서 토큰 가져오기
    let token= req.cookies.x_auth;

    //복호화 한 후 user찾기
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true})
        req.token=token;
        req.user=user;
        next();
    })
    //user있으면 ok

    //없으면 no
}
module.exports={auth}