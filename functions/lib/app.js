const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const contactRouter = require('./routes/contact')
const articlesRouter = require('./routes/articles')
const authRouter = require('./routes/auth')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('./constants/env_vairables')

const mysqlOptions = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
}

function initApp() {
    // Creating a pool ensures the connection to the database is never lost
    console.log(mysqlOptions)
    const conn = mysql.createPool(mysqlOptions)
    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use('/contact', contactRouter)
    app.use('/articles', articlesRouter)
    app.use('/auth', authRouter)
    app.set('db', conn)

    app.get('/', (req, res) => res.send('Not Found'))    

    return app
}

module.exports = { initApp }
