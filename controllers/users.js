import bcrypt from 'bcrypt'
import { db } from '../models/index.js'
import jwt from 'jsonwebtoken'

const User = db.users

export async function signup (req, res) {
    try {
        const { fullName, login, password, city } = req.body

        const data = {
            login,
            password: await bcrypt.hash(password, 10),
            fullName,
            city
        }

        const user = await User.create(data)

        if (user) {
            let token = jwt.sign({ 
                id: user.id 
            }, process.env.secretKey, { expiresIn: '1d' })

            console.log("User " + login + " was logged on.")

            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 })
            res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 })
            res.redirect('/')
        } else {
            return res.status(409).send("Details are not correct")
        }
    } catch (error) {
        console.error(error)
    }
}

export async function loginUser(req, res) {
    try {
        const { login, password } = req.body

        const user = await User.findOne({
            where: {
                login: login
            }
        })

        if (user) {
            const isSame = await bcrypt.compare(password, user.password)

            if (isSame) {
                let token = jwt.sign({ 
                    id: user.id 
                }, process.env.secretKey, { expiresIn: '1d' })

                console.log("User " + login + " was logged on.")
                
                res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 })
                res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 })
                res.redirect('/')
            } else {
                return res.status(401).send("Authentication failed")
            }
        } else {
            return res.status(401).send("Authentication failed")
        }
    } catch (error) {
        console.error(error)
        return res.status(401).send("Authentication failed")
    }
}

export async function updateUser(req, res) {
    try {
        const cookieUser = req.cookies.user

        const user = await User.update(
            cookieUser,
            {
                where: {
                    id: cookieUser.id
                }
            }
        )
        res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 })
        res.redirect('/settings/account')
    } catch (error) {
        console.error(error)
    }
}

export async function findUser(req, res) {
    try {
        const cookieUser = req.cookies.user

        const user = await User.findOne({
            where: {
                id: cookieUser
            }
        })

        if (user) {
            res.redirect('/profile', {user: res.cookies.user, loggedin: true})
            
        } else {
            return res.status(401).send("User not found")
        }
    } catch (error) {
        console.error(error)
        return res.status(401).send("User not found")
    }
}