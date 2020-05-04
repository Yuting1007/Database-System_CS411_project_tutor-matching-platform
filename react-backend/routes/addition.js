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
        
    // console.log("major is: " + major)
    // console.log("level is: " + level)
    // console.log("course is: " + course)

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
                //items.toObject();
                console.log("reach this point 1")
                console.log(items)
                console.log("reach this point 2")
                res.send(pagelist(items));
                console.log("reach this point 3")
                console.log(items)
                console.log("reach this point 4")
            }
        })
    }
})

function pagelist(items) {
    result = "<html><body><ul>";
    items.forEach(function(item) {
        itemstring = "<li>" +  '<a href="'+ item.major + '">'+ item.major +'</a>'+ "</li>";
        // let itemObject = item.toObject();
        // itemstring = "<li>" +  '<a href="'+ itemObject.link + '">'+ itemObject.link +'</a>'+ "</li>";
        console.log("string is: " + itemstring)
        result = result + itemstring;
    });
    result = result + "</ul></body></html>";
    return result;
  }

router.post("/get-resources", (req, res) => {
    // if(req.body.formResults.addi_pre_major != NULL){
    //     var addi_pre_major = req.body.formResults.addi_pre_major;    
    // }
    var obj = {}
    if(req.body.formResults.addi_pre_major){
        obj['major'] = req.body.formResults.addi_pre_major;
    }
    if(req.body.formResults.addi_pre_level){
        obj['level'] = req.body.formResults.addi_pre_level;

    }
    if(req.body.formResults.addi_pre_course){
        obj['course'] = req.body.formResults.addi_pre_course;
    }
    // var addi_pre_major = req.body.formResults.addi_pre_major;
    // var addi_pre_level = req.body.formResults.addi_pre_level;
    // var addi_pre_course = req.body.formResults.addi_pre_course;
    
    

    // console.log("front end major is: " + addi_pre_major)
    // console.log("front end level is: " + addi_pre_level)
    // console.log("front end course is: " + addi_pre_course)

    //var major_condition = 'major: ' + "'" + addi_pre_major + "'";
    //var addi_pre_course = "{$ne: '411'}"

    // Addition.find({major: addi_pre_major, level: addi_pre_level, course: addi_pre_course},  {link: 1, major: 1, level: 1, course: 1, description: 1}).lean().exec(function(err, items){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         //items.toObject();
    //         //res.json(pagelist(items));
    //         res.json(items);
    //         // console.log("reach this point 1")
    //         // console.log(items)
    //         // console.log("reach this point 2")
    //     }
    // })

    
    //making search object dynamically
    Addition.find(obj,  {link: 1, major: 1, level: 1, course: 1, description: 1}).lean().exec(function(err, items){
        if(err){
            console.log(err);
        } else {
            //items.toObject();
            //res.json(pagelist(items));
            res.json(items);
            // console.log("reach this point 1")
            // console.log(items)
            // console.log("reach this point 2")
        }
    })
});

  module.exports = router;