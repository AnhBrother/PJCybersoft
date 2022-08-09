const express = require('express')
const { checkRoleUser } = require('../controller/auth_controller')
const { get_review, add_review, upd_review, del_review } = require('../controller/review_controller')
const review_router = express.Router()

review_router.get('/:nameProd', checkRoleUser(1), get_review)
review_router.post('/addReview', checkRoleUser(1), add_review)
review_router.put('/updReview', checkRoleUser(1), upd_review)
review_router.delete('/delReview', checkRoleUser(1), del_review)

module.exports = {
    review_router
}