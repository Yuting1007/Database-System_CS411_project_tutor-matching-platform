var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Function that gets connection to SQL database
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password', // PUT your own password here whatever it is locally
        database: '411project'
      })
}

router.get("/all-students", (req, res) => {
  const connection = getConnection();

  const queryString = "SELECT * FROM students";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      //res.end();
      return;
    }

    console.log("I think we fetched users successfully")
    console.log(rows)
    res.json(rows)
  })
})



module.exports = router;
