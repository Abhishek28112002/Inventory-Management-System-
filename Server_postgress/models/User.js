var mongoose=require('mongoose');
const { isValidPassword } = require('mongoose-custom-validators');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;

const userSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        auto:true,
        required:true,
        unique:true
    },
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: 1
    },
    password:{
        type:String,  
        required: true,
        minlength:8
    },
    LoggedIn:{
        type:Boolean,
        default:true
    },
    Events:{
        type:[{
            type:mongoose.Schema.Types.Object,
            ref:"Event"
        }]
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



module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);