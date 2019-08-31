const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var User= require('./models/User');
var Product = require("./models/Product");
 const db = require('./public/config/keys').MongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));





// to register the user
router.post('/',function(req,res){
   var Username = req.body.Username;
   var Password = req.body.Password;
   var Useremail = req.body.Useremail;

   var newuser =new User();
   newuser.Useremail=Useremail;
   newuser.Username =Username;
   newuser.password =Password;

   newuser.save(function(err,savedUser){
       if(err){
           console.log(err);
           return res.status(500).send();
       }
       return res.status(200).send();
   })
});
//for login the current user
 var array =[];
router.get('/search',(req,res,next)=>{
    console.log('getting all product');
    Product.find({})
    .exec((err,product)=>{
        if(err){
            return res.send();
        }
        else{
            var item = req.body.item;
           array=[];
         product.forEach((e)=>{
             if(e.product_category_tree.match(item)){
                array.push(e);
                
                }
             
              
         });
         
         res.send(array);
         res.end();
        

          
        }
    });
    
});

router.get('/login',(req,res,next)=>{
    console.log('getting all user');
    User.find({})
    .exec((err,user)=>{
        if(err){
            console.log(err)
        }
        else{
            var email = req.body.email;
            var password = req.body.password;
            user.forEach((item)=>{
               
                if(email==item.Useremail && password==item.password){
                 res.send(item.Useremail);
                  res.end();
                  
                }
                
            });
           

            
           
           
            
        }
    });
       });


       

// router.get('/',(req,res)=>{
//     res.json(members);
// })
// //Finding Users 
// router.get('/:id',(req,res)=>{
//     const FoundPersonByID = res.some(member=> member.User === parseInt(req.params.id));
//     const FoundPersonByName = res.some(member => member.Username === req.params.id);
    
//     if(FoundPersonByID){
//         res.send(res.filter(member => member.User === parseInt(req.params.id)));
//     }
//     else if(FoundPersonByName){
//         res.send(res.filter(member => member.Username === req.params.id));
//     }
//     else 
//     res.status(400).json(`No members with this data belongs ${req.params.id}`);
   
// })

// let UserCount = 3;
// //Adding Users in Routes
// router.post('/',(req,res)=>{
//     //Saving data to mongoDB
//     mongo.connect(url,(err,client)=>{
//         if(err){
//          console.log('Not connected');
//         }
//         else{
//           console.log('DB connected succesfully');
//           const db = client.db('Users');
//           const collection = db.createCollection('User');
//           collection.then(s => s.insertOne({"name":req.body.Username,"email":req.body.Useremail}));
//         }
//     });
    
//    console.log(req.body);
//    res.json(members);
//   });

// router.delete('/:id',(req,res)=>{
//     const FoundPersonByID = members.some(member=> member.User === parseInt(req.params.id));
//     const FoundPersonByName = members.some(member => member.Username === req.params.id);
    
//     if(FoundPersonByID){
//         res.send(members.filter(member => member.User !== parseInt(req.params.id)));
//     }
//     else if(FoundPersonByName){
//         res.send(members.filter(member => member.Username !== req.params.id));
//     }
//     else 
//     res.status(400).json(`No members with this data belongs ${req.params.id}`);
   
// })

// router.put('/:id',(req,res)=>{
//     const FoundPersonByID = members.some(member=> member.User === parseInt(req.params.id));
//     const FoundPersonByName = members.some(member => member.Username === req.params.id);
//     console.log(FoundPersonByID,FoundPersonByName);
//     if(FoundPersonByID){
//         members[parseInt(req.params.id)-1].Username = req.body.Username;
//         members[parseInt(req.params.id)-1].Useremail= req.body.Useremail;
//         res.send(members.map(member => member));
//     }
//     else if(FoundPersonByName){
//         let index = members.indexOf(req.param.id);
//         members[index].Username = req.body.Username;
//         members[index].Useremail = req.body.Useremail;
//         res.send(members.map(member => member));
//     }
//     else 
//     res.status(400).json(`No members with this data belongs ${req.params.id}`);
// })

module.exports = router;