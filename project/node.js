var express= require('express');
var app=express();
var fs=require('fs');

var name;
var price;
var details;

var bodyParser=('body-parser');
 app.use(express.urlencoded({extended:true}));
//app.use(bodyParser.urlencoded({ extended: true }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.use(express.static('publicDir'));
app.post('/menu',function(req,res){
    name= req.body.name;
    price=req.body.price;
 details={
    name: req.body.name,
    price:req.body.price
   
};

var quantity=Number(req.body.price);
    total= quantity*price;
      
 fs.appendFile("bill.txt",JSON.stringify(details,total),(err,data)=>{

    if (err) throw err;
    else{
        console.log("appended successfully");
    }
   


//   res.end(`${JSON.stringify(details)}`);
//     console.log(details);
    
    
   });

   res.sendFile(__dirname+'/'+"bill.html");
    });
    
    app.post('/contact',function(req,res){
     var message={
         name:req.body.name,
         email:req.body.email,
         message:req.body.message
     }
        fs.appendFile("query.txt",JSON.stringify(message),(err,res)=>{

            console.log("message received");
        })

        res.sendFile(__dirname+'/'+"bill.html");
        
});
app.get('/contact',function(req,res){
    res.sendFile(__dirname+'/'+"contact.html");
    
    
    });
    app.get('/menu',function(req,res){
        res.sendFile(__dirname+'/'+"menu.html");
        
        
        });
app.get('/',function(req,res){
res.sendFile(__dirname+'/'+"home.html");


});app.listen(3000);
console.log("connected");

