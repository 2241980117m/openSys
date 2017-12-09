var mongoClient = require("mongodb").MongoClinet;
var url = "mongodb://localhost:27017/test";
function findResult(data,db,callback){
   var cursor = db.collection("openTest").find({'name':/data/},{'_id':0});
    cursor.each(function(err, doc){
      if(err) return;
      if (doc !== null){
        console.dir("查询得到的结果:"+doc);
      } else {
        callback();
      }
   }); 
}

function connect_db(data){
	    mongoClient.connect(url,function(db,err){
		     if(err){
		     	 console.log("连接数据库失败");
		     }else{
		     	console.log("连接数据库成功");
		     	findResult(data,db,function(){
		     		db.close();
		     	});
		     }

		});
}

module.exports = connect_db;