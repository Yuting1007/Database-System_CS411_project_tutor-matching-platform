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
// router.get("/", function(req, res){
//     res.render('addition', {title:'Aditional Information'});
// })

// router.post("/", function(req, res){
//     if(req.method === "POST"){
//         var major = req.body.major;
//         var level = req.body.level;
//         var course = req.body.course;
        
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
//         Addition.find({major: major, level: level, course: course}, {link: 1}).lean().exec(function(err, items){
//             if(err){
//                 console.log(err);
//             } else {
//                 //items.toObject();
//                 console.log("reach this point 1")
//                 console.log(items)
//                 console.log("reach this point 2")
//                 res.send(pagelist(items));
//                 console.log("reach this point 3")
//                 console.log(items)
//                 console.log("reach this point 4")
//             }
//         })
//     }
// })

// function pagelist(items) {
//     result = "<html><body><ul>";
//     items.forEach(function(item) {
//         itemstring = "<li>" +  '<a href="'+ item.major + '">'+ item.major +'</a>'+ "</li>";
//         // let itemObject = item.toObject();
//         // itemstring = "<li>" +  '<a href="'+ itemObject.link + '">'+ itemObject.link +'</a>'+ "</li>";
//         console.log("string is: " + itemstring)
//         result = result + itemstring;
//     });
//     result = result + "</ul></body></html>";
//     return result;
// }

//Create a new additional information and save to DB
router.post("/add-resources", (req, res) => {
    var addi_pre_link = req.body.formResults.addi_pre_link;
    var addi_pre_major = req.body.formResults.addi_pre_major;
    var addi_pre_level = req.body.formResults.addi_pre_level;
    var addi_pre_course = req.body.formResults.addi_pre_course;
    var addi_pre_description = re.body.formResults.addi_pre_description;
    
    var newAdditionInfo = {link: addi_pre_link, major: addi_pre_major, level: addi_pre_level, course: addi_pre_course, description: addi_pre_description}
    Addition.create(newAdditionInfo, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            // res.json(newlyCreated);
        }
    })
})

//search for an additional information from DB
router.post("/get-resources", (req, res) => {
    //making search object dynamically
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

Addition.find(obj,  {link: 1, major: 1, level: 1, course: 1, description: 1}).lean().exec(function(err, items){
        if(err){
            console.log(err);
        } else {
            res.json(items);
        }
    })
});

router.post('/insert-resource', (req, res) => {
    console.log("reach insertion!!")
    var obj = {};
    if(req.body.formResults.major !== 'N/A'){
        obj['major'] = req.body.formResults.major;
    }
    if(req.body.formResults.level !== 'N/A'){
        obj['level'] = req.body.formResults.level;
    }
    if(req.body.formResults.course !== 'N/A'){
        obj['course'] = req.body.formResults.course;
    }
    if(req.body.formResults.link){
        obj['link'] = req.body.formResults.link;
    }
    if(req.body.formResults.description){
        obj['description'] = req.body.formResults.description;
    }

    console.log('level is: ' + req.body.formResults.level)
    console.log('major is: ' + req.body.formResults.major)

    Addition.insertMany(obj);
});
  module.exports = router;