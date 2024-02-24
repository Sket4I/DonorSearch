import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import { db } from './models/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import hbs from 'hbs'
import cookieParser from 'cookie-parser'
import * as userRouter from './routes/users.js'
import * as petRouter from './routes/pets.js'
import * as settingsRouter from './routes/settings.js'
import * as requestsRouter from './routes/requests.js'
import { requestsForFirstPage } from './controllers/requests.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const port = process.env.PORT

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, 'views'))
hbs.registerPartials(path.resolve(__dirname, './views/partials'))
app.use(express.static(path.resolve(__dirname, './public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

app.get('/', async (req, res) => {
    const requests = await requestsForFirstPage(req, res)
    if (req.cookies.token) {
        res.render('index', {user: req.cookies.user, loggedin: true, requests})
    } else {
        res.render('index', {user: {}, loggedin: false, requests})
    }
})

app.use('/user', userRouter.router)
app.use('/pets', petRouter.router)
app.use('/settings', settingsRouter.router)
app.use('/requests', requestsRouter.router)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

export { app }