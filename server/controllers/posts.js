import mongoose from 'mongoose';
import Post from '../models/post.js';
import {postsValidation} from './validation.js';

export const posts = async (req, res) => {
    try{
        //If the user is not logged in
        if(!req.userId) return res.json({'status': 'auth', 'message': 'User is not logged in'});

        //getting all the posts
        const allPosts = await Post.find();

        //returning all the posts
        res.json(allPosts);
    }catch (error){
        console.log(error);
    }
}

export const createPost = async (req, res) => {
    const {body, username, user_id} = req.body;
    try{
        //If the user is not logged in
        if(!req.userId) return res.status(403).json({'status': 'auth', 'message': 'User is not logged in'});

        //create post validation
        if(postsValidation(req.body)) return res.status(409).json({'status': 'error', 'error': postsValidation(req.body)});

        //creating a post
        const newPost = await Post.create({body, username, user_id});

        //returning the new post
        res.status(201).json({'status': 'success', newPost});
    }catch(error){
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    const {id} = req.params;
    try{
        //If the user is not logged in
        if(!req.userId) return res.status(403).json({'status': 'auth', 'error': 'User is not logged in'});

        //If the users ID is not valid
        if(!mongoose.Types.ObjectId.isValid(id)) return res.json({'message': 'ID does not exist'});

        //finding the post with the matching ID
        const post = await Post.findById(id);

        //finding the index of where the user has liked the post
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if(index === -1){
            //if they have not liked the post
            post.likes.push(req.userId);
        }else{
            //if they have liked the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        //updating the updated post
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});

        //returning the updated post
        res.json(updatedPost);
    }catch(error){
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    try{
        //If the user is not logged in
        if(!req.userId) return res.status(403).json({'status': 'auth', 'error': 'User is not logged in'});

        //checking if the ID is valid
        if(!mongoose.Types.ObjectId.isValid(id)) return res.json({'message': 'ID does not exist'});

        //deleting the post
        await Post.findByIdAndRemove(id);

        //return a "post deleted" message
        res.json('post deleted');
    }catch(error){
        console.log(error);
    }
}