const express = require("express")
const { checkRoleUser, checkAuthen } = require("../controller/auth_controller")
const { get_Cate, add_Cate, update_Cate, delete_Cate } = require("../controller/cate_controller")
const cate_router = express.Router()

cate_router.get('/:namecate', checkRoleUser([1]), get_Cate)
cate_router.post('/addCategory', checkRoleUser([2]), add_Cate)
cate_router.post('/updateCategory', checkRoleUser([2]), update_Cate)
cate_router.post('/delCategory', checkRoleUser([2]), delete_Cate)

module.exports = {
    cate_router
}