function getData(data,callback){
	var mongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/open";
    console.log("mongo.js开始执行");
    console.log("接收到的数据是:"+data);
	var findResult = function(db,callback){
	     var cursor = db.collection("open").find({"name":'/'+data+'/'}).toArray();
	     console.log("从数据库得到的数据:"+cursor);
	     return cursor;
	}

	mongoClient.connect(url,function(err,db){
		console.log("connected!");
	    if(err)   return;
	    findResult(db,function(){
	    	db.close();
	    });
		
	});

}

module.exports.getdata = getData; 