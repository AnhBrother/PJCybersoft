const { db } = require('../config/utils')

const get_user = async (req, res) => {
    const find_data = req.body.username
    try {
        const data = await db.users.findFirst({
            where:{
                username: find_data
            }
        })
        const data_user_detail = await db.user_detail.findUnique({
            where:{
                user_ID: data.id
            },
            select:{
                email: true,
                phone: true
            }
        })
        if (null == data_user_detail) {
            res.status(200).send('User not found or not update')
        } else {
            res.status(200).send(data_user_detail)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const update_user = async (req, res) => {
    const inp_data = req.body
   
    try {
        const data = await db.users.findFirst({
            where:{
                username: inp_data.username
            },
        })
        const upd_user_detail = await db.user_detail.update({
            where:{
                user_ID: data.id
            },
            data:{
                email: inp_data.email,
                phone: inp_data.phone,
                pin_code: inp_data.pin_code
            },
            select:{
                email: true,
                phone: true,
                pin_code: true
            }
        })
        console.log(inp_data)
        if (null == upd_user_detail) {
            res.status(201).send('User not found or not update')
        } else {
            res.status(200).send(upd_user_detail)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const delete_user = async (req, res) => {
    const {username} = req.body 

    if (username == null) {
        res.status(500).send({message: 'Vui long nhap lai tai khoan', status_code: 401, success: false})
    } else {
        try {           
            const data = await db.users.findFirst({
                where: {
                    username: username
                }
            })
    
            const index = data.id
    
            await db.user_detail.delete({
                where:{
                    user_ID: index
                }
            })
    
            await db.users.delete({
                where:{
                    username : username
                }
            })
            
            res.status(200).send("Delete Success")
        } catch (error) {
            res.status(500).send({message: 'Vui long nhap lai tai khoan', status_code: 401, success: false})
        }   
    }
}

module.exports = {
    get_user,
    update_user,
    delete_user
}