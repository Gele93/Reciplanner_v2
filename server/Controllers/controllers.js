import express from "express"
import mongoose from "mongoose"
import Recipe from "../Model/Recipe.js"
import User from "../Model/User.js"


const findAllRecipes = async (curUserId) => {
    try {
        const allRecipes = await Recipe.find({ user: curUserId })
        return allRecipes
    } catch (error) {
        console.error(error)
    }
}

export const getAllRecipes = async (req, res) => {
    const curUserId = req.params.userId
    const recipes = await findAllRecipes(curUserId)
    return res.send(recipes)
}

export const postRecipe = async (req, res) => {

    const user = req.params.userId

    const { label, image, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes, url } = req.body;
    const servings = req.body.yield
    let recipe;
    try {
        recipe = await Recipe.create({ label, image, servings, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes, url, user });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error: cannot create recipe', error: error.message });
    }
    return res.status(200).json({ message: 'Recipe created successfully', recipe });
}

export const patchRecipe = async (req, res) => {
    const { _id } = req.body;

    const updates = req.body;
    const { label, image, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes, url } = updates;
    const servings = req.body.yield

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(_id, {
            _id, label, image, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes, servings, url
        }, { new: true }); //{ new: true } miatt az updatelt receptet adja vissza

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        return res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating recipe", error: error.message });
    }
}


export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        return res.status(200).json({ message: "Recipe deleted successfully", recipe: deletedRecipe });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
}


//USERS
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        return res.send(allUsers)

    } catch (error) {
        console.error(error)
    }
}

/*
export const getUserByName = async (req, res) => {
    try {
        const curUsername = req.params.username
        const user = await User.find({ username: curUsername })
        return res.send(user)
        } catch (error) {
            console.error(error)
            }
            }
*/

export const getUserById = async (req, res) => {
    try {
        const curUserId = req.params.userId
        const user = await User.findById({ _id: curUserId })
        return res.send(user)
    } catch (error) {
        console.error(error)
    }
}


export const postUser = async (req, res) => {
    try {
        const user = req.body
        const addedUser = await User.create(user)
        return res.send(addedUser)
    } catch (error) {
        console.error(error)
    }
}

export const patchUser = async (req, res) => {
    try {
        const user = req.body
        const _id  = req.params.userId
        const updatedUser = await User.findByIdAndUpdate(_id, { ...user })
        return res.send(updatedUser)
    } catch (error) {
        console.error(error)
    }
}

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" })
        }
        res.send(req.file.filename)
    } catch (error) {
        console.error(error)
    }
}