import mongoose from "mongoose";

// ! categoryModel
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const CategoryModel = mongoose.model("DesignCategory", CategorySchema)


// !imageModel

const ImageSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DesignCategory"
    },
    slide:{
        type: Number
      
    }
 
})

export const ImageModel = mongoose.model("Image", ImageSchema)  