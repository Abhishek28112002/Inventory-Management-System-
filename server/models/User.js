var mongoose=require('mongoose');
const { isValidPassword } = require('mongoose-custom-validators');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const confiq=require('../config/config');
const salt=10;

const userSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        auto:true,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    username:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        validate: {
            validator: isValidPassword,
            message: 'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
        },        
        required: true,
        minlength:8
    },
    confirmpassword:{
        type:String,
        required: true,
        minlength:8

    },
    verified:{
        type:Boolean,
        default:false
    },
    token:{
        type: String
    }
});


userSchema.pre('save',function(next){
    var user=this;
    
    if(user.isModified('password')){
        bcrypt.genSalt(salt,function(err,salt){
            if(err)return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                user.confirmpassword=hash;
                next();
            })

        })
    }
    else{
        next();
    }
});

userSchema.methods.comparepassword=function(password,cb){
    bcrypt.compare(password,this.password,function(err,isMatch){
        if(err) return cb(next);
        cb(null,isMatch);
    });
}

userSchema.methods.generateToken=function(cb){
    var user =this;
    var token=jwt.sign(user.userId.toHexString(),confiq.SECRET);

    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken=function(token,cb){
    var user=this;

    jwt.verify(token,confiq.SECRET,function(err,decode){
        user.findOne({"userId": decode, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

userSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

module.exports=mongoose.model('User',userSchema);