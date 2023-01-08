const functions = require("firebase-functions")
const { initApp } = require("./lib/app")

const app = initApp()

exports.api = functions.region('europe-west2').https.onRequest(app)
