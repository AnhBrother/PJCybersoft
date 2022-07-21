const { db } = require("../config/utils")
const express = require('express')

const get_brand = async (req, res) => {
    try {
        const data = req.params.namebrand
        const get_data = await db.brand.findFirst({
            where:{
                name: data
            }
        })
        if (get_data != null) {
            res.status(200).send(get_data)
        } else {
            res.status(201).send("Brand not exist")
        }
    } catch (error) {
        res.status(500).send("error")
    }
}

const add_brand = async (req, res) => {
    try {
        const newbrand = req.body.name        
        // const brand_exist = await db.brand.findFirst({
        //     where: {
        //         name: newbrand
        //     }
        // })
        // if (brand_exist != null) {
        //     res.status(400).send("Brand existed")
        // }
        const data = await db.brand.create({
            data: {
                name: newbrand
            }
        })
        if (data != null) {
            res.status(200).send("Create sucess")
        }else{
            res.status(201).send("Create error")
        }
    } catch (error) {        
        res.status(500).send("error")
    }
}

const upd_brand = async (req, res) => {
    try {
        const namebrand = req.body
        const data = await db.brand.updateMany({
            where: {
              name: namebrand.old_name,
            },
            data: {
              name: namebrand.new_name,
            },
          })
        if (data.count != 0) {
            res.status(200).send('Update Brand success')
        }else{
            res.status(400).send('Data not exist')
        }
    } catch (error) {
        res.status(500).send("error")
    }
}

const del_brand = async (req, res) => {
    try {
        const nameBrand = req.body.name
        const data = await db.brand.deleteMany({
            where: {
              name: nameBrand,
            }
        })
        if (data.count != 0) {
            res.status(200).send('Delete Category success')
        }else{
            res.status(400).send('Data not exist')
        }
    } catch (error) {
        res.status(500).send("error")
    }
}

module.exports = {
    get_brand,
    add_brand,
    upd_brand,
    del_brand,
}