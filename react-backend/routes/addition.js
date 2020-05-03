var express = require("express");
var router  = express.Router({mergeParams: true});
var Addition = require("../models/addition")

// router.get("/", function(req, res){
//     // Get all addition infos from DB
//     Addition.find({}, function(err, allInfos){
//        if(err){
//            console.log(err);
//        } else {
//           res.render('addition',{title:'Aditional Information', infos:allInfos});
//        }
//     });
// });
router.get("/", function(req, res){
    res.render('addition', {title:'Aditional Information'});
})

router.post("/", function(req, res){
    if(req.method === "POST"){
        var major = req.body.major;
        var level = req.body.level;
        var course = req.body.course;
        
        // var item = function(major, level, course, next){
        //     Addition.find({major: major, level: level, course: course},{link: 1}, function(err, items){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             r
        //         }
        //     }
        // }
        // Addition.find({major: major, level: level, course: course}, {link: 1}),(function(err, items){
            
        //     res.send(pagelist(items));
        // });

        // Addition.find({
        //     "$text":{
        //         "$search": req.body.query
        //     }
        // }, {link:1}).toArray(function(err, items){
        //     res.send(pagelist(items));
        // })
        Addition.find({major: major, level: level, course: course}, {link: 1}).lean().exec(function(err, items){
            if(err){
                console.log(err);
            } else {
                res.send(pagelist(items));
            }
        })
    }
})

function pagelist(items) {
    result = "<html><body><ul>";
    items.forEach(function(item) {
      itemstring = "<li>" +  '<a href="'+ item.link + '">'+ item.link +'</a>'+ "</li>";
      result = result + itemstring;
    });
    result = result + "</ul></body></html>";
    return result;
  }

  module.exports = router;