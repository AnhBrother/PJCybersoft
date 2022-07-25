const express = require('express')
const { checkAuthen } = require('../controller/auth_controller')
const { addr_router } = require('./address_router')
const { auth_router } = require('./auth_router')
const { brand_router } = require('./brand_router')
const { cate_router } = require('./category_router')
const { payment_method_Router } = require('./payment_method_router')
const { product_router } = require('./product_router')
const { review_router } = require('./review_router')
const { user_router } = require('./user_router')
const rootRouter = express.Router()

rootRouter.use('/auth', auth_router) // success
rootRouter.use('/user', checkAuthen, user_router) // success
rootRouter.use('/product', checkAuthen, product_router)
rootRouter.use('/category', checkAuthen, cate_router) // success
rootRouter.use('/brand', checkAuthen, brand_router) // success
rootRouter.use('/addr', checkAuthen, addr_router)
rootRouter.use('/review', checkAuthen, review_router)
rootRouter.use('/payment_method', checkAuthen, payment_method_Router)

module.exports = {
    rootRouter
}
/* 
admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc193b3JkIjoiJDJhJDEwJHREMGN6bXQ4YmxGaGI2TXM3SkhJSS5xUS5TQ1ZmNGliN1ZacVBmb0JEQ0lsOTRLSVE3QkMyIiwicm9sZSI6Mn0sImlhdCI6MTY1ODY3NzAzMCwiZXhwIjoxNjU4NzA1ODMwfQ.LP3qGASGKOkfZSdaCOa3-R2Z3G1EH-ynxHDfuOjsgsU

basic: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6InVzZXIiLCJwYXNzX3dvcmQiOiIkMmEkMTAkLnMyVTQ0bVhBUURtWGFsTzgxYkJyLi44amVxeVBqbldwaDlIdW1CNEYxbDhTQ3ppMGROYzIiLCJyb2xlIjoxfSwiaWF0IjoxNjU4Njc3ODQ1LCJleHAiOjE2NTg3MDY2NDV9.rYDDqffABVoUIi8N5shd9sx7Q7oFEHtNODi2exqO90o

*/