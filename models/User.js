var mongoose= require('mongoose');

var userSchema= new mongoose.Schema({
    Username:{type:String},
    Useremail :{type:String,unique:true},
    password:{type:String},

});



var User =mongoose.model('myuser',userSchema);
module.exports =User;