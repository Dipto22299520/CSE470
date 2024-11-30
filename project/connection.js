var sql=require("mysql");
var con=sql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"cse370_lab_project"
});
con.connect(function(error){
    if(error) throw error;
    con.query("select * from student",function(error,result){
        if(error) throw error;
        console.log(result);
    }
)
});