const express = require('express')
const router = express.Router()
const { requireAuth } = require('../utils/token')

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

router.put('/article', requireAuth, (req, res) => {
    const db = req.app.get('db')
    const { title, body, author } = req.body

    db.query('INSERT INTO articles (title, body, author) VALUES (?, ?, ?)', [title, body, author], (err, result) => {
        if (err) throw err
        res.json({ insertId: result.insertId })
    })
})

router.post('/article/:id', requireAuth, (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.query('SELECT * FROM articles WHERE id = ?', [id], (error, results) => {
        if (error) throw error
        if (results.length === 0) {
            res.status(404)
            res.end()
        } else {
            const { title, body, author } = results[0]
            const { newTitle, newBody, newAuthor } = req.body
            db.query(
                'UPDATE articles SET title = ?, body = ?, author = ? WHERE id = ?'
                , [newTitle || title, newBody || body, newAuthor || author, id]
                , (error) => {
                    if (error) throw error
                    res.end()
                }
            )
        }
    })
})

router.delete('/article/:id', requireAuth, (req, res) => {
    const db = req.app.get('db')
    db.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error) => {
        if (error) throw error
        res.end()
    })
})

// Sample test endpoint for now
// We need to enable authentication on the FE before requiring it on the BE.
router.get('/protected', requireAuth, (req, res) => {
    res.send('You\'re in!')
})

module.exports = router
