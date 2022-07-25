const { db } = require("../config/utils")

const get_brand = async (req, res) => {
    try {
        const data = req.params.namebrand
        if (data == null) {
            res.status(400).send("Key wrong")
        }else {
            const get_data = await db.brand.findUnique({
                where:{
                    name: data
                }
            })
            if (get_data != null) {
                res.status(200).send(get_data)
            } else {
                res.status(201).send("Brand not exist")
            }
        }
    } catch (error) {
        res.status(500).send("Server fault")
    }
}

const add_brand = async (req, res) => { 
    try {
        const name = req.body.name
        if (name == undefined) {
            res.status(500).send("Key wrong")
        }else{
            const brand_exist = await db.brand.findUnique({
                where: {
                    name: name,
                },
                select:{
                    name: true,
                }
            })
    
            if (brand_exist != null) {
                res.status(400).send("Brand existed")
            }else{
                const data = await db.brand.create({
                    data: {
                        name: name
                    }
                })
                if (data != null) {
                    res.status(200).send("Add sucess")
                }else{
                    res.status(201).send("Add error")
                }
            }
        }                    
    } catch (error) {        
        res.status(500).send(error)
    }   
}

const upd_brand = async (req, res) => {
    try {
        const namebrand = req.body
        if (namebrand.old_name == undefined || namebrand.new_name == undefined) {
            res.status(400).send("Key wrong")
        } else {
            const data =  await db.brand.updateMany({
                where:{
                    name: namebrand.old_name
                },
                data:{
                    name: namebrand.new_name
                }
            })
            
            if (data.count != 0) {
                res.status(200).send('Update Brand success')
            }else{
                res.status(201).send('Data not exist')
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }   
}

const del_brand = async (req, res) => {
    try {
        const namebrand = req.body.name
        if (namebrand == undefined) {
            res.status(400).send("Key wrong")
        }
        const data = await db.brand.deleteMany({
            where: {
              name: namebrand,
            }
        })
        
        if (data.count != 0) {
            res.status(200).send('Delete brand success')
        }else{
            res.status(201).send('Data not exist')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    get_brand,
    add_brand,
    upd_brand,
    del_brand
}