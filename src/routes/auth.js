import { Route } from 'react-router-dom';

// AUTH PAGES
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';

const AuthRoutes = () => {
    return (
        <>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/password-reset" component={ForgotPassword} />
        </>
    )
}

export default AuthRoutes;