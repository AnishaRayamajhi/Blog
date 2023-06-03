import User from '../models/UserModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Route SignUp
export const userSignUp= async(req, res) => {
    const{name, email, password}= req.body;

    try{
        const saltRound=10;
        const salt= await bcrypt.genSalt(saltRound);
        const hashPassword = await bcrypt.hash(password, salt);

        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({msg: "Email already exists"})
        }
        
        const accessToken= jwt.sign({userId: User._id}, process.env.SECRET, {expiresIn:"30d"});
        const userData= await User.create({name, email, hashPassword, accessToken});
        
        res.status(200).json({data: userData, accessToken});
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

//Route Login
export const userLogin= async(req, res) => {
    const{email, password}= req.body;

    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid credentials"})
        }

        //compare the provided password
        const passwordValid= await bcrypt.compare(password, user.hashPassword);
        if(!passwordValid)
        {
            return res.status(400).json({msg: "Invalid credentials"})
        }

        //create and return JWT token
        const accessToken= jwt.sign({ userId: user._id}, process.env.SECRET, {expiresIn: "30d"});
        await User.findByIdAndUpdate(user._id, {accessToken})
        res.status(200).json({
            data: {
                email: user.email,
            },
            accessToken
        })
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
