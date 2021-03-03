import axios from 'axios';

const API = axios.create({baseURL: 'http://192.168.1.113:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        return req;
    }else{
        return req;
    }
})

API.interceptors.response.use((response) => {
    if(localStorage.getItem('profile')){
        if(response.config.parse){
            //Add headers here for get request (response.config.params.headers)
        }
        return response;
    }else{
        return response;
    }
})

//Auth
export const signUp = (formData) => API.post(`/user/signup`, formData);
export const signIn = (formData) => API.post(`/user/signin`, formData);

//Posts
export const getPosts = () => API.get(`/posts/`, { parse: true });
export const createPost = (formData) => API.post(`/posts/`, formData);
export const likePost = (id) => API.patch(`/posts/likePost/${id}`);
export const deletePost = (id) => API.delete(`/posts/deletePost/${id}`);