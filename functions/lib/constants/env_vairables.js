// Listening port (used locally only)
const PORT        = process.env.PORT

// DB
const DB_HOST     = process.env.DB_HOST
const DB_USER     = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME     = process.env.DB_NAME

// Email (feature not used for now)
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

// Auth
const PASS_PHRASE = process.env.PASS_PHRASE
const SECRET      = process.env.SECRET

module.exports = {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    EMAIL_USER,
    EMAIL_PASS,
    PASS_PHRASE,
    SECRET,
}
