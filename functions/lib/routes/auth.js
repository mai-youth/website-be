const express = require('express')
const router = express.Router()
const { generateToken } = require('../utils/token')
const { PASS_PHRASE } = require('../constants/env_vairables')

router.post('/', (req, res) => {
    const { passPhrase } = req.body

    if (!PASS_PHRASE) {
        return res.status(500).end()
    }

    if (passPhrase !== PASS_PHRASE) {
        return res.status(401).end()
    }

    res.json({ token: generateToken() })
})

module.exports = router
