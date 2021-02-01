import { Route } from 'react-router-dom';

// AUTH PAGES
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';

// Middlewares
import NotAuth from '../middlewares/NotAuth';

const AuthRoutes = () => {
    return (
        <>
            <NotAuth exact path="/login" component={Login} />
            <NotAuth exact path="/register" component={Register} />
            <NotAuth exact path="/password-reset" component={ForgotPassword} />
        </>
    )
}

export default AuthRoutes;