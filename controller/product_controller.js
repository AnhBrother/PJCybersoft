const { db } = require('../config/utils')

const get_Product = async (req, res) => {
    try {
        const name = req.params.nameProd

        if (name == null) {
            res.status(400).send("Key wrong")
        }else{
            const data = await db.product.findUnique({
                where:{
                    name: name
                },
                select:{
                    name: true,
                    price: true,
                    description: true,
                    offers: true,
                    policy: true
                }
            })
            
            if (data) {
                res.status(200).send(data)
            } else {
                res.status(201).send("Product not exist")
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const create_Prod = async (req, res) => {
    try {
        const {name, price, description, offers, policy, brand, cate} = req.body

        if (name == null || price == null || description == null || offers == null || policy == null || brand == null || cate == null) {
            res.status(400).send("Key wrong")
        }else{
            const brand_exist = await db.brand.findUnique({
                where:{
                    name: brand
                }
            })
            
            if (brand_exist == null) {
                res.status(400).send("Brand not exist")
            }else{
                const cate_exist = await db.category.findUnique({
                    where:{
                        name: cate
                    }
                })
                
                if (cate_exist == null) {
                    res.status(400).send("Cate not exist")
                }else{
                    const prod_exist = await db.product.findUnique({
                        where:{
                            name: name
                        }
                    })

                    if (prod_exist != null) {
                        res.status(400).send("Product existed")
                    } else {
                        const prod = await db.product.createMany({
                            data:{
                                name, 
                                price, 
                                description,
                                offers, 
                                policy,
                                category_ID: cate_exist.id,
                                brand_ID: brand_exist.id
                            },
                            select:{
                                name: true,
                                price: true,
                                description: true,
                                offers: true,
                                policy: true
                            }
                        })

                        if (prod) {
                            res.status(200).send(prod)
                        }else{
                            res.status(201).send('Add fail')
                        }
                    }                
                }  
            }  
        }       
    } catch (error) {
        res.status(500).send(error)
    } 
}

const upd_Product = async (req, res) => {
    try {
        const upd_cate = req.body

        if (upd_cate.name == null || upd_cate.price == null || upd_cate.description == null || upd_cate.offers == null || upd_cate.policy == null || upd_cate.brand == null || upd_cate.cate == null) {
            res.status(400).send("Key wrong")
        }else {
            const brand_exist = await db.brand.findUnique({
                where:{
                    name: upd_cate.brand
                }
            })
            
            if (brand_exist == null) {
                res.status(400).send("Brand not exist")
            }else{
                const cate_exist = await db.category.findUnique({
                    where:{
                        name: upd_cate.cate
                    }
                })
                
                if (cate_exist == null) {
                    res.status(400).send("Cate not exist")
                }else{
                    const data =  await db.product.updateMany({
                        where:{
                            name: upd_cate.name
                        },
                        data:{
                            price: upd_cate.price,
                            description: upd_cate.description,
                            offers: upd_cate.offers,
                            policy: upd_cate.policy,                    
                            category_ID: cate_exist.id,
                            brand_ID: brand_exist.id
                        },
                        select:{
                            name: true,
                            price: true,
                            description: true,
                            offers: true,
                            policy: true,
                        }
                    })
                    
                    if (data.count != 0) {
                        res.status(200).send('Update success')
                    }else{
                        res.status(201).send('Data not exist')
                    } 
                }
            }   
        }        
    } catch (error) {
        res.status(500).send(error)
    }
}

const del_Product = async (req, res) => {
    try {
        const name_prod = req.body.name

        if (name_prod == null) {
            res.status(400).send("Key wrong")
        }else{
            const del_prod = await db.product.deleteMany({
                where: {
                    name: name_prod,
                },
            })
            
            if (del_prod.count != 0) {
                res.status(200).send("Delete success")
            } else {
                res.status(201).send("Value wrong")
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    get_Product,
    create_Prod,
    upd_Product,
    del_Product
}