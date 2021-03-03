import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';

const App = () => {
    let user = {};
    const users = useSelector(state => state);
    
    if(localStorage.getItem('profile')){
        user = JSON.parse(localStorage.getItem('profile'));
    }else{
        user = {result: {}};
    }
    
    return (
        <Router>
            {/* Links */}
            <div className="flex justify-around items-center w-100 h-24 select-none">
                <Link to="/" className="mx-5 text-black">Home</Link>
                <Link to="/auth" className="mx-5 text-black">Auth</Link>
                <Navbar key={user.result} user={user.result}/>
            </div>

            {/* Welcome Component */}
            <Route exact path="/" component={Home}></Route>

            {/* Auth Component */}
            <Route exact path="/auth" component={Auth}></Route>

            {/* Post Component */}
            <Route exact path="/posts">
                <Posts key={user.result} user={user.result}/>
            </Route>
        </Router>
    )
}
export default App;