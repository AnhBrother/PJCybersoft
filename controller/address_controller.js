const express = require('express')
const { db } = require('../config/utils')

const get_Addr = async (req, res) => {

}

const add_Addr = async (req, res) => {
    const nameAddr = req.body
    const data = await db.address.createMany({
        data:{
            country: nameAddr.country,
            user_detail_ID: nameAddr.user_detail_ID
        }
    })
    if (data != null) {
        res.status(200).send("Add data successs")
    }else{
        res.status(201).send("Add data fault")
    }
}

const upd_Addr = async (req, res) => {
    
}

const del_Addr = async (req, res) => {
    
}

module.exports = {
    get_Addr,
    add_Addr,
    upd_Addr,
    del_Addr
}