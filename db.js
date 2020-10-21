const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tanveer:tanveer@cluster0.jpspo.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true },);
var conn =mongoose.Collection;
 
const MySchema = new mongoose.Schema({ 

    name :{
        type: String ,
        required : true 
    },
    lastname :{
        type: String ,
         required: true 
    }

     


});


const My = mongoose.model('My',MySchema);
 module.exports= My ;
