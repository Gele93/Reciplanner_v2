import express from "express"
import mongoose from "mongoose"
import Recipe from "../Model/Recipe.js"


const findAllRecipes = async () => {
    try {
        const allRecipes = await Recipe.find({})
        return allRecipes
    } catch (error) {
        console.error(error)
    }
}

export const getAllRecipes = async (req, res) => {
    const recipes = await findAllRecipes()
    res.send(recipes)
}

export const postRecipe = async (req, res) => {

    const { label, image, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes } = req.body;
    const servings = req.body.yield
    let recipe;
    try {
        recipe = await Recipe.create({ label, image, servings, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error: cannot create recipe', error: error.message });
    }
    return res.status(200).json({ message: 'Recipe created successfully', recipe });
}

export const patchRecipe = async (req, res) => {
    const { _id } = req.body;

    const updates = req.body;
    const { label, image, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes } = updates;
    const servings = req.body.yield



    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(_id, {
            _id, label, image, dietLabels, healthLabels, ingredients, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes, servings
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