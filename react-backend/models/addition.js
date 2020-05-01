var mongoose = require('mongoose');

//create new db schema
var additionSchema = new mongoose.Schema({
    link: String,
    major: String,
    level: String,
    course: String
});

//export model
module.exports = mongoose.model("Addition", additionSchema);
