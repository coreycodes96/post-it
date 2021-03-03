const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload.data;
        case 'ADD_POST':
            if(action.payload.data.status === 'success'){
                return [...posts, action.payload.data.newPost];
            }
        break;
        case 'LIKE_POST':
            return posts.map((post) => post._id === action.payload.data._id ? action.payload.data : post);
        case 'DELETE_POST':
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}
export default postsReducer;