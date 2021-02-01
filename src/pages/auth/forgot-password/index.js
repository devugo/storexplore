import { useState, useCallback } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import { Message } from '../../../components/message';
import LogoText from '../../../images/logo-text.svg';

import { auth } from '../../../firebase';

// import * as CONSTANTS from '../../../constants';

const ForgotPassword = () => {
    const [ loader, setLoader ] = useState(false);
    
    const processForgotPassword = useCallback(async (formData) => {
        auth.sendPasswordResetEmail(formData.email)
        .then(() => {
            // setEmailHasBeenSent(true);
            // setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        })
        .catch(() => {
            // setError("Error resetting password");
        });
        console.log("here");
    }, [loader, setLoader])

    return (
        <div className="auth">
            <div className="devugo-card">
                <div className="logo">
                    <img src={LogoText} alt="logo-text" />
                </div>
                <p className="mt-3 mb-2"><strong>Sign in to continue!</strong></p>

                <Formik
                    initialValues={{ email: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Please, specify a valid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        // setLoader(true);
                        
                        processForgotPassword(values);
                    
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
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                               Reset
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ForgotPassword;