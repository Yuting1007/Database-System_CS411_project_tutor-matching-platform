var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// Function that gets connection to SQL database
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password', // PUT your own password here whatever it is locally
        database: '411project',
        port: 3307
      })
}


////
// GET request that takes a user's id a returns specifics
////
//router.get('/student/:id', (req, res) =>
router.get('/student/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = getConnection();

  const userId = req.params.id;
  const queryString = "SELECT * FROM students WHERE s_id = ?";
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for student: " + err);
      res.sendStatus(500);
      return;
    }

    console.log("I think we fetched users successfully")
    console.log(rows)
    res.json(rows)
  })

  //res.end()
})

router.post('/student-create', (req, res) => {
    console.log("Trying to create a new student...")
    console.log(typeof req.body.formResults.name)
    console.log(req.body)
    const name = req.body.formResults.name;
    const age = parseInt(req.body.formResults.age);
    const location = req.body.formResults.location;

    
    const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [name, age, location], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Inserted a new student with id: ')
        res.end()
    })
})

module.exports = router;
