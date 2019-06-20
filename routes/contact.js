const express = require('express')
const EmailManager = require('../utils/email')
const router = express.Router()

const confirmation = {
    subject: 'Confirmation from MAI Youth',
    text: 'Thank you for contacting the MAI Youth team.\n\nThis is to confirm we got your query and we\'ll respond to it as soon as possible.\n\nKind regards,\nMAI Youth Team',
}

router.post('/send', (req, res) => {
    const { email, subject, text } = req.body
    const newSubject = `CF: ${subject}`

    // Send email to origin (Our email)
    EmailManager
        .sendText(EmailManager.origin, newSubject, text, email)
        .then(info => {
            console.log('Email sent: ' + info.response)
        })
        .catch(error => console.log(error))
    
    // Send confirmation email to sender (user)
    EmailManager
        .sendText(email, confirmation.subject, confirmation.text)
        .then(info => {
            console.log('Email sent: ' + info.response)
            res.end()
        })
        .catch(error => console.log(error))

    res.status(500)
    res.end()
})

module.exports = router
