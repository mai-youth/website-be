const express = require('express')
const cors = require('cors')

const contactRouter = require('./routes/contact')
const articleRouter = require('./routes/article')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use('/contact', contactRouter)
app.use('/blog', articleRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
