const { db } = require("../config/utils");


const getPaymentMethod = async (req, res) => {
    try {
        const get_data = await db.payment_method.findMany({
            select:{
                name: true
            }
        })
        if (get_data != null) {
            res.status(200).send({message: 'success', status_code: 200, success: true, data: get_data})
        } else {
            res.status(202).send({message: 'fail', status_code: 202, success: false})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPaymentMethod = async (req, res) => {
    try {
        const name = req.body.name
        if (name == undefined) {
            res.status(500).send("Key wrong")
        }else{
            const paymentMethod_exist = await db.payment_method.findUnique({
                where: {
                    name: name,
                },
                select:{
                    name: true,
                }
            })
    
            if (paymentMethod_exist != null) {
                res.status(400).send({message: 'Payment Method existed'})
            }else{
                const data = await db.payment_method.create({
                    data: {
                        name: name
                    }
                })
                if (data != null) {
                    res.status(201).send({message: 'success', status_code: 201, success: true, data: data})
                }else{
                    res.status(202).send({message: 'fail', status_code: 202, success: false})
                }
            }
        }                    
    } catch (error) {
        res.status(500).send(error)
    }
}

const updPaymentMethod = async (req, res) => {
    try {
        const name = req.body

        if (name.old_name == undefined || name.new_name == undefined) {
            res.status(400).send("Key wrong")
        } else {
            const data =  await db.payment_method.update({
                where:{
                    name: name.old_name
                },
                data:{
                    name: name.new_name
                }
            })

            if (data.count != 0) {
                res.status(200).send({message: 'success', status_code: 200, success: true})
            }else{
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            }
        }
    } catch (error) {
        res.status(500).send(error)
    } 
}

const delPaymentMethod = async (req, res) => {
    try {
        const name = req.body.name
        if (name == undefined) {
            res.status(400).send("Key wrong")
        }
        const data = await db.payment_method.delete({
            where: {
              name: name,
            }
        })
        
        if (data.count != 0) {
            res.status(200).send({message: 'success', status_code: 200, success: true})
        }else{
            res.status(202).send({message: 'fail', status_code: 202, success: false})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getPaymentMethod,
    addPaymentMethod,
    updPaymentMethod,
    delPaymentMethod
}