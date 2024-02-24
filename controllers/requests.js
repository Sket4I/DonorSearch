import { db } from '../models/index.js'
import { dbQuery } from '../middleware/db.js'
import dateformat from 'dateformat'

const Requests = db.donationRequests

export async function getPetData(req, res) {
    try {
        const pet = req.body
        res.render('registerHuman', { user: req.cookies.user, loggedin: true, pet: JSON.stringify(pet) })
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
        const requests = await dbQuery(`select * from "donationRequests" order by "dateEndOfSearch"`)

        let citys = []
        let bloodGroups = []
        for (const request of requests) {
            const date = new Date(request.dateEndOfSearch)
            request.dateEndOfSearch = dateformat(date, 'dd.mm.yy HH:MM')
            citys.push({ name: request.city })
            bloodGroups.push({ name: request.bloodGroup })
        }

        const tmp = [...new Set(citys.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s))
        const tmp2 = [...new Set(bloodGroups.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s))
        return { requests, citys: tmp, bloodGroups: tmp2 }
    } catch (error) {
        console.error(error)
    }
}

export async function filter(req, res) {
    try {
        const filters = req.body

        let keys = []
        for (const [key, value] of Object.entries(filters)) {
            if (!value) delete filters[key]
            else keys.push({ key, value })
        }

        let where = ``
        if (keys.length > 0) where += ` where `
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i]
            where += `"${element.key}" = '${element.value}' `
            if (keys[i + 1]) where += `and `
        }

        const requests = await dbQuery(`select * from "donationRequests"${where}order by "dateEndOfSearch"`)

        return requests
    } catch (error) {
        console.error(error)
    }
}