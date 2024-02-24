import { dbQuery } from '../middleware/db.js'
import { db } from '../models/index.js'


const Pets = db.pets

export async function registerDonor(req, res) {
    try {
        const { petName, petType, breed, age, weight, petAvatar } = req.body

        const data = {
            petName,
            petType,
            breed,
            age,
            weight,
            bloodTransfusion: 'true' ? true : false,
            ownerId: req.cookies.user.id,
            donor: true,
            boodCenter: null,
            numberOfDonations: 0,
            lastDonation: null,
            petAvatar: req.file ? req.cookies.user.id + '-' + req.file.originalname : null
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
    // try {
    //     const { userObj, newData } = req.body

    //     const newDataObj = {}
    //     if (newData && newData.fullName) newDataObj.fullName = newData.fullName
    //     if (newData && newData.password) newDataObj.password = await bcrypt.hash(newData.password, 10)

    //     const user = await User.update(
    //         newDataObj,
    //         {
    //             where: {
    //                 id: userObj.id
    //             }
    //         }
    //     )
    //     const newUser = {...userObj, ...newDataObj}
    //     if (user[0] != 0) {
    //         return res.status(200).send(newUser)
    //     }
    // } catch (error) {
    //     console.error(error)
    // }
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

        res.render('pets', { user: req.cookies.user, loggedin: true, pets: pets })
    } catch (error) {
        console.error(error)
    }
}