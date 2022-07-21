const express = require("express")
const { signin, signup, checkAuthen } = require("../controller/auth_controller")
const auth_router = express.Router()

auth_router.post('/signup', signup)
auth_router.post('/signin', signin)

module.exports = {
    auth_router
}