import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import LogoText from '../../../images/logo-text.svg';
import * as CONSTANTS from '../../../constants';
import { Message } from '../../../components/message';

import { signInWithGoogle } from '../../../firebase';
import { auth } from '../../../firebase';
import { generateUserDocument } from '../../../firebase';

//  Redux Actions
import * as AuthActions from '../../../store/actions/auth';

import './login.scss';
  

const Login = () => {
    const userAuth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(false);
    // const [ user, setUser ] = useState();

    const processLogin = useCallback(async (user) => {
        console.log(user);
        try {
            await dispatch(AuthActions.login(user));
            Message('success', 'Login successful', 5);
            // setLoader(false);
        }catch (error){
            console.log(error.response)
            let callError = CONSTANTS.ERRORDESC;

            if(error.response.data && error.response.data.error){
                callError = error.response.data.error;
            }
            Message('error', callError, 5);
            setLoader(false);
        }
    }, [setLoader]);

    // console.log(user)

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            // setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    };

    useEffect(() => {
        // console.log('got here');
        auth.onAuthStateChanged(async userAuth => {
            console.log(userAuth)
            const user = await generateUserDocument(userAuth);
            console.log(user)
            // setUser(user)
            processLogin(user)
          
        });
    }, [])

    if(userAuth && userAuth.loggedIn){
        console.log(auth)
        return <Redirect to="/" />
    }

    // auth.signOut()

    return (
        <div className="auth">
            <div className="devugo-card">
                <div className="logo">
                    <img src={LogoText} alt="logo-text" />
                </div>
                <p className="mt-3 mb-2"><strong>Sign in to continue!</strong></p>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Please, specify a valid email address';
                        }
                        if(!values.password){
                            errors.password = 'Password is required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        // setLoader(true);
                        
                        processLogin(values);
                    
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <TextField onChange={handleChange} value={values.email} id="email" name="email" label="Email" variant="outlined" fullWidth error={errors.email && touched.email && true} />
                                <small className="text-danger">{errors.email && touched.email && errors.email}</small>
                            </div>
                            <div className="mb-4">
                                <TextField onChange={handleChange} value={values.password} id="password" type="password" name="password" label="Password" variant="outlined" fullWidth error={errors.password && touched.password && true} /> 
                                <small className="text-danger">{errors.password && touched.password && errors.password}</small>
                            </div>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Sign in
                            </Button>
                            
                            <div className="text-center mt-3">
                                <p>OR</p>
                            </div>

                            <Button
                                color="primary"
                                variant="contained"
                                style={{background: '#dc3545'}}
                                onClick={signInWithGoogle}
                            >
                                Sign In With Google
                            </Button>

                            <div className="text-center mt-3">
                                <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
                                <p> <Link to="/password-reset">Forgot password?</Link></p>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;