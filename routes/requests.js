import express from "express"
import { getPetData, registerRequest } from '../controllers/requests.js'

const router = express.Router()

router.get('/filter', (req, res) => {
    res.render('filter', {user: req.cookies.user, loggedin: req.cookies.user ? true : false})
})

router.get('/registerPet', (req, res) => {
    res.render('registerPet', {user: req.cookies.user, loggedin: req.cookies.user ? true : false})
})

router.post('/registerPet', getPetData)

router.get('/registerHuman', (req, res) => {
    res.render('registerHuman', {user: req.cookies.user, loggedin: req.cookies.user ? true : false})
})

router.post('/moderation', registerRequest)

router.get('/moderation', (req, res) => {
    res.render('moderation', {user: req.cookies.user, loggedin: req.cookies.user ? true : false})
})

export { router }