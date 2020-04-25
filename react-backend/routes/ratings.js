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
        // port: 3307
        port: 3306
        //insecureAuth : true
      })
}


// TUTOR SECTION  (student votes on tutor)======================================================
//==============================================================================================


//update score ==========================================================
router.post('/update-tutor-rating/:t_id/:amount', (req, res) => {
    console.log("Trying to update a tutor's rating...")
    
    const amount = parseInt(req.params.amount);
    const id = parseInt(req.params.t_id);
    //const age = parseInt(req.body.formResults.age);
    console.log('id: ' + id)
    console.log('amount: ' +amount)

    const queryString = 'UPDATE tutors SET t_rating = ? WHERE t_id = ?'

    
    getConnection().query(queryString, [amount, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to update: " + err)
            res.sendStatus(500)
            return
        }

        console.log('Update a tutors age')
        res.end()
    })
});





module.exports = router;