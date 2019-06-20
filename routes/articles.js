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

module.exports = router
