import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createPost} from '../../../actions/posts';

const Form = ({user}) => {
    const [formData, setFormData] = useState({body: '', username: '', user_id: ''});
    const [formErrors, setFormErrors] = useState({error: ''});

    const dispatch = useDispatch();
    const createAPost = (e) => {
        dispatch(createPost({...formData, username: user.username, user_id: user._id})).then(res => {
            //If the api call passes
            if(res.data.status === 'success'){
                setFormData({body: '', username: '', user_id: ''});
                setFormErrors({error: ''});
            }
        })
        .catch(err => {
            if(err.response.data){
                //If the user is not logged in
                if(err.response.data.status === 'auth'){
                    setFormErrors({error: err.response.data.message});
                }

                //If there is a validation error
                if(err.response.data.status === 'error'){
                    setFormErrors({error: err.response.data.error[0].message});
                }

                //If there is a database error
                if(err.response.data.status === 'databaseError'){
                    setFormErrors({error: err.response.data.message});
                }
            }
        })
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={createAPost} className="text-black text-center">
                <div>
                    <textarea type="text" name="body" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})} className="mx-auto pt-1 pl-2 w-4/5 h-64 focus:outline-none border-2 border-blue-700 resize-none"></textarea>
                </div>
                <button type="submit" className="mt-3 mx-10 p-3 bg-gray-800 rounded focus:outline-none text-white">Create A Post</button>
            </form>
            <div className="mt-10 text-red-500 text-xl text-center">
                {formErrors.error !== '' ? formErrors.error : ''}
            </div>
        </div>
    )
}

export default Form;