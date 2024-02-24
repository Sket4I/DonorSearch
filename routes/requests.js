import express from "express"

const router = express.Router()

router.get('/filter', (req, res) => {
    res.render('filter', {user: req.cookies.user, loggedin: true})
})

router.get('/registerPet', (req, res) => {
    res.render('registerPet', {user: req.cookies.user, loggedin: true})
})

router.get('/registerHuman', (req, res) => {
    res.render('registerHuman', {user: req.cookies.user, loggedin: true})
})

router.get('/moderation', (req, res) => {
    res.render('moderation', {user: req.cookies.user, loggedin: true})
})

export { router }