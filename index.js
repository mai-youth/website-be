const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const contactRouter = require('./routes/contact')
const articlesRouter = require('./routes/articles')

const port = process.env.PORT || 5000
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

conn.connect((err) => {
    if (err) {
        console.log('ERR: Could not connect to DB. ' + err)
        return
    }
    console.log('Connnected to DB!')

    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use('/contact', contactRouter)
    app.use('/articles', articlesRouter)
    app.set('db', conn)

    app.get('/', (req, res) => res.send('Not Found'))

    app.listen(port, () => console.log(`App listening on port ${port}!`))
})
