var express = require('express');
var fs=require("fs");
var mongo = require("mongo");
var url = require("url");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
	console.log(req);
	var p= url.parse(req.url,true);  //设置true,为了使query返回的是对象
    console.log("请求的内容："+p.query.data);
    mongo.getdata(req.query.data,req,res);    
});

app.listen(8000);