const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const contactRouter = require('./routes/contact')
const articlesRouter = require('./routes/articles')
const authRouter = require('./routes/auth')

const port = process.env.PORT || 5000
const mysqlOptions = process.env.CLEARDB_DATABASE_URL ? process.env.CLEARDB_DATABASE_URL : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

function start() {
    // Creating a pool ensures the connection to the database is never lost
    const conn = mysql.createPool(mysqlOptions)
    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use('/contact', contactRouter)
    app.use('/articles', articlesRouter)
    app.use('/auth', authRouter)
    app.set('db', conn)

    app.get('/', (req, res) => res.send('Not Found'))    

    app.listen(port, () => console.log(`App listening on port ${port}!`))
}

start()
