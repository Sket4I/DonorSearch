import { db } from '../models/index.js'

const Requests = db.donationRequests

export async function getPetData(req, res) {
    try {
        const pet = req.body
        res.render('registerHuman', {user: req.cookies.user, loggedin: true, pet: JSON.stringify(pet)})
    } catch (error) {
        console.error(error)
    }
}


export async function registerRequest(req, res) {
    try {
        const pet = JSON.parse(req.body.pet)

        const data = { fullName: req.body.fullName, contact: req.body.login, ...pet }

        const request = await Requests.create(data)
        if (request) {
            console.log("Request " + request.id + " was registered.")
            res.redirect('/requests/moderation')
        } else {
            return res.status(409).send("Details are not correct")
        }
    } catch (error) {
        console.error(error)
    }
}