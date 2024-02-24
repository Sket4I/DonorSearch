import express from "express"
import { updateUser } from '../controllers/users.js'
import { getUserPets, updatePet, getPetById } from '../controllers/pets.js'
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

router.post('/account', updateUser)

router.get('/account', async (req, res) => {
    const pets = await getUserPets(req, res)
    res.render('accountSettings', {user: req.cookies.user, loggedin: true, pets})
})

router.get('/petAccount/:id', async (req, res) => {
    const proccesPet = await getPetById(req, res)
    const pets = await getUserPets(req, res)
    res.render('petAccountSettings', {user: req.cookies.user, loggedin: true, pets, proccesPet})
})

router.post('/petAccount/:id', upload.single('petAvatar'), updatePet)

export { router }