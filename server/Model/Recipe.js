import mongoose from "mongoose";
const { Schema, model } = mongoose

const recipeSchema = new Schema({
    label: String,
    image: String,
    servings: Number,
    dietLabels: Array,
    healthLabels: Array,
    ingredients: Object,
    calories: Number,
    caloriesPerServing: Number,
    totalTime: Number,
    totalNutrients: Object,
    ingredientLines: Array,
    source: String,
    cuisineType: Array,
    dishType: Array,
    startDate: String,
    mealTypes: Array,
    url: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

export default model("Recipe", recipeSchema)