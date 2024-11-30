var express = require('express');
var path = require('path'); 
var app = express();
var bp=require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'register.html'));
});
app.post('/',function(req,res){
    console.log(req.body);
});


app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
});
