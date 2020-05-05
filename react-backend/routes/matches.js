var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Function that gets connection to SQL database
function getConnection() {
    return mysql.createConnection({
      host: 'us-cdbr-east-06.cleardb.net',
      user: 'ba0144eebe0617',
      password: '45188a1d', 
      database: 'heroku_195486945502404'
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


    ////
// GET request that returns s_id of all students a tutor has liked
////
router.get('/show-student-matches/:id', (req, res) => {
  console.log("Fetching student with id: " + req.params.id)

  const connection = getConnection();

  const userId = req.params.id;
  const queryString = "SELECT s_id FROM matches WHERE t_id = ?";
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for student: " + err);
      res.sendStatus(500);
      return;
    }

    console.log("Fetched student matches successfully")
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

  console.log("s_id: " + s_id)
  console.log("t_id: " + t_id)
  
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
  console.log("form result edu_level is: " + preference_edu_level)
  console.log("form result gender is: " + preference_gender)

  let condition_major = '';
  let condition_edu_level = '';
  let condition_gender = '';
  let condition_rating = '';

  if (preference_pastEx === 'No') {

    // Fill in select conditions without JOIN
    if (preference_major != 'None') {
      condition_major = ' AND t_major = ' + "'" + preference_major + "'" ;
    }
  
    if (preference_edu_level != 'None') {
      condition_edu_level = ' AND t_edu_level = ' + "'" + preference_edu_level + "'";
    }
  
    if (preference_gender != 'None') {
      condition_gender = ' AND t_gender = ' + "'" + preference_gender + "'";
    }
  
    if (preference_rating != 'None') {
      condition_rating = ' WHERE t_ratings >= ' + preference_rating;
    } else {
      condition_rating = ' WHERE t_ratings >= -999999';
    }

    const queryString = 'SELECT * FROM tutors' + condition_rating + condition_edu_level + condition_gender + condition_major
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
  } else {

    // fill in select condition with JOIN
    if (preference_major != 'None') {
      condition_major = ' AND t.t_major = ' + "'" + preference_major + "'" ;
    }
  
    if (preference_edu_level != 'None') {
      condition_edu_level = ' AND t.t_edu_level = ' + "'" + preference_edu_level + "'";
    }
  
    if (preference_gender != 'None') {
      condition_gender = ' AND t.t_gender = ' + "'" + preference_gender + "'";
    }
  
    if (preference_rating != 'None') {
      condition_rating = ' AND t.t_ratings >= ' + preference_rating;
    }

    /* When we consider student's match history in the recommendation, we only consider the tutors 
      that have been matched with the student more than once, under the assumption that a repeated
      match implies that previous matches are enjoyable. */
    const queryString = 'SELECT t.t_id, t.t_name, t.t_major, t.t_email, t.t_pnum, t.t_edu_level, t.t_ratings ' +  
                        'FROM tutors t JOIN (SELECT t_id, COUNT(m_id) AS count_mID ' + 
                                            'FROM student_history ' + 
                                            'GROUP BY t_id ' + 
                                            'HAVING COUNT(m_id) > 1) ' + 
                                            'AS candidates ON t.t_id = candidates.t_id ' + 
                                            condition_major + condition_edu_level + condition_gender + condition_rating + 
                        ' ORDER BY candidates.count_mID DESC, t.t_ratings DESC'



    console.log("query is: " + queryString)

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
  }
})

router.post('/recommend-tutorEnd', (req, res) => {
  console.log("Trying to fetch recommendations...")
  const preference_location = req.body.formResults.preference_location;
  const preference_gender = req.body.formResults.preference_gender;
  const preference_rating = req.body.formResults.preference_rating
  const preference_pastEx = req.body.formResults.preference_pastEx;
  const preference_major = req.body.formResults.preference_major;

  console.log("form result location is: " + preference_location)
  console.log("form result gender is: " + preference_gender)

  let condition_location = '';
  let condition_gender = '';
  let condition_rating = '';
  let condition_major = '';

  if (preference_pastEx === 'No') {

    // Fill in select conditions without JOIN
    if (preference_location != 'None') {
      condition_location = ' AND s_location = ' + "'" + preference_location + "'" ;
    }
  
    if (preference_gender != 'None') {
      condition_gender = ' AND s_gender = ' + "'" + preference_gender + "'";
    }

    if (preference_major != 'None') {
      condition_major = ' AND s_major = ' + "'" + preference_major + "'";
    }
  
    if (preference_rating != 'None') {
      condition_rating = ' WHERE s_ratings >= ' + preference_rating;
    } else {
      condition_rating = ' WHERE s_ratings >= -999999';
    }

    const queryString = 'SELECT * FROM students' + condition_rating + condition_gender + condition_location + condition_major
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
  } else {

    // fill in select condition with JOIN
    if (preference_location != 'None') {
      condition_location = ' AND s.s_location = ' + "'" + preference_location + "'" ;
    }
  
    if (preference_gender != 'None') {
      condition_gender = ' AND s.s_gender = ' + "'" + preference_gender + "'";
    }

    if (preference_major != 'None') {
      condition_major = ' AND s.s_major = ' + "'" + preference_major + "'";
    }
  
    if (preference_rating != 'None') {
      condition_rating = ' AND s.s_ratings >= ' + preference_rating;
    }

    /* When we consider student's match history in the recommendation, we only consider the tutors 
      that have been matched with the student more than once, under the assumption that a repeated
      match implies that previous matches are enjoyable. */
    const queryString = 'SELECT s.s_id, s.s_name, s.s_location, s.s_email, s.s_pnum, s.s_ratings ' +  
                        'FROM students s JOIN (SELECT s_id, COUNT(m_id) AS count_mID ' + 
                                            'FROM student_history ' + 
                                            'GROUP BY s_id ' + 
                                            'HAVING COUNT(m_id) > 1) ' + 
                                            'AS candidates ON s.s_id = candidates.s_id ' + 
                                            condition_location + condition_gender + condition_rating + condition_major + 
                        ' ORDER BY candidates.count_mID DESC, s.s_ratings DESC'



    console.log("query is: " + queryString)

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
  }
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
