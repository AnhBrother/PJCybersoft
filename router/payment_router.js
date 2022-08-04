const express =  require('express')
const { checkRoleUser } = require('../controller/auth_controller')
const { getPayment, addPayment, updPayment, delPayment } = require('../controller/payment_controller')
const payment_router = express.Router()

payment_router.get('/getpayment', checkRoleUser(1), getPayment)
payment_router.post('/addPayment', checkRoleUser(1), addPayment)
payment_router.put('/updPayment', checkRoleUser(1), updPayment)
payment_router.delete('/delPayment', checkRoleUser(1), delPayment)

module.exports = {
    payment_router
}