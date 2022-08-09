const { db } = require("../config/utils");
const { decodeToken } = require("../helper/jwt.help");

const get_review = async (req, res) => {
    try {
        const name = req.params.nameProd
        const token = req.headers.authorization
        const decode = decodeToken(token)
        
        if (name == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const data = await db.review.findFirst({
                where:{
                    user_ID: decode.data.id,
                    product:{
                        name
                    }
                },
                select:{
                    description: true,
                    rate: true
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

const add_review = async (req, res) => {
    try {
        const review = req.body 
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (review.description == undefined || review.rate == undefined || review.product == undefined) {
            res.status(400).send("Key wrong")
        }else {
            const find_prod = await db.product.findUnique({
                where:{
                    name: review.product
                }
            })
            
            if (find_prod == null) {
                res.status(400).send("Product not exist")
            
            } else {
                const id_rv = await db.review.findFirst({
                    where:{
                        user_ID: decode.data.id,
                        product:{
                            name: review.product
                        }
                    }
                })
                
                if (id_rv != null) {
                    res.status(400).send("Review was created")
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
                        res.status(201).send({message: 'success', status_code: 201, success: true, data: data})
                    } else {
                        res.status(202).send({message: 'fail', status_code: 202, success: false})
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
    
        if (review.description == undefined || review.rate == undefined || review.product == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const find_prod = await db.product.findUnique({
                where:{
                    name: review.product
                },
                select:{
                    id: true
                }
            })
            
            if (find_prod == null) {
                res.status(400).send("Product not exist")
            } else {
                const update = await db.review.updateMany({
                    where:{
                        product_ID: find_prod.id,
                        user_ID: decode.data.id
                    },
                    data:{
                        description: review.description,
                        rate: review.rate
                    }
                })
                
                if (update.count != 0) {
                    res.status(200).send({message: 'success', status_code: 200, success: true})
                } else {
                    res.status(202).send({message: 'fail', status_code: 202, success: false})
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
    
        if (review.product == undefined) {
            res.status(400).send("Key wrong")
        }else{        
            const find_prod = await db.product.findUnique({
                where:{
                    name: review.product
                },
                select:{
                    id: true
                }
            })
            
            if (find_prod == null) {
                res.status(400).send("Product not exist")
            } else {
                const del = await db.review.deleteMany({
                    where:{
                        product_ID: find_prod.id,
                        user_ID: decode.data.id
                    }
                })

                if (del) {
                    res.status(200).send({message: 'success', status_code: 200, success: true})
                } else {
                    res.status(202).send({message: 'fail', status_code: 202, success: false})
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