import express from "express"
import mongoose from "mongoose"
import Recipe from "../Model/Recipe.js"

export const getAllRecipes = async (req, res) => {
    const test ="háló"   
    res.send(test)
}