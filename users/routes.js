const express = require ("express")
const controller = require("./controller")
const middleware = require("./middleware")
const bodyParser = require("body-parser")

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.post("/", middleware.validate, controller.createUser)



module.exports = userRouter