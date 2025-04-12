import { ImageModel } from "../models/CategoryImageModel.js";
import { LogModel } from "../models/LogModel.js";


export const ImageController = {
    createImg: async (req, res) => {
        const { section, category, slide } = req.body;

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "No file uploaded",
            });
        }

        try {

            if (section === "service") {
                if (!category || category === "" || !category.match(/^[0-9a-fA-F]{24}$/)) {
                    return res.status(400).send({
                        success: false,
                        message: "Valid category is required for service section",
                    });
                }
            }


            let imageData = {
                section,
                slide,
                image: process.env.VITE_API_URL + req.file.filename,
            };

            if (section === "service") {
                imageData.category = category;
            }

            let newImg = new ImageModel(imageData);
            await newImg.save();
            let newLog = new LogModel({
                user: req.user.email,
                role: req.user.role,
                action: `Added new image to section: ${section}`,
                time: new Date().toISOString()
            });
            await newLog.save();

            res.status(201).send({
                success: true,
                message: "Image Created Successfully",
                data: newImg,
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Creating Image",
                error,
            });
        }
    },

    deleteImg: async (req, res) => {
        try {
            let { id } = req.params
            await ImageModel.findByIdAndDelete(id)
            let newLog = new LogModel({
                user: req.user.email,
                role: req.user.role,
                action: `Deleted image with ID: ${id}`,
                time: new Date().toISOString()
            });
            await newLog.save();

            res.status(200).send({
                success: true,
                message: "Image Deleted Successfully",
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Deleting Image",
                error,
            });
        }
    },
    getImagesBySection: async (req, res) => {

        try {
            const { section } = req.query
            let images = await ImageModel.find({ section }).populate('category')
         
            res.status(200).send({
                success: true,
                message: "Images Fetched Successfully",
                data: images,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Getting Images",
                error,
            });

        }
    },
    getImages: async (req, res) => {

        try {

            let images = await ImageModel.find()
                .populate("category")
            res.status(200).send({
                success: true,
                message: "Images Fetched Successfully",
                data: images,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Getting Images",
                error,
            });

        }
    }

}