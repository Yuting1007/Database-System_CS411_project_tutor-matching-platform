var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Function that gets connection to SQL database
function getConnection() {
    return mysql.createConnection({
         ////////
      // LOCAL HOST INFORMATION BELOW
       host: 'localhost',
       user: 'root',
       password: 'password', // PUT your own password here whatever it is locally
       database: '411project',
      // port: 3307
      port: 3306
      //insecureAuth : true
      })
}

// update name ================================================================================
router.post('/update-name', (req, res) => {
    console.log("Trying to update a name...")
    console.log(typeof req.body.formResults.name)
    console.log(req.body)
    const name = req.body.formResults.name;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_name = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [name, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student name')
        res.end()
    })
});

//update age ==========================================================
router.post('/update-age', (req, res) => {
    console.log("Trying to update a age...")
    console.log(typeof req.body.formResults.age)
    console.log(req.body)
    const age = req.body.formResults.age;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_age = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [age, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student age')
        res.end()
    })
});

//update major ==========================================================
router.post('/update-major', (req, res) => {
    console.log("Trying to update a major...")
    console.log(typeof req.body.formResults.major)
    console.log(req.body)
    const major = req.body.formResults.major;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_major = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [major, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student major')
        res.end()
    })
});

//update education level ==========================================================
router.post('/update-edu-level', (req, res) => {
    console.log("Trying to update a edu-level...")
    console.log(typeof req.body.formResults.edu_level)
    console.log(req.body)
    const edu_level = req.body.formResults.edu_level;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_edu_level = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [edu_level, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student edu_level')
        res.end()
    })
});

//update location =======================================================
router.post('/update-location', (req, res) => {
    console.log("Trying to update a location...")
    console.log(typeof req.body.formResults.location)
    console.log(req.body)
    const location = req.body.formResults.location;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_location = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [location, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student location')
        res.end()
    })
});

//update gender ==============================================================
router.post('/update-gender', (req, res) => {
    console.log("Trying to update a gender...")
    console.log(typeof req.body.formResults.gender)
    console.log(req.body)
    const gender = req.body.formResults.gender;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_gender = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [gender, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student gender')
        res.end()
    })
});

//update Email ==============================================================
router.post('/update-email', (req, res) => {
    console.log("Trying to update a email...")
    console.log(typeof req.body.formResults.email)
    console.log(req.body)
    const email = req.body.formResults.email;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE students SET s_email = ? WHERE s_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [email, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student email')
        res.end()
    })
});

//update Phone Number ==============================================================

router.post('', (req, res) => {
    
    console.log("Trying to update a pnum...")
    console.log(typeof req.body.formResults.pnum)
    console.log(req.body)
    const pnum = req.body.formResults.pnum;
    const id = req.body.formResults.id;
  

    const queryString = 'UPDATE students SET s_pnum = ? WHERE s_id = ?'

    
    
    getConnection().query(queryString, [pnum, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student pnum')
        res.end()
    })
});

//update password 

router.post('/update-password', (req, res) => {
    console.log("Trying to update a password!...")
    console.log(typeof req.body.formResults.HashedPassword)
    console.log(req.body)
    const Hash = req.body.formResults.Hash;
    const id = req.body.formResults.id;

    const queryString = 'UPDATE students SET s_password = ? WHERE s_id = ?'

 
    
    getConnection().query(queryString, [Hash, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a student password')
       
        res.end()
        
    })
});


// TUTOR SECTION =============================================================================
//===============================================================================================
// update name ================================================================================
router.post('/tutor-update-name', (req, res) => {
    console.log("Trying to update a name...")
    console.log(typeof req.body.formResults.name)
    console.log(req.body)
    const name = req.body.formResults.name;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_name = ? WHERE t_id = ?'

    getConnection().query(queryString, [name, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor name')
        res.end()
    })
});

//update age ==========================================================
router.post('/tutor-update-age', (req, res) => {
    console.log("Trying to update a age...")
    console.log(typeof req.body.formResults.age)
    console.log(req.body)
    const age = req.body.formResults.age;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);

    const queryString = 'UPDATE tutors SET t_age = ? WHERE t_id = ?'

    
    getConnection().query(queryString, [age, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutors age')
        res.end()
    })
});

//update location =======================================================
router.post('/tutor-update-location', (req, res) => {
    console.log("Trying to update a location...")
    console.log(typeof req.body.formResults.location)
    console.log(req.body)
    const location = req.body.formResults.location;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_location = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [location, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor location')
        res.end()
    })
});

//update gender ==============================================================
router.post('/tutor-update-gender', (req, res) => {
    console.log("Trying to update a gender...")
    console.log(typeof req.body.formResults.gender)
    console.log(req.body)
    const gender = req.body.formResults.gender;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_gender = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [gender, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor gender')
        res.end()
    })
});

//update education level ==============================================================
router.post('/tutor-update-edu-level', (req, res) => {
    console.log("Trying to update education level for a tutor...")
    console.log(typeof req.body.formResults.edu_level)
    console.log(req.body)
    const edu_level = req.body.formResults.edu_level;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_edu_level = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [edu_level, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor edu_level')
        res.end()
    })
});

//update grade ==============================================================
router.post('/tutor-update-grade', (req, res) => {
    console.log("Trying to update grade of a tutor...")
    console.log(typeof req.body.formResults.grade)
    console.log(req.body)
    const grade = req.body.formResults.grade;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_grade = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [grade, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor grade')
        res.end()
    })
});

//update major ==============================================================
router.post('/tutor-update-major', (req, res) => {
    console.log("Trying to update a major...")
    console.log(typeof req.body.formResults.major)
    console.log(req.body)
    const major = req.body.formResults.major;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_major = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [major, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor major')
        res.end()
    })
});

router.post('/tutor-update-password', (req, res) => {
    console.log("Trying to update password")
    console.log(typeof req.body.formResults.HashedPassword)
    console.log(req.body)
    const Hash = req.body.formResults.Hash;
    const id = req.body.formResults.id;
    

    const queryString = 'UPDATE tutors SET t_password = ? WHERE t_id = ?'

    
    
    getConnection().query(queryString, [Hash, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update tutor password')
        res.end()
    })
});

//update Email ==============================================================
router.post('/tutor-update-email', (req, res) => {
    console.log("Trying to update a email...")
    console.log(typeof req.body.formResults.email)
    console.log(req.body)
    const email = req.body.formResults.email;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_email = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [email, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor email')
        res.end()
    })
});

//update Phone Number ==============================================================
router.post('/tutor-update-pnum', (req, res) => {
    console.log("Trying to update a major...")
    console.log(typeof req.body.formResults.major)
    console.log(req.body)
    const pnum = req.body.formResults.pnum;
    const id = req.body.formResults.id;
    //const age = parseInt(req.body.formResults.age);
    //const location = req.body.formResults.location;

    const queryString = 'UPDATE tutors SET t_pnum = ? WHERE t_id = ?'

    //const queryString = 'INSERT INTO students (s_name, s_age, s_location) VALUES (?, ?, ?)'
    
    getConnection().query(queryString, [pnum, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutor phone number')
        res.end()
    })
});


//delete account
router.get('/tutor-delete/:id', (req, res) => {
    console.log("Deleting tutor with id: " + req.params.id)
  
    const connection = getConnection();
  
    const userId = req.params.id;
    const queryString = "DELETE FROM tutors WHERE t_id = ?";
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
})

module.exports = router;