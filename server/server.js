import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Recipe from "./Model/Recipe.js"
import router from "./Router/router.js"
import { join } from "node:path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const app = express()
app.use(express.json())
dotenv.config()

const serverJsFileUrl = import.meta.url
const __filename = fileURLToPath(serverJsFileUrl)
const __dirname = dirname(__filename)


app.use("/api", router)

app.use("/static", express.static(join(__dirname, "uploads")))

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