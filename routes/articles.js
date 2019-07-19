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
    db.query('SELECT * FROM articles WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw error
        if (results.length === 0) {
            res.status(404)
            res.end()
        } else {
            res.json(results[0])
        }
    })
})

router.put('/article', (req, res) => {
    const db = req.app.get('db')
    const { title, body, author } = req.body

    db.query('INSERT INTO articles (title, body, author) VALUES (?, ?, ?)', [title, body, author], (err, result) => {
        if (err) throw err
        console.log(result.insertedId, result)
        res.json({ insertId: result.insertId })
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
