const express = require("express")
const { checkRoleUser } = require("../controller/auth_controller")
const { get_user, insert_user, update_user, delete_user } = require("../controller/user_controller")
const user_router = express.Router()

user_router.post('/get_user', checkRoleUser([1]), get_user)
user_router.post('/update_user', checkRoleUser([1]), update_user)
user_router.post('/delete_user', checkRoleUser([2]), delete_user)

module.exports = {
    user_router
}