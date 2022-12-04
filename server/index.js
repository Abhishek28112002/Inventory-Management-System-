const express= require('express')
const mongoose=require('mongoose')
const app= express();
const data=require('./router/data');
const login=require('./router/Login');
const bodyParser = require("body-parser"); 
const Database_url='mongodb+srv://abhi2811:abhi28112002@cluster0.wqukcfj.mongodb.net/?retryWrites=true&w=majority'
mongoose.promise=global.promise;
mongoose.connect(Database_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Database is connected')
}).catch((err)=>{
    console.log(err);
})
app.use(express.json({limit:"50mb"}));
app.use(bodyParser.json())
app.use('/loginapi',login);
app.use('/categoryapi',data)
app.get('/', (req, res) => {
    res.status(200).send('Connected to Login API');
});
app.listen(process.env.PORT ||8025,()=>{
    console.log('Listening on port')
})
