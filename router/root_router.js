const express = require('express')
const { checkAuthen } = require('../controller/auth_controller')
const { addr_router } = require('./address_router')
const { auth_router } = require('./auth_router')
const { brand_router } = require('./brand_router')
const { cate_router } = require('./category_router')
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

module.exports = {
    rootRouter
}
/* 
admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiJDJhJDEyJDVCc1RhUTJqVm81M3cyMUJsVDZybHVPQXFlNnFLVUpIUWFKdWlPdi5jSTlVY2FzREJWL1lDIiwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3Nfd29yZCI6IiQyYSQxMCRlV3lFamhLcldRbmsvYk9Cd25GSEYuRkwuUC9nUXMvLnJVWVpMLzVBcnBLRnNPODY1R2g3YSIsInJvbGUiOjJ9LCJpYXQiOjE2NTg1MDAwOTQsImV4cCI6MTY1ODUyODg5NH0.qcmV80B8RV9OZvll2r2yiO8aZyJiOHzdx6AqWr_Z_LI

basic: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiJDJhJDEyJEoySVdTakhyS2RRRUNmVHVjVUZpd2VGMHA5cEJGTTRCUFdxUUNWWEZybnZJZFlDSFQ5U0phIiwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc193b3JkIjoiJDJhJDEwJEJIeTZKaVp4LlFPam1UMi5sc3JwL3VGeFEzS0NTajVNL1pwbEQyNWNqTS5Kc1YvQXlSUEs2Iiwicm9sZSI6MX0sImlhdCI6MTY1ODUwMDA3NCwiZXhwIjoxNjU4NTI4ODc0fQ.oSAXElIawZzlchfjzE5kGwQHHOYAA8IZXNeQ1wtXtJ4

*/