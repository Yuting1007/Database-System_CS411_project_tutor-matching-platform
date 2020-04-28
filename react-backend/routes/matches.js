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
        //port: 3306
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

  //delete match
router.get('/delete/:s_id/:t_id', (req, res) => {
    console.log("Deleting match with id: " + req.params.s_id)
  
    const connection = getConnection();
  
    const s_id = req.params.s_id;
    const t_id = req.params.t_id;
    const queryString = "DELETE FROM matches WHERE s_id = ? AND t_id = ?";
    connection.query(queryString, [s_id, t_id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for student: " + err);
        res.sendStatus(500);
        return;
      }
  
      console.log("I think we fetched users successfully")
      console.log(rows)
      res.json(rows)
    })
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

router.post('/match-check', (req, res) => {
  console.log("Trying to fetch a match...")
  const s_id = parseInt(req.body.newMatch.s_id);
  const t_id = parseInt(req.body.newMatch.t_id);
  
  const queryString = 'SELECT * FROM matches WHERE s_id = ? AND t_id = ?'
  
  getConnection().query(queryString, [s_id, t_id], (err, results, fields) => {
      if (err) {
          console.log("Failed to insert new student-to-tutor match: " + err)
          res.sendStatus(500)
          return
      }

      console.log('checking existance of a match')
      console.log(results)
      res.json(results)
  })
})

router.post('/recommend', (req, res) => {
  console.log("Trying to fetch recommendations...")
  const preference_major = req.body.formResults.preference_major;
  const preference_edu_level = req.body.formResults.preference_edu_level;
  const preference_gender = req.body.formResults.preference_gender;
  const preference_rating = req.body.formResults.preference_rating
  const preference_pastEx = req.body.formResults.preference_pastEx;


  console.log("form result major is: " + preference_major)
  console.log("form result edu_level variable is: " + preference_edu_level)
  console.log("form result gender variable is: " + preference_gender)

  let major = '';
  let edu_level = '';
  let gender = '';
  let rating = '';
  let pastEx = ''

  if (preference_major != 'none') {
    major = ' WHERE t_major = ' + "'" + preference_major + "'" ;
  }

  if (preference_edu_level != 'none') {
    edu_level = ' AND t_edu_level = ' + "'" + preference_edu_level + "'";
  }

  if (preference_gender != 'none') {
    gender = ' AND t_gender = ' + "'" + preference_gender + "'";
  }

  if (preference_rating != 'none') {
    rating = ' AND t_ratings >= ' + preference_rating;
  }

  // if (preference_pastEx === 'yes') {

  // }
  console.log("major variable is: " + major)
  console.log("edu_level variable is: " + edu_level)
  console.log("gender variable is: " + gender)
  
  const queryString = 'SELECT * FROM tutors' + major + edu_level + gender + rating
  console.log("sql query is: " + queryString)

  getConnection().query(queryString, (err, results, fields) => {
      if (err) {
          console.log("Failed to get recommendation: " + err)
          res.sendStatus(500)
          return
      }

      console.log('trying to get recommendations')
      console.log(results)
      res.json(results)
  })
})

router.post('/match-insertHistory', (req, res) => {
  console.log("Trying to insert a match into history...")
  const s_id = parseInt(req.body.newMatch.s_id);
  const t_id = parseInt(req.body.newMatch.t_id);
  const m_id = parseInt(req.body.newMatch.m_id);
  const m_s_like = parseInt(req.body.newMatch.m_s_like);
  const m_t_like = parseInt(req.body.newMatch.m_t_like);
  const m_mutual = parseInt(req.body.newMatch.m_mutual);
  
  
  const queryString = 'INSERT INTO student_history (s_id, t_id, m_id, m_s_like, m_t_like, m_mutual) VALUES (?, ?, ?, ?, ?, ?)'
  
  getConnection().query(queryString, [s_id, t_id, m_id, m_s_like, m_t_like, m_mutual], (err, results, fields) => {
      if (err) {
          console.log("Failed to insert new student-to-tutor match: " + err)
          res.sendStatus(500)
          return
      }

      console.log('checking existance of a match')
      console.log(results)
      res.json(results)
  })
})



module.exports = router;
