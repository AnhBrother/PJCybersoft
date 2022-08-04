const { db } = require('../config/utils')

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
        const {username, pass_word, email, name, phone, pin_code} = req.body

        if (username == undefined || pass_word == undefined || email == undefined || name == undefined || phone == undefined || pin_code == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const data = await db.users.findUnique({
                where:{
                    username: username
                },
            })
            
            const upd_user_detail = await db.user_detail.update({
                where:{
                    user_ID: data.id
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
                res.status(200).send({message: 'success', status_code: 200, success: true})
            }
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const delete_user = async (req, res) => {
    try {    
        const {username} = req.body 

        if (username == undefined) {
            res.status(400).send("Key wrong")
        } else {       
            const find_user = await db.users.findUnique({
                where: {
                    username: username
                }
            })
    
            await db.user_detail.delete({
                where:{
                    user_ID: find_user.id
                }
            })
    
            const data = await db.users.delete({
                where:{
                    username: username
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

module.exports = {
    get_user,
    update_user,
    delete_user
}