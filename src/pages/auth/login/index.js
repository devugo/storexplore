import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import LogoText from '../../../images/logo-text.svg';
import * as CONSTANTS from '../../../constants';
import { Message } from '../../../components/message';

//  FIREBASE HELPERS
import { signInWithGoogle } from '../../../firebase';
import { auth } from '../../../firebase';
import { generateUserDocument } from '../../../firebase';

//  Redux Actions
import * as AuthActions from '../../../store/actions/auth';

import './login.scss';

const loaders = {
    google: false,
    form: false
}
  

const Login = () => {
    const userAuth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(loaders);
    // const [ user, setUser ] = useState();

    const processLogin = useCallback(async (user) => {
        console.log(user);
        try {
            await dispatch(AuthActions.login(user));
            Message('success', 'Login successful', 5);
            
            // setLoading({
            //     form: false,
            //     google: false
            // })

        }catch (error){
            // console.log(error.response)
            console.log(error.message)
            let callError = CONSTANTS.ERRORDESC;
            

            // setLoading({
            //     form: false,
            //     google: false
            // })
            Message('error', callError, 5);
        }
    }, [setLoading]);

    // console.log(user)

    const signInWithEmailAndPasswordHandler = useCallback((email, password) => {
        // event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            // setError("Error signing in with password and email!");
            let callError = CONSTANTS.ERRORDESC;
            if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
                callError = "Invalid credentials";
            }
            Message('error', callError, 5);

            // console.error("Error signing in with password and email", error);
        });
    }, [setLoading]);

    const signInWithGoogleHandler = useCallback(async () => {
        setLoading({
            ...loading,
            google: true
        })
        await signInWithGoogle();

        setLoading({
            form: false,
            google: false
        })
       

    }, [setLoading, loading]);

    useEffect(() => {
        // console.log('got here');
        auth.onAuthStateChanged(async userAuth => {
            // console.log(userAuth)
            if(userAuth){
                const user = await generateUserDocument(userAuth);
                // console.log(user)
                // setUser(user)
                processLogin(user)
            }
          
        });
    }, [])

    if(userAuth && userAuth.loggedIn){
        return <Redirect to="/admin" />
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
                        
                        setLoading({
                            ...loading,
                            form: true
                        })

                        // processLogin(values);
                        signInWithEmailAndPasswordHandler(values.email, values.password)
                    
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
                                disabled={loading.google || loading.form}
                            >
                                Sign in
                                {
                                    loading.form ? <CircularProgress size={20} style={{color: 'white'}} /> : ''
                                }
                            </Button>
                            
                            <div className="text-center mt-3">
                                <p>OR</p>
                            </div>

                            <Button
                                color="primary"
                                variant="contained"
                                style={{background: '#dc3545'}}
                                onClick={signInWithGoogleHandler}
                                disabled={loading.google || loading.form}
                            >
                                Sign In With Google 
                                {
                                    loading.google ? <CircularProgress size={20} style={{color: 'white'}} /> : ''
                                }
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