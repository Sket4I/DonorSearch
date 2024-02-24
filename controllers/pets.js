import { dbQuery } from '../middleware/db.js'
import { db } from '../models/index.js'

const Pets = db.pets

export async function registerDonor(req, res) {
    try {
        const { petName, petType, breed, age, weight, bloodTransfusion, bloodGroup, vaccinations } = req.body

        const data = {
            petName,
            petType,
            breed,
            age,
            weight,
            bloodTransfusion: bloodTransfusion == 'true' ? true : false,
            ownerId: req.cookies.user.id,
            donor: true,
            boodCenter: null,
            numberOfDonations: 0,
            lastDonation: null,
            petAvatar: req.file ? '/uploads/' + req.cookies.user.id + '-' + Date.now() + '-' + req.file.originalname : '/img/pet.png',
            bloodGroup,
            vaccinations
        }

        const pet = await Pets.create(data)

        if (pet) {
            console.log("Pet " + petName + " was registered.")

            res.redirect('/pets')
        } else {
            return res.status(409).send("Details are not correct")
        }
    } catch (error) {
        console.error(error)
    }
}

export async function updatePet(req, res) {
    try {
        const newData = req.body
        console.log(newData)
        newData.petAvatar = req.file ? '/uploads/' + req.cookies.user.id + '-' + Date.now() + '-' + req.file.originalname : '/img/pet.png'

        const pet = await Pets.update(
            newData,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        
        const newPet = {...req.params, ...newData}
        // console.log(newPet)
        if (pet[0] != 0) {
            const pets = await getUserPets(req, res)
            res.render('petAccountSettings', {user: req.cookies.user, loggedin: true, pets, proccesPet: newPet})
            // res.redirect('/settings/petAccount/' + req.params.id)
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getUserPets(req, res) {
    try {
        const user = req.cookies.user

        const pets = await dbQuery(`select * from pets where "ownerId" = ${user.id}`)

        for (const pet of pets) {
            switch (pet.numberOfDonations % 10) {
                case 1:
                    pet.donation = 'донация'
                    break
                case 2:
                case 3:
                case 4:
                    pet.donation = 'донации'
                    break
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 0:
                    pet.donation = 'донаций'
                    break
            }
        }

        pets.sort((a, b) => {
            return a.id - b.id
        })

        return pets
        res.render('pets', { user: req.cookies.user, loggedin: true, pets: pets })
    } catch (error) {
        console.error(error)
    }
}

export async function getPetById(req, res) {
    try {
        const pet = Pets.findOne({
            where: {
                id: req.params.id
            }
        })
        return pet
    } catch (error) {
        console.error(error)
    }
}