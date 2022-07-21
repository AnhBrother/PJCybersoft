const { db } = require('../config/utils')

const get_Product = async (req, res) => {
    res.send("hello")
}

const create_Prod = async (req, res) => {
    const {name, price, description, review, rate, offers, policy} = req.body
    console.log(name)
    const prod = await db.product.createMany({
        data:{
            name, 
            price, 
            description, 
            review, 
            rate, 
            offers, 
            policy
        }
    })
    if (prod) {
        res.status(200).send('{message: add success}')
    }else{
        res.status(400).send('{message: add fail}')
    }
}

const upd_Product = async (req, res) => {
    res.send("Hello")
}

const del_Product = async (req, res) => {
    res.send("hello")
}

module.exports = {
    get_Product,
    create_Prod,
    upd_Product,
    del_Product
}