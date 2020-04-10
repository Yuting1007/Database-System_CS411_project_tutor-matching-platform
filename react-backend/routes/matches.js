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
        //port: 3307
        port: 3306
        //insecureAuth : true
      })
}

router.get("/all-students", (req, res) => {
  const connection = getConnection();

  const queryString = "SELECT * FROM students";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for students: " + err);
      res.sendStatus(500);
      //res.end();
      return;
    }

    console.log("I think we fetched students successfully")
    console.log(rows)
    res.json(rows)
  })
})

router.get("/all-tutors", (req, res) => {
    const connection = getConnection();
  
    const queryString = "SELECT * FROM tutors";
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for tutors: " + err);
        res.sendStatus(500);
        //res.end();
        return;
      }
  
      console.log("I think we fetched tutors successfully")
      console.log(rows)
      res.json(rows)
    })
  })

  ////
// GET request that returns t_id of all tutors a student has liked
////
router.get('/show-tutor-matches/:id', (req, res) => {
    console.log("Fetching tutor with id: " + req.params.id)
  
    const connection = getConnection();
  
    const userId = req.params.id;
    const queryString = "SELECT t_id FROM matches WHERE s_id = ?";
    connection.query(queryString, [userId], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for student: " + err);
        res.sendStatus(500);
        return;
      }
  
      console.log("Fetched tutor matches successfully")
      console.log(rows)
      res.json(rows)
    })
  
    //res.end()
  })

  router.post('/match-create', (req, res) => {
    console.log("Trying to create a new match...")
    console.log(typeof req.body.newMatch.s_id)
    console.log(req.body)
    const s_id = parseInt(req.body.newMatch.s_id);
    const t_id = parseInt(req.body.newMatch.t_id);
    const m_s_like = parseInt(req.body.newMatch.m_s_like);
    const m_t_like = parseInt(req.body.newMatch.m_t_like)
    
    const queryString = 'INSERT INTO matches (s_id, t_id, m_s_like, m_t_like) VALUES (?, ?, ?, ?)'
    
    getConnection().query(queryString, [s_id, t_id, m_s_like, m_t_like], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new student-to-tutor match: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Inserted a new match')
        res.end()
    })
})



module.exports = router;
