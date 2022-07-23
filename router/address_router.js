const express = require('express')
const { get_Addr, add_Addr, upd_Addr, del_Addr } = require('../controller/address_controller')
const { checkRoleUser } = require('../controller/auth_controller')
const addr_router = express.Router()

addr_router.get('/getAddress', checkRoleUser(1), get_Addr)
addr_router.post('/addAddress', checkRoleUser(2), add_Addr)
addr_router.put('/updAddress', checkRoleUser(2), upd_Addr)
addr_router.delete('/delAddress', checkRoleUser(2), del_Addr)

module.exports = {
    addr_router
}