const express = require('express')
const router = express.Router()
const { requireAuth } = require('../utils/token')

// Get all articles
router.get('/', (req, res) => {
    const db = req.app.get('db')
    db.query('Select * from articles', (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

// Get one article by Id
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

// Add new article
router.put('/article', requireAuth, (req, res) => {
    const db = req.app.get('db')
    const { title, body, author, color, isPublished } = req.body

    db.query('INSERT INTO articles (title, body, author, color, isPublished) VALUES (?, ?, ?, ?, ?)', [title, body, author, color, isPublished], (err, result) => {
        if (err) throw err
        res.json({ insertId: result.insertId })
    })
})

// Edit article
router.post('/article/:id', requireAuth, (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.query('SELECT * FROM articles WHERE id = ?', [id], (error, results) => {
        if (error) throw error
        if (results.length === 0) {
            res.status(404)
            res.end()
        } else {
            const { title, body, author, color } = results[0]
            const { newTitle, newBody, newAuthor, newColor } = req.body
            db.query(
                'UPDATE articles SET title = ?, body = ?, author = ?, color = ? WHERE id = ?'
                , [newTitle || title, newBody || body, newAuthor || author, newColor || color, id]
                , (error) => {
                    if (error) throw error
                    res.end()
                }
            )
        }
    })
})

// Delete article
router.delete('/article/:id', requireAuth, (req, res) => {
    const db = req.app.get('db')
    db.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error) => {
        if (error) throw error
        res.end()
    })
})

// Increment article view count
router.post('/article/:id/seen', (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.query('UPDATE articles SET views = views + 1 WHERE id = ?', [id], (error) => {
        if (error) throw error
        res.json()
    })
})

// Increment article like count
router.post('/article/:id/liked', (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.query('UPDATE articles SET likes = likes + 1 WHERE id = ?', [id], (error) => {
        if (error) throw error
        res.json()
    })
})

router.post('articles/:id/publish', (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.query('UPDATE articles SET isPublished = 1 WHERE id = ?', [id], (error => {
        if(error) throw error
        res.json()
    }))
})

router.post('articles/:id/unpublish', (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.query('UPDATE articles SET isPublished = 0 WHERE id = ?', [id], (error => {
        if(error) throw error
        res.json()
    }))
})

module.exports = router
