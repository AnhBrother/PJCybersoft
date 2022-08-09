const { db } = require("../config/utils");
const { decodeToken } = require("../helper/jwt.help");

const getPayment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)

        const data = await db.payment.findMany({
            where:{
                user_ID: decode.data.id
            }
        })

        if (data ==  null) {
            res.status(202).send({message: 'fail', status_code: 202, success: false})
        } else {
            res.status(200).send({message: 'success', status_code: 200, success: true, data: data})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPayment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        const {name, number, payment_method} = req.body
        
        if (name == undefined || number == undefined || payment_method == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const payment_method_exist = await db.payment_method.findUnique({
                where:{
                    name: payment_method
                },
                select:{
                    id: true
                }
            })
            
            if (payment_method_exist == null) {
                res.status(400).send({message: 'Payment method not exist'})
            } else {
                const payment_exist = await db.payment.findFirst({
                    where:{
                        payment_method_ID: payment_method_exist.id,
                        user_ID: decode.data.id
                    }
                })
                
                if (payment_exist == [] || payment_exist) {
                    res.status(400).send({message: 'Payment existed'})
                } else {
                    
                    const data = await db.payment.create({
                        data:{
                            name,
                            number,
                            payment_method_ID: payment_method_exist.id,
                            user_ID: decode.data.id
                        }
                    })
                    
                    if (data != null) {
                        res.status(201).send({message: 'success', status_code: 201, success: true, data: data})
                    } else {
                        res.status(202).send({message: 'fail', status_code: 202, success: false})
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updPayment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        const {name, number, payment_method} = req.body

        if (name == undefined || number == undefined || payment_method == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const data = await db.payment.updateMany({
                where:{                    
                    payment_method:{
                        name: payment_method
                    },
                    user_ID: decode.data.id
                },
                data:{
                    name,
                    number
                }
            })
            
            if (data == null) {
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            } else {
                res.status(200).send({message: 'success', status_code: 200, success: true})
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const delPayment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        const {payment_method} = req.body

        if (payment_method == undefined) {
            res.status(400).send("Key wrong")
        } else {
            const payment_method_ID = await db.payment_method.findUnique({
                where:{
                    name: payment_method
                }
            })
            
            const data = await db.payment.deleteMany({
                where:{
                    user_ID: decode.data.id,
                    payment_method_ID: payment_method_ID.id
                }
            })
            
            if (data.count == 0) {
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            } else {
                res.status(200).send({message: 'success', status_code: 200, success: true})
            }
        }
    } catch (error) {
        res.status(500).error
    }
}

module.exports = {
    getPayment,
    addPayment,
    updPayment,
    delPayment
}