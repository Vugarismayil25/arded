import { UserModel } from "../models/UserModel.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { LogModel } from "../models/LogModel.js";

export const UserController = {

    //! authentication
    register: async (req, res) => {
        const { name, email, role } = req.body;
        try {
            const userByEmail = await UserModel.findOne({ email })
            if (userByEmail) {
                return res.status(500).send({
                    success: false,
                    message: "Email Already Registered."
                });
            }
            const newUser = UserModel({
                name,
                email,
                role
            })
            await newUser.save();
            return res.status(201).send({
                success: true,
                message: "User Registered Successfully",
                data: newUser
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Registering User",
                error
            })
        }

    },
    login: async (req, res) => {

        try {
            const { email } = req.body
            const loginUser = await UserModel.findOne({ email })
            if (!loginUser) {
                return res.status(500).send({
                    success: false,
                    message: "Invalid Credentials"
                })
            }
            let confirmCode = Math.floor(100000 + Math.random() * 900000);

            loginUser.confirmPassword = confirmCode;
            await loginUser.save();
            let transporter = nodemailer.createTransport({
                direct: true,
                host: process.env.NODEMAILER_HOST,
                port: process.env.NODEMAILER_PORT,
                auth: {
                    user: process.env.NODEMAILER_USER_GMAIL,
                    pass: process.env.NODEMAILER_PASSWORD
                },
                secure: true
            });
            let mailOptions = {
                from: process.env.NODEMAILER_USER_GMAIL,
                to: loginUser.email,
                subject: "Confirm Code",
                text: `Your confirm code is ${confirmCode}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).send({ success: false, message: "Email sending failed", error });
                }

                res.status(200).send({ success: true, message: "Verification email sent", loginUser });
            })

            // Log melumatini saxlamaq
            const log = new LogModel({
                user: loginUser.email,  
                role: loginUser.role,
                action: "User Login",   
                time: new Date().toISOString() 
            });

        
            log.save().then(() => {
                res.status(200).send({ success: true, message: "Verification email sent", loginUser });
            }).catch(err => {
                console.error("Error saving log:", err);
                res.status(500).send({ success: false, message: "Error saving log" });
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Login User",
                error
            })

        }
    },
    verify: async (req, res) => {
        const { confirmPassword } = req.body
        try {
            let user = await UserModel.findOne({ confirmPassword })
            if (!user) {
                return res.status(500).send({
                    success: false,
                    message: "Invalid Credentials"
                })
            }
            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.status(200).send({
                success: true,
                message: "Login Successful",
                token,
                user
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Confirming User",
                error
            })
        }
    },

    //! get all users

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find()
            res.status(200).send({
                success: true,
                message: "Users Fetched Successfully",
                data: users
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Fetching Users",
                error
            })
        }
    },
    deleteUser: async (req, res) => {

        try {
            const { id } = req.params
            await UserModel.findByIdAndDelete(id)
            res.status(200).send({
                success: true,
                message: "User Deleted Successfully"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Deleting User",
                error
            })
        }
    },
}