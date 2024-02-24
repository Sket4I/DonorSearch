import { db } from "../models/index.js"

const User = db.users

export async function saveUser(req, res, next) {
    try {
        const logincheck = await User.findOne({
            where: {
                login: req.body.login,
            },
        })

        if (logincheck) {
            return res.status(401).send({error: "Такой номер уже зарегистрирован"})
        }

        next()
    } catch (error) {
        console.log(error)
    }
}