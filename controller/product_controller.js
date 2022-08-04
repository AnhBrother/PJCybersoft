const { db } = require('../config/utils')

const get_All_prod = async (req, res) => {
    try {
        const get_All_data = await db.product.findMany({
            select:{
                name: true
            }
        })
        
        if (get_All_data != null || get_All_data != []) {
            res.status(200).send({message: 'success', status_code: 200, success: true, data: get_All_data})
        } else {
            res.status(202).send({message: 'fault', status_code: 202, success: true, data: 'No data'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const get_Product = async (req, res) => {
    try {
        const name = req.params.nameProd

        if (name == undefined) {
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
                res.status(200).send({message: 'success', status_code: 200, success: true, data: data})
            } else {
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const create_Prod = async (req, res) => {
    try {
        const {name, price, description, offers, policy, brand, cate} = req.body

        if (name == undefined || price == undefined || description == undefined || offers == undefined || policy == undefined || brand == undefined || cate == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const brand_exist = await db.brand.findUnique({
                where:{
                    name: brand
                }
            })

            if (brand_exist == null) {
                res.status(400).send({message: 'Brand not exist'})
            }else{
                const cate_exist = await db.category.findUnique({
                    where:{
                        name: cate
                    }
                })
                
                if (cate_exist == null) {
                    res.status(400).send({message: 'Cate not exist'})
                }else{
                    const prod_exist = await db.product.findUnique({
                        where:{
                            name: name
                        }
                    })

                    if (prod_exist != null) {
                        res.status(400).send({message: 'Product existed'})
                    } else {
                        const prod = await db.product.create({
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
                        
                        if (prod != null) {
                            res.status(201).send({message: 'success', status_code: 201, success: true, data: prod})
                        }else{
                            res.status(202).send({message: 'fail', status_code: 202, success: false})
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

        if (upd_cate.name == undefined || upd_cate.price == undefined || upd_cate.description == undefined || upd_cate.offers == undefined || upd_cate.policy == undefined|| upd_cate.brand == undefined || upd_cate.cate == undefined) {
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
                        res.status(200).send({message: 'success', status_code: 200, success: true})
                    }else{
                        res.status(202).send({message: 'fail', status_code: 202, success: false})
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

        if (name_prod == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const del_prod = await db.product.deleteMany({
                where: {
                    name: name_prod,
                },
            })
            
            if (del_prod.count != 0) {
                res.status(200).send({message: 'success', status_code: 200, success: true})
            } else {
                res.status(202).send({message: 'fail', status_code: 202, success: false})
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    get_All_prod,
    get_Product,
    create_Prod,
    upd_Product,
    del_Product
}