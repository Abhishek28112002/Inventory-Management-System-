const User=require('./../models/user');

let Auth =(req,res,next)=>{
    let token =req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        // console.log(token);
        if(!user) return res.json({
            error :true
        });

        req.token= token;
        req.user=user;
        next();

    })
}

module.exports={Auth};