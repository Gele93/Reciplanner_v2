import express from "express"
import { getAllRecipes, postRecipe, patchRecipe, deleteRecipe } from '../Controllers/controllers.js';

const router = express.Router()

router.get("/recipes", getAllRecipes)
router.post("/recipes", postRecipe)
router.patch('/recipes', patchRecipe)
router.delete('/recipes/:id', deleteRecipe)

export default router