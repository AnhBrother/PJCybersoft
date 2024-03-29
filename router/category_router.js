const express = require("express")
const { checkRoleUser } = require("../controller/auth_controller")
const { get_Cate, add_Cate, update_Cate, delete_Cate, get_All_cate } = require("../controller/cate_controller")
const cate_router = express.Router()

cate_router.get('/getAllcate', checkRoleUser(1), get_All_cate)
cate_router.get('/:namecate', checkRoleUser(1), get_Cate)
cate_router.post('/addCate', checkRoleUser(2), add_Cate)
cate_router.put('/updateCate', checkRoleUser(2), update_Cate)
cate_router.delete('/delCate', checkRoleUser(2), delete_Cate)

module.exports = {
    cate_router
}