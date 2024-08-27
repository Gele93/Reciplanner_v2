import express from "express"
import multer from "multer"
import path from "path"
import { getAllRecipes, postRecipe, patchRecipe, deleteRecipe, getAllUsers, postUser, getUserById, uploadFile, patchUser } from '../Controllers/controllers.js';

const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }
}) 


router.get("/recipes/:userId", getAllRecipes)
router.post("/recipes/:userId", postRecipe)
router.patch('/recipes', patchRecipe)
router.delete('/recipes/:id', deleteRecipe)

router.get("/users", getAllUsers)
//router.get("/users/:username", getUserByName)
router.get("/users/:userId", getUserById)
router.post("/users", postUser)
router.patch("/users/:userId", patchUser)

router.post("/upload", upload.single("profilePic"), uploadFile)

export default router