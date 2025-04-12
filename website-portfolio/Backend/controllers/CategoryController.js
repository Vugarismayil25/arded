import { CategoryModel } from "../models/CategoryImageModel.js";
import { LogModel } from "../models/LogModel.js";



export const CategoryController = {
    createCategory: async (req, res) => {
        try {
            let newCategory = CategoryModel(req.body)
            await newCategory.save()
            const log = new LogModel({
                user: req.user.email,  
                role: req.user.role,   
                action: `Added new category: ${newCategory.name}`, 
                time: new Date().toISOString()  
            });
            await log.save();
            res.status(201).send({
                success: true,
                message: "Category Created Successfully",
                data: newCategory
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Creating Category",
                error
            })

        }
    },
    getCategories: async (req, res) => {
        try {
            let categories = await CategoryModel.find()
             res.status(200).send({
                success: true,
                message: "Categories Fetched Successfully",
                data: categories
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Getting Categories",
                error
            })

        }
    },
    deleteCategory: async (req, res) => {
        try {
            let { id } = req.params
            await CategoryModel.findByIdAndDelete(id)
            const log = new LogModel({
                user: req.user.email, 
                role: req.user.role,   
                action: `Deleted category: ${category.name}`,  
                time: new Date().toISOString() 
            });
            await log.save();
            return res.status(200).send({
                success: true,
                message: "Category Deleted Successfully"
            })
        } catch (error) {

            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Deleting Category",
                error
            })
        }
    }
}