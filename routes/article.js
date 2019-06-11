const express = require('express')
const router = express.Router()

router.get('articles/article/:id', (req, res) => {
    const db = req.app.get('db')
    const sql = mysql.format('SELECT * FROM article WHERE id = ??', [req.params.id])
    db.query(sql, (error, results) => {

        if (error) throw error
        res.json(results)
    })
})

module.exports = router
