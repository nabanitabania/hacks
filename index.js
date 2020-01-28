var express = require("express");
var index = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/vacc_app",{useNewUrlParser: true});
index.set("view engine","ejs");
index.use(express.static("public"));
index.use(methodOverride("_method"));
index.use(bodyParser.urlencoded({extended: true}));


var vaccSchema = mongoose.Schema({
	hour:{
		name: {type: String, default: "Hep B D1"},
		check: {type: String, default: "False"}
	},
	month1: {
		v1:{name: {type: String, default: "Hep B D2"},
		check: {type: String, default: "False"}},
		v2:{name: {type: String, default: "DTaP D1"},
		check: {type: String, default: "False"}},
		v3:{name: {type: String, default: "Hib D1"},
		check: {type: String, default: "False"}},
		v4:{name: {type: String, default: "IPV D1"},
		check: {type: String, default: "False"}},
		v5:{name: {type: String, default: "PVC D1"},
		check: {type: String, default: "False"}}
	}
});

var Vacc = mongoose.model("Vacc", vaccSchema);
//  Vacc.create({
// 	hour:{
// 		name: 
// 		check: "False"
// 	},
// 	month1: {
// 		v1:{name: ,
// 		check: "False"},
// 		v2:{name: ,
// 		check: "False"},
// 		v3:{name: 
// 		check: "False"},
// 		v4:{name: 
// 		check: "False"},
// 		v5:{name: "PVC D1",
// 		check: "False"}
// 	}
// });


index.get("/",function(req,res){
	res.render("home");
});



index.get("/page", function(req,res){
	Vacc.find({},function(err, vaccs){
		if(err)
			{
				console.log("ERRor");
			}
		else
			{
				res.render("page",{vaccs: vaccs});
			}
	});
});

index.get("/page/:id",function(req,res){
	Vacc.findById(req.params.id, function(err, found){
		if(err)
			{
				res.redirect("/page");
			}
		else
			{
				
				res.render("show",{vacc: found});
				console.log(found);
			}
	});
});

index.get("/create", function(req, res){
	res.render("form");
});

index.post("/page", function(req, res){
	Vacc.create(req.body.vacc, function(err, newblog){
		if(err)
			{
				console.log("new not created");
			}
		else
			{
				res.redirect("/page");
			}
	});
});

index.get("/page/:id/edit",function(req,res){
	Vacc.findById(req.params.id, function(err,found)
				 {
		if(err)
			{
				console.log("error");
			}
		else
			{
					res.render("edit",{vacc: found});
			}
	});
});

index.put("/page/:id",function(req,res){
	Vacc.findByIdAndUpdate(req.params.id,req.body.vacc, function(err,found)
						  {
		if(err)
			{
				console.log("error");
			}
		else
			{
				  var showUrl = "/page/" + req.params.id;
				  console.log(req.params.id);
                   res.redirect(showUrl);
			}
	});
});


index.listen(9000, function(req, res){
	console.log("vaccination app server started");
});
