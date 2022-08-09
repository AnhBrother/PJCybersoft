const { db } = require('../config/utils')
const { decodeToken } = require('../helper/jwt.help')

const get_user = async (req, res) => {
    try {
        const {username, pass_word} = req.body

        if (username == undefined || pass_word == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const data = await db.users.findUnique({
                where:{
                    username: req.body.username
                }
            })
            const data_user_detail = await db.user_detail.findUnique({
                where:{
                    user_ID: data.id
                },
                select:{
                    email: true,
                    name: true,
                    phone: true
                }
            })

            if (null == data_user_detail) {
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            } else {
                res.status(200).send({message: 'success', status_code: 200, success: true, data: data_user_detail})
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const update_user = async (req, res) => {   
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        const {email, name, phone, pin_code} = req.body

        if (email == undefined || name == undefined || phone == undefined || pin_code == undefined) {
            res.status(400).send("Key wrong")
        }else{           
            const upd_user_detail = await db.user_detail.update({
                where:{
                    user_ID: decode.data.id
                },
                data:{
                    email,
                    name,
                    phone,
                    pin_code
                },
                select:{
                    email: true,
                    name: true,
                    phone: true,
                    pin_code: true
                }
            })
            
            if (null == upd_user_detail) {
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            } else {
                res.status(200).send({message: 'success', status_code: 200, success: true, data: upd_user_detail})
            }
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const delete_user = async (req, res) => {
    try {    
        const token = req.headers.authorization
        const decode = decodeToken(token)
        
        await db.user_detail.delete({
            where:{
                user_ID: decode.data.id
            }
        })

        const data = await db.users.delete({
            where:{
                id: decode.data.id
            }
        })
        
        if (data == null) {
            res.status(202).send({message: 'fail', status_code: 202, success: false})
        } else {
            res.status(200).send({message: 'success', status_code: 200, success: true})   
        }           
    } catch (error) {
        res.status(500).send(error)
    }     
}

module.exports = {
    get_user,
    update_user,
    delete_user
}