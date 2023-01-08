const jwt = require('jsonwebtoken')
const { SECRET } = require('../constants/env_vairables')

function generateToken(minsToLive = 15) {
    return jwt.sign({
        // We can add more params here. So far we only need a token that expires eventually
        exp: Math.floor(new Date().getTime() / 1000) + minsToLive * 60,
    }, SECRET)
}

function hasValidToken(req) {
    try {
        const token = req.headers.authorization
        jwt.verify(token, SECRET)
        return true
    } catch (error) {
        return false
    }
}

function requireAuth(req, res, next) {
    if (!hasValidToken(req)) {
        return res.status(401).end()
    }
    next()
}

module.exports = {
    generateToken,
    hasValidToken,
    requireAuth,
}
