const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
// comments from copied code:Setup a GET route to get all the creatures from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `
        SELECT * FROM tasks
            ORDER BY id;
    `
    //I am concerned the sql above is not correct
    pool.query(sqlText)
        .then((dbResult) => {
            console.log(`dbResult.rows is:`, dbResult.rows);
            res.send(dbResult.rows);
        })
        .catch((dbError) => {
            console.log(`dbError making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})
// POST - this is my next activity
router.post('/', (req, res) => {
    let newTask = req.body;
    let sqlText = `
        INSERT INTO tasks
            (description, activetaskstatus)
            VALUES
            ($1, $2);
    `
    let sqlValues = [
      newTask.description,
      newTask.activetaskstatus
    ]
    console.log ("this is newTask", newTask)
    console.log ("this is sqlValues",sqlValues)

    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
            console.log(`Added creature to the database`, newTask);
            res.sendStatus(201);
        })
        .catch((dbError) => {
            console.log(`Error making database query ${sqlText}`, dbError);
            res.sendStatus(500);
        })
})
// PUT
router.put('/:id'), (req,res) => {
    let { id } = req.params;
    //this query will switch from true to false and false to true
    const sqlText = `
        UPDATE "tasks" SET "activetaskstatus" to NOT "activetaskstatus"
        WHERE "id" = $1;
    `;
    pool.query(sqlText, [id])
    .then((result) => {
        console.log(`Got stuff back form the database`, result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`error making database query ${sqlText}`, error);
        res.sendStatus(500); //a good server always responds
    })
}

// DELETE

module.exports = router;
