import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

//  MATERIAL UI COMPONENTS
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Message } from '../../../components/message';
import LogoText from '../../../images/logo-text.svg';

//  FIREBASE
import { signInWithGoogle } from '../../../firebase';
import { auth } from '../../../firebase';
import { generateUserDocument } from '../../../firebase';


import * as CONSTANTS from '../../../constants';

//  Redux Actions
import * as AuthActions from '../../../store/actions/auth';

import './register.scss';

const loaders = {
    google: false,
    form: false
}

const Register = () => {
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(loaders);
    
    const processLogin = useCallback(async (user) => {
        console.log(user);
        try {
            await dispatch(AuthActions.login(user));
            Message('success', 'Sign in successful', 5);
            
        }catch (error){
            // console.log(error.response)
            console.log(error.message)
            let callError = CONSTANTS.ERRORDESC;
            Message('error', callError, 5);
        }
    }, [dispatch]);

    const createUserWithEmailAndPasswordHandler = useCallback(async (name, email, password) => {
        try{
          const {user} = await auth.createUserWithEmailAndPassword(email, password);
        //   generateUserDocument(user, {displayName});
          generateUserDocument(user, {displayName: name});
        }
        catch(error){
            // setError('Error Signing up with email and password');
            let callError = CONSTANTS.ERRORDESC;

            if(error.code === 'auth/email-already-in-use'){ 
                callError = error.message
            }
            console.error("Error", error);
            Message('error', callError, 5);
        }
    }, []);

    const signUpWithGoogleHandler = useCallback(async () => {
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
        
        auth.onAuthStateChanged(async userAuth => {
            if(userAuth){
                const user = await generateUserDocument(userAuth);
              
                processLogin(user)
            }
          
        });
    }, [processLogin])

    return (
        <div className="auth">
            <div className="devugo-card">
                <div className="logo">
                    <img src={LogoText} alt="logo-text" />
                </div>
                <p className="mt-3 mb-2"><strong>New here? Signup to proceed!</strong></p>

                <Formik
                    initialValues={{ email: '', password: '', name: '', password_confirmation: '' }}
                    validate={values => {
                        // console.log(values);
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
                        if(!values.name){
                            errors.name = 'Name is required';
                        }
                        if(!values.password_confirmation){
                            errors.password_confirmation = 'Please, confirm your password';
                        }else if(values.password_confirmation !== values.password){
                            errors.password_confirmation = 'Confirm Password must match password';
                        }
                        // if(!values.agree){
                        //     errors.agree = 'Please, Agree to terms and conditions';
                        // }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        setLoading({
                            ...loading,
                            form: true
                        })

                        
                        createUserWithEmailAndPasswordHandler(values.name, values.email, values.password);
                    
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
                                <TextField onChange={handleChange} value={values.name} id="name" name="name" label="Name" variant="outlined" fullWidth error={errors.name && touched.name && true} />
                                <small className="text-danger">{errors.name && touched.name && errors.name}</small>
                            </div>
                            <div className="mb-4">
                                <TextField onChange={handleChange} value={values.email} id="email" name="email" label="Email" variant="outlined" fullWidth error={errors.email && touched.email && true} />
                                <small className="text-danger">{errors.email && touched.email && errors.email}</small>
                            </div>
                            <div className="mb-4">
                                <TextField onChange={handleChange} value={values.password} id="password" type="password" name="password" label="Password" variant="outlined" fullWidth error={errors.password && touched.password && true} /> 
                                <small className="text-danger">{errors.password && touched.password && errors.password}</small>
                            </div>
                            <div className="mb-4">
                                <TextField onChange={handleChange} value={values.password_confirmation} id="password_confirmation" type="password" name="password_confirmation" label="Confirm Password" variant="outlined" fullWidth error={errors.password_confirmation && touched.password_confirmation && true} /> 
                                <small className="text-danger">{errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}</small>
                            </div>
                            {/* <div className="form-input bottom">
                                <label>
                                    <Input
                                        name="agree" 
                                        checked={values.agree}
                                        type="checkbox"
                                        onChange={handleChange}
                                        classnames={errors.agree && touched.agree  && 'error'}
                                        classnames={errors.agree && touched.agree  && 'error'}
                                    /> 
                                    <span className="ml-1">I agree to all the Terms and Conditions</span>
                                </label>
                                <small className="text-danger">{errors.agree && touched.agree && errors.agree}</small>
                            </div> */}
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={loading.google || loading.form}
                            >
                                Register 
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
                                onClick={signUpWithGoogleHandler}
                                disabled={loading.google || loading.form}
                            >
                                Sign Up With Google 
                                {
                                    loading.google ? <CircularProgress size={20} style={{color: 'white'}} /> : ''
                                }
                            </Button>

                            <div className="text-center mt-2">
                                <span>Already have an account? <Link to="/login">Sign in</Link></span>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Register;