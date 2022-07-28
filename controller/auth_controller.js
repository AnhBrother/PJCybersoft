const bcrypt = require('bcryptjs');
const { db } = require('../config/utils');
const { generateToken, decodeToken } = require('../helper/jwt.help');

const signin = async (req, res) => {
    try {
        const {username, pass_word} = req.body
        if (username == undefined || pass_word == undefined) {
            res.status(400).send("Key wrong")
        }
        const user = await db.users.findFirst({
            where:{
                username: username,
            }
        })
        
        if (user) {
            const isSuccess = bcrypt.compareSync(pass_word, user.pass_word)
            if (isSuccess) {  
                const token = generateToken(user)
                res.status(200).send({message: 'Sign in success', status_code: 200, success: true, access_token: token})
            }else{
                res.status(401).send({message: 'Vui long nhap lai mat khau', status_code: 401, success: false})
            }
        }
        else{
            res.status(401).send({message: 'Vui long nhap lai tai khoan', status_code: 201, success: false})
        }
    } catch (error) {
        res.send(error)
    }
}

const signup = async (req, res) => {
    const {username, pass_word, email, name, phone, pin_code} = req.body

    if (username == undefined || pass_word == undefined || undefined == email || undefined == name || undefined == phone || undefined == pin_code) {
        res.status(400).send("Key wrong")
    }
    try {        
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(pass_word, salt)
        
        const userold = await db.users.findFirst({
            where:{
                username: username,
            },
            select:{
                username: true,
            }
        })
        
        if (userold != null) {
            res.status(201).send("User existed")
        }else{
            const user = await db.users.create({
                data:{
                    username: username,
                    pass_word:hashPassword
                }        
            })
            const user_detail = await db.user_detail.create({
                data:{
                    email,
                    name,
                    phone,
                    pin_code,
                    user_ID: user.id
                }
            })
    
            if (null != user && null != user_detail) {
                res.status(201).send({message: 'success', status_code: 201, success: true})
            }else{
                res.status(500).send({message: 'fail', status_code: 500, success: false})
            }
        }
    } catch (error) {
        res.status(500).send("Key fault")
    }
    
}

const checkAuthen = async (req, res, next) => {    
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        req.user = decode
        const user = await db.users.findUnique({
            where:{
                username: decode.data.username
            }
        })
        if (user) {
            next()
        }
    } catch (error) {
        res.status(401).send({message: 'You need login'})
    }
}

const checkRoleUser = (role) => async (req, res, next) => {
    
    try {
        const token = req.headers.authorization
        const decode = decodeToken(token)
        if (decode.data.role >= role) {
            next()
        }
        else{
            res.status(401).send({message: 'NO PERMISSION'})
        }
    } catch (error) {
        res.status(401).send({message: 'You need login'})
    }
}

module.exports = {
    signin,
    signup,
    checkAuthen,
    checkRoleUser
}