const express = require('express')
const { db } = require('../config/utils')
const { decodeToken } = require('../helper/jwt.help')

const get_Addr = async (req, res) => {
    const token = req.headers.authorization
    const decode = decodeToken(token)
    console.log(decode)

    const find_addr = await db.address.findUnique({
        where:{
            user_ID: decode.data.id
        },
        select:{
            country: true
        }
    })
    const find_dict = await db.district.findUnique({
        where:{
            address_ID: find_addr.id
        },
        select:{
            name: true
        }
    })
    const find_commu = await db.commune.findUnique({
        where:{
            district_ID: find_dict.id
        },
        select:{
            name: true
        }
    })
    
    const data = [...[], find_addr, find_dict, find_commu]
    if (find_addr != null && find_dict != null && find_commu != null) {
        res.status(200).send(data)
    } else {
        res.status(201).send("No data")
    }
}

const add_Addr = async (req, res) => {
    const addr = req.body
    const token = req.headers.authorization
    const decode = decodeToken(token)

    if (addr.country == null || addr.district == null || addr.commune == null) {
        res.status(400).send("Key wrong")
    }else{
        const find_user = await db.users.findUnique({
            where:{
                id: decode.data.id
            },
            select:{
                id: true
            }
        })
        const add_addr = await db.address.create({
            data:{
                country: addr.country,
                user_ID: find_user.id
            }
        })
        const add_district = await db.district.create({
            data:{
                name: addr.district,
                address_ID: add_addr.id
            }
        })
        const add_commune = await db.commune.create({
            data:{
                name: addr.commune,
                district_ID: add_district.id
            }
        })
        if (add_addr == null ||  add_district == null || add_commune == null) {
            res.status(201).send("Add fault")
        } else {
            res.status(200).send("Add success")
        }
    }
}

const upd_Addr = async (req, res) => {
   res.send("hello") 
}

const del_Addr = async (req, res) => {
    res.send("hello")
}

module.exports = {
    get_Addr,
    add_Addr,
    upd_Addr,
    del_Addr
}