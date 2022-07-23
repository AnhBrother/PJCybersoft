const express = require("express")
const { checkRoleUser } = require("../controller/auth_controller")
const { get_Product, create_Prod, upd_Product, del_Product } = require("../controller/product_controller")
const product_router = express.Router()

product_router.get('/:nameProd', checkRoleUser([1]), get_Product)
product_router.post('/createProduct', checkRoleUser([2]), create_Prod)
product_router.put('/updateProduct', checkRoleUser([2]), upd_Product)
product_router.delete('/delProduct', checkRoleUser([2]), del_Product)

module.exports = {
    product_router
}