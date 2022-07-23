const { db } = require("../config/utils")

const get_Cate = async (req, res) => {
    try {
        const name_cate = req.params.namecate
        const data = await db.category.findFirst({
            where:{
                name: name_cate
            }
        })

        if (null == data) {
            res.status(400).send('Category not found or not update')
        } else {
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(500).send("Key or Category wrong")
    }
}

const add_Cate = async (req, res) => {
    try {
        const newCate = req.body.name
        
        const cate_exist = await db.category.findFirst({
            where:{
                name: newCate
            },
            select:{
                name: true
            }
        })
        
        if (cate_exist) {
            res.status(400).send("Category exist")
        } else {
            const data = await db.category.create({
                data:{
                    name: newCate
                }
            })
            if (null == data) {
                res.status(201).send('Add Category fault')
            } else {
                res.status(200).send('Add Category success')
            }
        }
    } catch (error) {
        res.status(400).send("Key fault")
    }
}

const update_Cate = async (req, res) => {
    try {
        const nameCate = req.body

        const data = await db.category.updateMany({
            where:{
                name: nameCate.old_name,
            },
            data:{
                name: nameCate.new_name
            }
        })

        if (data.count != 0) {
            res.status(200).send('Update Category success')
        }else{
            res.status(201).send('Data not exist')
        }          
    } catch (error) {
        res.status(500).send("Key fault or Cate not exist")
    }
}

const delete_Cate = async (req, res) => {
    try {
        const nameCate = req.body.name
        
        const data = await db.category.deleteMany({
            where: {
              name: nameCate,
            }
        })
        
        if (data.count != 0) {
            res.status(200).send('Delete Category success')
        }else{
            res.status(201).send('Data not exist')
        }
    } catch (error) {
        res.status(400).send("Key fault or Category not exist")
    }
}

module.exports = {
    get_Cate,
    add_Cate,
    update_Cate,
    delete_Cate
}

