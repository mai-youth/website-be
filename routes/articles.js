const express = require('express')
const mysql = require('mysql')
const router = express.Router()

router.get('/', (req, res) => {
    const db = req.app.get('db')
    db.query('Select * from articles', (err, result) => {
        if (err) throw err
        res.json(result)
    })
})


router.post('/article', (req,res) => {
    const db = req.app.get('db')
    const title  = req.body.title
    const body = req.body.body
    const author = req.body.author
    
    db.query('INSERT INTO articles(title,body,author) VALUES(?,?,?)',[title,body,author], (err) => {
        if(err) console.log(err)
        else res.status(200)
        res.end() 
    })
})

router.get('/article/:id', (req, res) => {
    const db = req.app.get('db')
    const sql = mysql.format('SELECT * FROM articles WHERE id = ?', [req.params.id])
    db.query(sql, (error, results) => {
        if (error) throw error
        if (results.length === 0) {
            res.status(404)
            res.end()
        } else {
            res.json(results[0])
        }
<<<<<<< HEAD

=======
>>>>>>> 5db2d4eb1857cc9385c1f6793aac67a7adcf6c2d
    })
})

module.exports = router
