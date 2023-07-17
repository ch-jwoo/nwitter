// import { HashRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom'
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import { HashRouter, Routes, Route, Navigate  } from "react-router-dom";

const AppRouter = ({isLoggedIn, userObj}) => {
    return(
        <>
            <HashRouter>
                {isLoggedIn && <Navigation />}
                    <Routes>
                        {isLoggedIn ? (
                            <>
                                <Route exact path='/' element={<Home userObj={userObj}/>} />
                                <Route exact path='/profile' element={<Profile />} />
                                <Route path='*' element={<Navigate replace to="/"/>} />
                            </>
                        ) : (
                            <>
                                <Route exact path='/' element={<Auth />} />
                                <Route path='*' element={<Navigate replace to="/"/>} />
                            </>
                        )}
                    </Routes>
            </HashRouter>
        </>
    )
}

export default AppRouter;