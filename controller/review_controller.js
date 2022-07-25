const { db } = require("../config/utils");
const { decodeToken } = require("../helper/jwt.help");

const get_review = async (req, res) => {
    try {
        const name = req.params.nameProd

        if (name == null) {
            res.status(400).send("Key wrong")
        }else{
            const data = await db.product.findFirst({
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

const add_review = async (req, res) => {
    try {
        const review = req.body 
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (review.description == null || review.rate == null || review.product == null) {
            res.status(400).send("Key wrong")
        }else {
            const id_rv = await db.review.findFirst({
                where:{
                    user_ID: decode.data.id,
                    product:{
                        name: review.product
                    }
                },
                select:{
                    id: true
                }
            })
    
            if (id_rv != null) {
                res.status(201).send("Review was created")
            } else {
                const find_prod = await db.product.findFirst({
                    where:{
                        name: review.product
                    }
                })
                if (find_prod == null) {
                    res.status(400).send("Product not exist")
                }else{               
                    const data = await db.review.create({
                        data:{
                            description: review.description,
                            rate: review.rate,
                            user_ID: decode.data.id,
                            product_ID: find_prod.id
                        }
                    })

                    if (data) {
                        res.status(200).send("Add success")
                    } else {
                        res.status(201).send("Add fault")
                    }
                }        
            } 
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

const upd_review = async (req, res) => {
    try {
        const review = req.body
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (review.description == null || review.rate == null || review.product == null) {
            res.status(400).send("Key wrong")
        }else{
            const id_rv = await db.review.findFirst({
                where:{
                    user_ID: decode.data.id,
                    product:{
                        name: review.product
                    }
                },
                select:{
                    id: true
                }
            })
    
            if (id_rv == null) {
                res.status(400).send("Review not exist")
            }else{
                const update = await db.review.update({
                    where:{
                        id: id_rv.id
                    },
                    data:{
                        description: review.description,
                        rate: review.rate
                    }
                })
    
                if (update) {
                    res.status(200).send("Update success")
                } else {
                    res.status(201).send("Update fault")
                }
            }
        }    
    } catch (error) {
        res.status(500).send(error)
    }
}

const del_review = async (req, res) => {
    try {
        const review = req.body
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (review.product == null) {
            res.status(400).send("Key wrong")
        }else{        
            const id_rv = await db.review.findFirst({
                where:{
                    user_ID: decode.data.id,
                    product:{
                        name: review.product
                    }
                },
                select:{
                    id: true
                }
            })
            
            if (id_rv = null) {
                res.status(400).send("Review not exist")
            }else{
                const del = await db.review.delete({
                    where:{
                        id: id_rv.id
                    }
                })

                if (del) {
                    res.status(200).send("Delete success")
                } else {
                    res.status(201).send("Delete fault")
                }
            }   
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    get_review,
    add_review,
    upd_review,
    del_review
}