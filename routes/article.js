const express = require('express')
const router = express.Router()

router.get('articles/article/:id', (req, res) => {
    const db = req.app.get('db')
    db.query('SELECT * FROM article WHERE id = ' + req.params.id, (error, results) => {

        if (error) throw error
        res.json(results)
    })
})

module.exports = router
