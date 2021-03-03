import * as api from '../api';

//Signup action
export const signUp = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.signUp(formData).then(data => {
            resolve(data);
            dispatch({type: 'SIGNUP', payload: data});
        })
        .catch(error => {
            reject(error);
        })
    })
}

//Signin action
export const signIn = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.signIn(formData).then(data => {
            resolve(data);
            dispatch({type: 'SIGNIN', payload: data});
        }).catch(error => {
            reject(error);
        })
    })
}

//Logout action
export const logOut = (history) => (dispatch) => {
    dispatch({type: 'LOGOUT', payload: ''});
    history.push('/');
}