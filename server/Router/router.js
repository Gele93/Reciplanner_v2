import express from "express"
import { getAllRecipes, postRecipe, patchRecipe, deleteRecipe, getAllUsers, getUserByName, postUser } from '../Controllers/controllers.js';

const router = express.Router()

router.get("/recipes/:userId", getAllRecipes)
router.post("/recipes/:userId", postRecipe)
router.patch('/recipes', patchRecipe)
router.delete('/recipes/:id', deleteRecipe)

router.get("/users", getAllUsers)
router.get("/users/:username", getUserByName)
router.post("/users", postUser)

export default router