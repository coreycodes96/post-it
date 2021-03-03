import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    likes:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});
const Post = mongoose.model('Post', postSchema);

export default Post;