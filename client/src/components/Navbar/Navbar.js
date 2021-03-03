import {useEffect, useCallback } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import {logOut} from '../../actions/auth';
const Navbar = ({user}) => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const logTheUserOut = useCallback(() => {
        dispatch(logOut(history));
    }, [history, dispatch])

    useEffect(() => {
        //checking if the token has expired
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logTheUserOut();
        }
    }, [location, history, logTheUserOut, user?.token]);

    return (
        <>
            {user.username && 
            [
                <h1 key="1" className="select-none">Hi {user.username}!</h1>,
                <button  key="2" className="mx-5 text-black" onClick={logTheUserOut}>Logout</button>
            ]
            }
        </>
    )
}
export default Navbar;