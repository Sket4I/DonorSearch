import express from "express"
import { registerDonor, updatePet, getUserPets } from '../controllers/pets.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, req.cookies.user.id + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.get('/', async (req, res) => {
    const pets = await getUserPets(req, res)
    res.render('pets', { user: req.cookies.user, loggedin: true, pets })
})

router.get('/register', (req, res) => {
    res.render('petRegisterForm', {user: req.cookies.user, loggedin: true})
})

router.post('/register', upload.single('petAvatar'), registerDonor)

router.post('/update', updatePet)

export { router }