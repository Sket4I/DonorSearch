import express from "express"
import { signup, loginUser, updateUser, findUser } from '../controllers/users.js'
import * as userAuth from '../middleware/userAuth.js'
import { reqAuthentication, notReqAuthentication } from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/login', loginUser)

router.get('/login', notReqAuthentication, (req, res) => {
    res.render('login')
})

router.post('/update', updateUser)

router.get('/profile', (req, res) => {
    res.render('account', {user: req.cookies.user, loggedin: true})
})

router.get('/logout', (req, res) => {
    res.clearCookie('user')
    res.clearCookie('token')
    res.redirect('/')
})

export { router }