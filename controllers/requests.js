import { db } from '../models/index.js'
import { dbQuery } from '../middleware/db.js'
import dateformat from 'dateformat'

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

export async function requestsForFirstPage(req, res) {
    try {
        const requests = await dbQuery(`select * from "donationRequests" order by "dateEndOfSearch" limit 3`)

        for (const request of requests) {
            const date = new Date(request.dateEndOfSearch)
            request.dateEndOfSearch = dateformat(date, 'dd.mm.yy HH:MM')
        }

        return requests
    } catch (error) {
        console.error(error)
    }
}

export async function getAllRequests(req, res) {
    try {
        const requests = await dbQuery(`select * from "donationRequests" order by "dateEndOfSearch" limit 10 offset ` + req.params.id - 1)

        for (const request of requests) {
            const date = new Date(request.dateEndOfSearch)
            request.dateEndOfSearch = dateformat(date, 'dd.mm.yy HH:MM')
        }

        return requests
    } catch (error) {
        console.error(error)
    }
}