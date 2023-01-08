const functions = require("firebase-functions")
const { initApp } = require("./lib/app")

const app = initApp()

exports.api = functions.https.onRequest(app)
