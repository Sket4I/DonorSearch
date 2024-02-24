import express from "express"
import { updateUser } from '../controllers/users.js'

const router = express.Router()

router.post('/account', updateUser)

router.get('/account', (req, res) => {
    res.render('accountSettings', {user: req.cookies.user, loggedin: true})
})

// router.post('/petAccount', updatePet)

router.get('/petAccount', (req, res) => {
    res.render('petAccountSettings', {user: req.cookies.user, loggedin: true})
})


export { router }