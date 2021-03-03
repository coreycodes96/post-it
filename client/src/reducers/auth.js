const authReducer = (state = {authData: null}, action) => {
    switch(action.type){
        case 'SIGNUP':
            if(action.payload.data.status === 'success'){
                return state.authData = action?.payload;
            }
        break;
        case 'SIGNIN':
            if(action.payload.data.status === 'success'){
                localStorage.setItem('profile', JSON.stringify({...action?.payload.data}));
                return state.authData = action?.payload.data;
            }
        break;
        case 'LOGOUT': 
            localStorage.clear();
            return state.authData = {result: 'logged out'};
        case 'PRACTICE':
            return state;
        default:
            return state;
    }
}
export default authReducer;