import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signUp, signIn} from '../../actions/auth';
const Auth = () => {
    const [formData, setFormData] = useState({username: '', email: '', password: ''});
    const [formErrors, setFormErrors] = useState({error: ''});
    const [formSuccess, setFormSuccess] = useState({success: ''});
    const [isSignedUp, setIsSignedUp] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('profile')){
            history.push('/posts');
        }
    }, [history]);

    const handleForm = (e) => {
        if(!isSignedUp){
            //delete username from the object
            delete formData.username;
            dispatch(signIn(formData)).then(res => {
                //If the api call passes
                if(res.data.status === 'success'){
                    setFormErrors({error: ''});

                    history.push('/posts');
                }
            })
            .catch(err => {
                if(err.response){
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
        }else{
            dispatch(signUp(formData)).then(res => {
                //If the api call passes
                if(res.data.status === 'success'){
                    setFormErrors({error: ''});
                    setFormData({username: '', email: '', password: ''});
                    setFormSuccess({success: 'Congratulations you have successfully created an account!'});
                }
            })
            .catch(err => {
                if(err.response){
                    //If there is a validation error
                    if(err.response.data.status === 'error'){
                        setFormSuccess({success: ''});
                        setFormErrors({error: err.response.data.error[0].message});
                    }
                    
                    //If there is a database error
                    if(err.response.data.status === 'databaseError'){
                        setFormSuccess({success: ''});
                        setFormErrors({error: err.response.data.message});
                    }
                }
            })
        }
        e.preventDefault();
    }

    const handleAccountToggle = () => {
        setIsSignedUp(v => !v);
        setFormData({username: '', email: '', password: ''});
        setFormErrors({error: ''});
        setFormSuccess({success: ''});
    }

    return (
        <div className="mt-16">
            <form onSubmit={handleForm} className="mx-auto p-3 flex justify-center items-center flex-col bg-blue-700 w-4/5 rounded">
                {isSignedUp &&
                <div className="my-4 mx-auto p-3 w-4/5">
                    <div className="mb-2 text-xl">
                        <label>Username:</label>
                    </div>
                    <div className="text-center">
                        <input type="text" name="username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="pl-2 w-full h-8 focus:outline-none" autoComplete="off"/>
                    </div>
                </div>
                }

                <div className="my-4 mx-auto p-3 w-4/5">
                    <div className="mb-2 text-xl">
                        <label>Email:</label>
                    </div>
                    <div className="text-center">
                        <input type="text" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="pl-2 w-full h-8 focus:outline-none" autoComplete="off"/>
                    </div>
                </div>

                <div className="my-4 mx-auto p-3 w-4/5">
                    <div className="mb-2 text-xl">
                        <label>Password:</label>
                    </div>
                    <div className="text-center">
                        <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="pl-2 w-full h-8 focus:outline-none" autoComplete="off"/>
                    </div>
                </div>

                <div className="mt-3 text-white">
                    <button type="submit" className="mx-10 p-3 bg-gray-800 rounded focus:outline-none">{isSignedUp ? 'Create An Account' : 'Sign In'}</button>
                    <button type="button" onClick={handleAccountToggle} className="mx-10 p-3 bg-gray-800 rounded focus:outline-none">{isSignedUp ? 'Sign In?' : 'Create An Account?'}</button>
                </div>
                <div className="mt-10 text-red-500 text-xl">
                    {formErrors.error !== '' ? formErrors.error : ''}
                    {formSuccess.success !== '' ? formSuccess.success : ''}
                </div>
            </form>
        </div>
    )
}
export default Auth;