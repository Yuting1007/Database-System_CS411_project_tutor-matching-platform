var express = require("express");
var router  = express.Router({mergeParams: true});
var Addition = require("../models/addition")

router.get("/", function(req, res){
    // Get all addition infos from DB
    Addition.find({}, function(err, allInfos){
       if(err){
           console.log(err);
       } else {
          res.render("addition/index",{infos:allInfos});
       }
    });
});

  module.exports = router;