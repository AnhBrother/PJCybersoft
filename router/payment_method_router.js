const express = require('express')
const { checkRoleUser } = require('../controller/auth_controller')
const { addPaymentMethod, getPaymentMethod, updPaymentMethod, delPaymentMethod } = require('../controller/payment_method_controller')
const payment_method_Router = express.Router()

payment_method_Router.get('/getPaymentMethod', checkRoleUser(1), getPaymentMethod)
payment_method_Router.post('/addPaymentMethod', checkRoleUser(2), addPaymentMethod)
payment_method_Router.put('/updPaymentMethod', checkRoleUser(2), updPaymentMethod)
payment_method_Router.delete('/delPaymentMethod', checkRoleUser(2), delPaymentMethod)

module.exports = {
    payment_method_Router
}