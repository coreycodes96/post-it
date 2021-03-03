import {useDispatch} from 'react-redux';
import {likePost, deletePost} from '../../../actions/posts';
const Post = ({post, user}) => {
    const dispatch = useDispatch();

    //Like a post
    const likeAPost = (id) => {
        dispatch(likePost(id));
    }

    //Submit component to check if the user has already liked the post or not
    const Likes = () => {
        if(post.likes.find(like => like === user._id)){
            return <i className="fas fa-thumbs-down text-green-500"></i>;
        }else{
            return <i className="fas fa-thumbs-up text-green-500"></i>;
        }
    };

    //Delete a post
    const deleteAPost = (id) => {
        dispatch(deletePost(id));
    }

    return (
        <div className="my-6 mx-auto p-5 w-4/5 bg-blue-700 rounded">
            <h1 className="text-2xl"><b>{post.username}</b></h1>
            <p className="my-5 text-xl">{post.body}</p>
            <button className="mx-2 focus:outline-none text-xl" onClick={() => likeAPost(post._id)}><Likes/></button>
            {post.user_id === user._id && <button className="mx-2 focus:outline-none text-xl" onClick={() => deleteAPost(post._id)}><i className="fas fa-trash-alt text-red-600"></i></button>}
            <p className="mt-5 text-lg">Likes: {post.likes.length}</p>
        </div>
    )
}
export default Post;