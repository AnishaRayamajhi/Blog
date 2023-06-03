import express from "express";
import { userSignUp, userLogin } from "../controller/UserController.js";
import { validationForm } from "../middlewares/FormValidation.js";

const router= express.Router();

//Route SignUp
router.post('/signUp', validationForm, userSignUp);

//Route Login
router.post('/logIn', userLogin);

export default router;