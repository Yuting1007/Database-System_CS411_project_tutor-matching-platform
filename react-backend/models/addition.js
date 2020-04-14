var mongoose = require('mongoose');

//create new db schema
var testSchema = new mongoose.Schema({
    link: String,
    major: String,
    level: String,
    course: String
});

//export model
module.exports = mongoose.model("Test", testSchema);
