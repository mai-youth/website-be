const express = require('express')
const router = express.Router()
const { generateToken } = require('../utils/token')

router.post('/', (req, res) => {
    const { passPhrase } = req.body

    if (passPhrase !== process.env.PASS_PHRASE) {
        return res.status(401).end()
    }

    res.json({ token: generateToken() })
})

module.exports = router
