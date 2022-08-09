const { db } = require("../config/utils")

const get_All_cate = async (req, res) => {
    try {
        const get_All_data = await db.category.findMany({
            select:{
                name: true
            }
        })
        if (get_All_data != null || get_All_data == []) {
            res.status(200).send({message: 'success', status_code: 200, success: true, data: get_All_data})
        } else {            
            res.status(202).send({message: 'No data exist'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const get_Cate = async (req, res) => {
    try {
        const name_cate = req.params.namecate
        const data = await db.category.findUnique({
            where:{
                name: name_cate
            }
        })
    
        if (null == data) {
            res.status(202).send({message: 'fail', status_code: 202, success: false})
        } else {
            res.status(200).send({message: 'success', status_code: 200, success: true, data: data})
        }
    } catch (error) {
        res.status(500).send(error)
    }    
}

const add_Cate = async (req, res) => {
    try {
        const newCate = req.body.name

        if (newCate ==  undefined) {
            res.status(400).send("Key wrong")
        }else{
            const cate_exist = await db.category.findUnique({
                where:{
                    name: newCate
                },
                select:{
                    name: true
                }
            })
            
            if (cate_exist) {
                res.status(400).send({message: 'Category exist'})
            } else {
                const data = await db.category.create({
                    data:{
                        name: newCate
                    }
                })
                if (null == data) {
                    res.status(202).send({message: 'fail', status_code: 202, success: false})
                } else {
                    res.status(201).send({message: 'success', status_code: 201, success: true, data: data})
                }
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }           
}

const update_Cate = async (req, res) => {
    try {
        const {old_name,new_name}  = req.body
        
        if (old_name == undefined || new_name == undefined) {
            console.log(old_name)
            res.status(400).send("Key wrong")
        } else {            
            const data = await db.category.update({
                where:{
                    name: old_name,
                },
                data:{
                    name: new_name
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

const delete_Cate = async (req, res) => {
    try {
        const nameCate = req.body.name

        if (nameCate == undefined) {
            res.status(400).send("Key wrong")
        } else {
            const data = await db.category.delete({
                where: {
                  name: nameCate,
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

module.exports = {
    get_All_cate,
    get_Cate,
    add_Cate,
    update_Cate,
    delete_Cate
}

