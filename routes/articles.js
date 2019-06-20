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
    })
})

router.post('/article', (req, res) => {
    const db = req.app.get('db')
    const { title, body, author } = req.body

    db.query('INSERT INTO articles (title,body,author) VALUES(?, ?, ?)', [title, body, author], (err) => {
        if (err) throw err
        res.end()
    })
})

router.delete('/article/:id', (req, res) => {
    const db = req.app.get('db')
    db.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error) => {
        if (error) throw error
        res.end()
    })
})

module.exports = router
