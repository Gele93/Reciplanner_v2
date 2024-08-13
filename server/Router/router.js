import express from "express"
import { getAllRecipes } from '../Controllers/controllers.js';

const router = express.Router()

router.get("/get", getAllRecipes)

export default router