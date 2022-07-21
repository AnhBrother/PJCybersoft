const express = require('express')
const { checkAuthen } = require('../controller/auth_controller')
const { addr_router } = require('./address_router')
const { auth_router } = require('./auth_router')
const { brand_router } = require('./brand_router')
const { cate_router } = require('./category_router')
const { product_router } = require('./product_router')
const { user_router } = require('./user_router')
const rootRouter = express.Router()

rootRouter.use('/auth', auth_router)
rootRouter.use('/user', checkAuthen, user_router)
rootRouter.use('/product', checkAuthen, product_router)
rootRouter.use('/category', checkAuthen, cate_router)
rootRouter.use('/brand', checkAuthen, brand_router)
rootRouter.use('/addr', checkAuthen, addr_router)

module.exports = {
    rootRouter
}
/* 
admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiJDJhJDEyJGlnc0VsZy43ekFOOGE3UGpsQXFuMWVrWkJlNVNlRldZcHdVNFdlZ29JU0RBaXNidk1wV2Z1IiwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3Nfd29yZCI6IiQyYSQxMCQ4SHNRazZNWE5UMlczZUFSYWQyM2cuV0xOSnFmQzZ3RE9TbVpUbVQ0Z21Wc3Z3bEJjNTZsVyIsInJvbGUiOjJ9LCJpYXQiOjE2NTg0MDgyNTgsImV4cCI6MTY1ODQzNzA1OH0.Zw2HmAnuFS2vZysYD2TZf7oDw1u0uym8o8H54UEAIPI

basic: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiJDJhJDEyJGh2ZFE0dDBQQjhUSE16RHRTVnNtN3VMZS81ZS8vVnlSZlJXaFAzNDVVSVhXaHoxNU8yR0lPIiwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc193b3JkIjoiJDJhJDEwJFU0Rzk2RlZpa0d5Y1BmY0R2eWYxWC5TZGM5YUhmQVpYZVF2eU1nQ2hxeVBJZXJpOXVnaDNlIiwicm9sZSI6MX0sImlhdCI6MTY1ODQwODQzMywiZXhwIjoxNjU4NDM3MjMzfQ.Xy8JhNqmOfc6i_orZtT22VTx3XP5MsGeXy1DgEjLVCM

*/