import express from 'express';
import {posts, createPost, likePost, deletePost} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, posts);
router.post('/', auth, createPost);
router.patch('/likePost/:id', auth, likePost);
router.delete('/deletePost/:id', auth, deletePost);

export default router;