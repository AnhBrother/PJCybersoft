const { db } = require('../config/utils')
const { decodeToken } = require('../helper/jwt.help')

const get_Addr = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        
        const find_addr = await db.country.findUnique({
            where:{
                user_ID: decode.data.id
            },
            select:{
                id: true,
                name: true
            }
        })
        if (find_addr == null) {
            res.status(400).send("Address not create")
        } else {
            const find_dict = await db.city.findUnique({
                where:{
                    country_ID: find_addr.id
                },
                select:{
                    id: true,
                    name: true
                }
            })
            const find_commu = await db.district.findUnique({
                where:{
                    city_ID: find_dict.id
                },
                select:{
                    id: true,
                    name: true
                }
            })        
            const data = [...[], find_addr.name, find_dict.name, find_commu.name]
            if (find_addr != null && find_dict != null && find_commu != null) {
                
                res.status(200).send(data)
            } else {
                res.status(201).send("No data")
            }  
        }       
    } catch (error) {
        res.status(500).send(error)
    }
}

const add_Addr = async (req, res) => {
    try {
        const addr = req.body
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (addr.country == undefined || addr.city == undefined || addr.district == undefined) {
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
            const user_addr = await db.country.findUnique({
                where:{
                    user_ID: find_user.id
                },
                select:{
                    id: true
                }
            })
            if (user_addr != null) {
                res.status(201).send("Address created")
            } else {
                const add_country = await db.country.create({
                    data:{
                        name: addr.country,
                        user_ID: find_user.id
                    }
                })
                const add_city = await db.city.create({
                    data:{
                        name: addr.city,
                        country_ID: add_country.id
                    }
                })
                const add_district = await db.district.create({
                    data:{
                        name: addr.district,
                        city_ID: add_city.id
                    }
                })
                if (add_country == null ||  add_city == null || add_district == null) {
                    res.status(201).send("Add fault")
                } else {
                    res.status(200).send("Add success")
                }
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
}

const upd_Addr = async (req, res) => {
    try {
        const addr = req.body
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (addr.country == undefined || addr.city == undefined || addr.district == undefined) {
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
            const add_country = await db.country.update({
                where:{
                    user_ID: find_user.id
                },
                data:{
                    name: addr.country
                }
            })
            const add_city = await db.city.update({
                where:{
                    country_ID: add_country.id
                },
                data:{
                    name: addr.city
                }
            })
            const add_district = await db.district.update({
                where:{
                    city_ID: add_city.id
                },
                data:{
                    name: addr.district
                }
            })
            if (add_country == null ||  add_city == null || add_district == null) {
                res.status(201).send("Update fault")
            } else {
                res.status(200).send("Update success")
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
}

const del_Addr = async (req, res) => {
    try {
        const addr = req.body
        const token = req.headers.authorization
        const decode = decodeToken(token)
    
        if (addr.country == undefined || addr.city == undefined || addr.district == undefined) {
            res.status(400).send("Key wrong")
        }else{
            const find_country =await db.country.findUnique({
                where:{
                    user_ID: decode.data.id
                }
            })
            const find_city = await db.city.findUnique({
                where:{
                    country_ID: find_country.id
                }
            })
            const del_dict = await db.district.delete({
                where:{
                    city_ID: find_city.id
                }
            })
            const del_city = await db.city.delete({
                where:{
                    country_ID: find_country.id
                }
            })
            const del_country = await db.country.delete({
                where:{
                    user_ID: decode.data.id
                }
            })

            if (del_dict == null || del_city == null || del_country == null) {
                res.status(201).send("Delete fault")
            } else {
                res.status(200).send("Delete success")
            }
        }        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    get_Addr,
    add_Addr,
    upd_Addr,
    del_Addr
}