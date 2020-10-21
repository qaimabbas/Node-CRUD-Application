const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const Mys= require('./db');


var MySP =Mys.find({});



// body parser
app.use(bodyParser.urlencoded({ extended : true}))

// ejs template 
app.set('view engine', 'ejs');




  // Routes

app.get('/', (req , res )=> {
   
    res.sendFile(__dirname + '/index.ejs')
})
 app.post('/quotes',(req,res)=> {
      var MySP = new Mys({
    name: req.body.name,
    lastname: req.body.lastname,

      })
      
       console.log(req.body)
       MySP.save();
       res.redirect('/quotes');
       
 })

 //show
 
 app.get('/quotes', (req,res,next)=>{
  
    MySP.exec(function(err,data){
        if(err) throw err;
        const count=Mys.countDocuments().exec((err, count) => {
          if (err) {
            
              res.send(err);
              return;
          }
         console.log(count)
         res.render('index', { title: 'User Record', total:count,records:data, success:''})
          
      });
         
        
 })

});





// delete
app.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;
    var del= Mys.findByIdAndDelete(id);
    
    del.exec(function(err,data,next){
        if(err) throw err;
        res.redirect('/quotes');
 })
      
    });
    // Edit

    app.get('/edit/:id', function(req, res, next) {
        var id=req.params.id;
      var edit= Mys.findById(id);
      edit.exec(function(err,data){
      if(err) throw err;
      res.render('edit', { title: 'Edit Employee Record', records:data });
        });
        
      });



      // UPDATE



      app.post('/update/', function(req, res, next) {
 

      var update= Mys.findByIdAndUpdate(req.body.id,{
          name:req.body.name,
          lastname:req.body.lastname,
      });
      update.exec(function(err,data){
      if(err) throw err;
       MySP.exec(function(err,data){
        if(err) throw err;
        res.redirect("/quotes");  });
        });
       
        });
         
    

 


 app.listen(3000,()=>{
    console.log('app listening at port 3000 ')
})
