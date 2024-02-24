import { Sequelize, DataTypes } from "sequelize"
import { userModel } from "./users.js"
import { petsModel } from "./pets.js"
import { donationHistoryModel } from "./donorHistory.js"
import { donationsRequestsModel } from "./donationsRequests.js"
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = userModel(sequelize, DataTypes)
db.pets = petsModel(sequelize, DataTypes)
db.donorHistory = donationHistoryModel(sequelize, DataTypes)
db.donationRequests = donationsRequestsModel(sequelize, DataTypes)

export { db }