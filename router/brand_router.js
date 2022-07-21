const express = require('express')
const { checkRoleUser } = require('../controller/auth_controller')
const { get_brand, add_brand, upd_brand, del_brand } = require('../controller/brand_controller')
const brand_router = express.Router()

brand_router.get('/:namebrand', checkRoleUser(1), get_brand)
brand_router.post('/addBrand', checkRoleUser(2), add_brand)
brand_router.post('/updBrand', checkRoleUser(2), upd_brand)
brand_router.post('/delBrand', checkRoleUser(2), del_brand)

module.exports = {
    brand_router
}