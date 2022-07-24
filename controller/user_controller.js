const { db } = require('../config/utils')

const get_user = async (req, res) => {
    const {username, pass_word} = req.body
    if (username == undefined || pass_word == undefined) {
        res.status(400).send("Key wrong")
    }
    try {
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
            res.status(201).send('User not found')
        } else {
            res.status(200).send(data_user_detail)
        }
    } catch (error) {
        res.status(500).send("Server fault")
    }
}

const update_user = async (req, res) => {
    const {username, pass_word, email, name, phone, pin_code} = req.body
    if (username == undefined || pass_word == undefined || email == undefined || name == undefined || phone == undefined || pin_code == undefined) {
        res.status(400).send("Key wrong")
    }
   
    try {
        const data = await db.users.findUnique({
            where:{
                username: username
            },
        })
        console.log(data.id)
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
        console.log(upd_user_detail)
        if (null == upd_user_detail) {
            res.status(201).send('User not found')
        } else {
            res.status(200).send(upd_user_detail)
        }
    } catch (error) {
        res.status(500).send("Server fault")
    }
}

const delete_user = async (req, res) => {
    const {username} = req.body 

    if (username == undefined) {
        res.status(500).send("Key wrong")
    } else {
        try {           
            const data = await db.users.findUnique({
                where: {
                    username: username
                }
            })
    
            await db.user_detail.delete({
                where:{
                    user_ID: data.id
                }
            })
    
            await db.users.delete({
                where:{
                    username : username
                }
            })
            
            res.status(200).send("Delete Success")
        } catch (error) {
            res.status(400).send("Server fault")
        }   
    }
}

module.exports = {
    get_user,
    update_user,
    delete_user
}