import {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {getPosts} from '../../actions/posts';

import Form from './Form/Form';
import Post from './Post/Post';
const Posts = ({user}) => {
    //get posts
    const posts = useSelector(state => state.postsReducer);

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!localStorage.getItem('profile')){
            history.push('/');
        }

        dispatch(getPosts());
    }, [history, location, dispatch]);

    return (
        <>
            <Form user={user}/>
            {!posts.length 
            ? <div className="flex justify-center items-center flex-col w-full h-500 select-none">
                <h1 className="text-2xl">There are no posts are the moment</h1>
            </div> 
            : posts.map((post, index) => {
                return (
                    <Post key={index} post={post} user={user}/>
                )
            })}
        </>
    )
}

export default Posts;
