const express = require("express")
const { checkRoleUser } = require("../controller/auth_controller")
const { get_user, update_user, delete_user } = require("../controller/user_controller")
const user_router = express.Router()

user_router.post('/get_user', checkRoleUser([1]), get_user)
user_router.put('/update_user', checkRoleUser([1]), update_user)
user_router.delete('/delete_user', checkRoleUser([1]), delete_user)

module.exports = {
    user_router
}