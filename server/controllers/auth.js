import User from '../models/user.js';
import {signUpValidation, signInValidation} from './validation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp =  async (req, res) => {
    const {username, email, password} = req.body;
    try {
        //validation has failed
        if(signUpValidation(req.body)) return res.status(401).json({'status': 'error', 'error': signUpValidation(req.body)});

        //check if the email already exists
        const emailExists = await User.findOne({email});

        //Email already exists
        if(emailExists) return res.status(409).json({'status': 'databaseError', 'message': 'Sorry this email has already been taken'});
        
        //check if the username already exists
        const usernameExists = await User.findOne({username});

        //Username already exists
        if(usernameExists) return res.status(409).json({'status': 'databaseError', 'message': 'Sorry this username has already been taken'});

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Create a new user
        const newUser = await User.create({email, password: hashedPassword, username});

        //returning the newUser (optional)
        res.status(201).json({'status': 'success', 'message': newUser});
    }catch (error){
        console.log(error); 
    }
}

export const signIn =  async (req, res) => {
    const {email, password} = req.body;
    try{
        //validation has failed
        if(signInValidation(req.body)) return res.status(401).json({'status': 'error', 'error': signInValidation(req.body)});

        //Checking if the user exists
        const existingUser = await User.findOne({email});

        //If the user does not exist
        if(!existingUser) return res.status(404).json({'status': 'databaseError', 'message': 'Sorry your email does not exist'});

        //Checking if the password matches
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        //If the password does not match
        if(!isPasswordCorrect) return res.status(401).json({'status': 'databaseError', 'message': 'Your password does not match our database'});
        

        //Creating a token for the user (Change secret and place it inside a .env file) | 1h = 1 hour
        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
    
        res.json({'status': 'success', 'result': existingUser, token});
    }catch (error){
        console.log(error);
    }
}