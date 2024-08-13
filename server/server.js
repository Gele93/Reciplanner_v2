import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Recipe from "./Model/Recipe.js"
import router from "./Router/router.js"

const app = express()
app.use(express.json())
dotenv.config()

app.use("/api", router)

const connectServer = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL)

        app.listen(process.env.PORT, () => {
            console.log(`server is listening on: ${process.env.PORT}`)
        })

    } catch (error) {
        console.error(error)
    }
}

connectServer()