const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    const db = req.app.get('db')
    db.query('Select * from articles', (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

router.post('/article', (req,res) => {
    const db =req.app.get('db')
    const title = req.body.title
    const body = req.body.body
    const author = req.body.author
    db.query('insert into articles(??,??,??)',[title,body,author], (err) => {
        if(err) console.log('408')
        res('200')
    })
})

module.exports = router
