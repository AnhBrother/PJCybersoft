const express = require('express')
const { checkAuthen } = require('../controller/auth_controller')
const { addr_router } = require('./address_router')
const { auth_router } = require('./auth_router')
const { brand_router } = require('./brand_router')
const { cate_router } = require('./category_router')
const { payment_method_Router } = require('./payment_method_router')
const { payment_router } = require('./payment_router')
const { product_router } = require('./product_router')
const { review_router } = require('./review_router')
const { user_router } = require('./user_router')
const rootRouter = express.Router()

rootRouter.use('/auth', auth_router) 
rootRouter.use('/user', checkAuthen, user_router) 
rootRouter.use('/product', checkAuthen, product_router)
rootRouter.use('/category', checkAuthen, cate_router) 
rootRouter.use('/brand', checkAuthen, brand_router) 
rootRouter.use('/addr', checkAuthen, addr_router)
rootRouter.use('/review', checkAuthen, review_router)
rootRouter.use('/payment_method', checkAuthen, payment_method_Router)
rootRouter.use('/payment', checkAuthen, payment_router)

module.exports = {
    rootRouter
}