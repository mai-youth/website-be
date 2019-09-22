const express = require('express')
const router = express.Router()
const { generateToken } = require('../utils/token')

router.post('/authenticate', (req, res) => {
    const { passPhrase } = req.body

    if (passPhrase !== process.env.PASS_PHRASE) {
        return res.status(401).end()
    }

    res.json({ token: generateToken(15) })
})

module.exports = router
