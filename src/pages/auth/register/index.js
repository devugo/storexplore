import { useState, useCallback } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import { Message } from '../../../components/message';
import LogoText from '../../../images/logo-text.svg';

import { auth } from '../../../firebase';
import { generateUserDocument } from '../../../firebase';

// import * as CONSTANTS from '../../../constants';

import './register.scss';

const Register = () => {
    const [ loader, setLoader ] = useState(false);
    
    const processRegister = useCallback(async (formData) => {
        console.log("here");
    }, [loader, setLoader])

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
          const {user} = await auth.createUserWithEmailAndPassword(email, password);
        //   generateUserDocument(user, {displayName});
          generateUserDocument("user", "displayName");
        }
        catch(error){
        //   setError('Error Signing up with email and password');
        }
    };

    return (
        <div className="auth">
            <div className="devugo-card">
                <div className="logo">
                    <img src={LogoText} alt="logo-text" />
                </div>
                <p className="mt-3 mb-2"><strong>New here? Signup to proceed!</strong></p>

                <Formik
                    initialValues={{ email: '', password: '', name: '', password_confirmation: '', agree: false }}
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
                        if(!values.name){
                            errors.name = 'Name is required';
                        }
                        if(!values.password_confirmation){
                            errors.password_confirmation = 'Please, confirm your password';
                        }else if(values.password_confirmation !== values.password){
                            errors.password_confirmation = 'Confirm Password must match password';
                        }
                        if(!values.agree){
                            errors.agree = 'Please, Agree to terms and conditions';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoader(true);
                        
                        processRegister(values);
                    
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
                            >
                                Register
                            </Button>

                            <div className="text-center mt-3">
                                <p>OR</p>
                            </div>

                            
                            <Button
                                color="primary"
                                variant="contained"
                                style={{background: '#dc3545'}}
                            >
                                Sign Up With Google
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