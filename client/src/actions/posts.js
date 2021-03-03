import * as api from '../api';

//fetching posts action
export const getPosts = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.getPosts().then(data => {
            resolve(data);
            dispatch({type: 'FETCH_POSTS', payload: data});
        })
        .catch(error => {
            reject(error);
        })
    })
}

//creating a post action
export const createPost = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.createPost(formData).then(data => {
            resolve(data);
            dispatch({type: 'ADD_POST', payload: data});
        })
        .catch(error => {
            reject(error);
        })
    })
}

//liking a post
export const likePost = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.likePost(id).then(data => {
            resolve(data);
            dispatch({type: 'LIKE_POST', payload: data});
        })
        .catch(error => {
            reject(error);
        })
    })
}

//deleting a post
export const deletePost = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.deletePost(id).then(() => {
            resolve(id);
            dispatch({type: 'DELETE_POST', payload: id});
        })
        .catch(error => {
            reject(error);
        })
    })
}