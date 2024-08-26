import mongoose from "mongoose";
const { Schema } = mongoose

const userModel = new Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    age: Number,
    weight: Number,
})

export default mongoose.model("User", userModel)