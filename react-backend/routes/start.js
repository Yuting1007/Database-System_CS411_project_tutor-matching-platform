var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passwordHash = require('password-hash');



// Function that gets connection to SQL database
function getConnection() {
  return mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'ba0144eebe0617',
    password: '45188a1d', 
    database: 'heroku_195486945502404'
   //insecureAuth : true
    ////////
    // LOCAL HOST INFORMATION BELOW
    // host: 'localhost',
    // user: 'root',
    // password: 'password', // PUT your own password here whatever it is locally
    // database: '411project',
    // port: 3307
    //port: 3306
    //insecureAuth : true
    })
}
// var db_config = {
//   host: 'us-cdbr-east-06.cleardb.net',
//     user: 'ba0144eebe0617',
//     password: '45188a1d', 
//     database: 'heroku_195486945502404'
// };

// var safeConnection;

// function handleDisconnect() {
//   console.log('START DISCONNECT');
//   safeConnection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   safeConnection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   safeConnection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
// }

// handleDisconnect();


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
});

router.get('/tutor/:id', (req, res) => {
  console.log("Fetching tutor with id: " + req.params.id)

  const connection = getConnection();

  const userId = req.params.id;
  const queryString = "SELECT * FROM tutors WHERE t_id = ?";
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for tutor: " + err);
      res.sendStatus(500);
      return;
    }

    console.log("I think we fetched users successfully")
    console.log(rows)
    res.json(rows)
  })

  //res.end()
});

router.post('/tutor-create', (req, res) => {
    console.log("Trying to create a new tutor...")
    console.log(typeof req.body.formResults.name)
    console.log(req.body)
    const name = req.body.formResults.name;
    const age = parseInt(req.body.formResults.age);
    const location = req.body.formResults.location;
    const gender = req.body.formResults.gender;
    const grade = req.body.formResults.grade;
    const edu_level = req.body.formResults.edu_level;
    const major = req.body.formResults.major;
    const email = req.body.formResults.email;
    const pnum = req.body.formResults.pnum;
    const password = req.body.formResults.hashedPassword;

    
    const queryString = 'INSERT INTO tutors (t_name, t_age, t_location, t_gender, t_edu_level, t_grade, t_major, t_email, t_pnum, t_password, t_ratings) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)'
    
    getConnection().query(queryString, [name, age, location, gender, edu_level, grade, major, email, pnum, password], (err, results, fields) => {
        
      if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }
      console.log('Inserted a new tutor with id: '+ results.insertId)

      res.json(results)
    })
})


router.post('/student-create', (req, res) => {
  console.log("Trying to create a new student...")
  console.log(typeof req.body.formResults.name)
  console.log(req.body)
  const name = req.body.formResults.name;
  const age = parseInt(req.body.formResults.age);
  const location = req.body.formResults.location;
  const gender = req.body.formResults.gender;
  const email = req.body.formResults.email;
  const pnum = req.body.formResults.pnum;
  const password = req.body.formResults.hashedPassword;

  
  const queryString = 'INSERT INTO students (s_name, s_age, s_location, s_gender, s_email, s_pnum, s_password,  s_ratings) VALUES (?, ?, ?, ?, ?, ?, ?, 0)'
  
  getConnection().query(queryString, [name, age, location, gender, email, pnum, password], (err, results, fields) => {
      if (err) {
          console.log("Failed to insert new user: " + err)
          res.sendStatus(500)
          return
      }
      console.log('Inserted a new student with id: '+ results.insertId)

      res.json(results)
  })
})

module.exports = router;
