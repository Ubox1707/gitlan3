import User from "../models/User.js"
import bcrypt from "bcryptjs"


//CREATE
export const createUser = async (req, res, next) => {
    // const newUser = new User(req.body);
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        const saveUser= await newUser.save();
        res.status(201).json(saveUser);
    }catch(err){
        next(err);
    }
}

//UPDATE
export const updateUser = async (req, res, next) => {
    
    try{
        const updateUser= await User.findByIdAndUpdate(req.params.id,
{ $set: req.body},
{ new: true}
        );
        res.status(200).json(updateUser);
    }catch(err){
        next(err);
    }
    
}

//DELETE
export const deleteUser= async (req, res, next) => {
    
    try{
        await User.findByIdAndDelete(
        req.params.id,
        );
        res.status(200).json("User has bees deleted.");
    }catch(err){
        next(err);
    }
    
}

//GET
export const getUser = async (req, res, next) => {
    
    try{
        const user = await User.findById(
            req.params.id,
        );
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

//GET ALL
export const getUsers = async (req, res, next) => {
   
    try{
        const users = await User.find( );
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}