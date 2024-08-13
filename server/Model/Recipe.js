import mongoose from "mongoose";
const { Schema, model } = mongoose

const recipeSchema = new Schema({
    dietLabels: Array,
    healthLabels: Array,
    ingredients: Object,
    calories: Number,
    totalTime: Number,
    totalNutrients: Object,
    startingDate: Date,
    mealType: Array
})

export default model("Recipe", recipeSchema)