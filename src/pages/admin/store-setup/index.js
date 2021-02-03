import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import SetupStoreimage from '../../../images/setup-store.svg';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';

import * as CONSTANTS from '../../../constants';
import { Message } from '../../../components/message';

//  Redux Actions
import * as StoreActions from '../../../store/actions/store';

import './store-setup.scss';

const sectors = [
    'IT / Communication',
    'General Mechandize',
    'Welding',
    'Paintings and Coatings',
    'Others',
];


const StoreSetup = () => {
    const store = useSelector(state => state.store);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const createStore = useCallback(async (formData) => {
        setLoading(true);
        try {
            await dispatch(StoreActions.create(formData));
            Message('success', 'Store was created successfully', 5);

        }catch (error){
            // console.log(error.response)
            console.log(error);
            console.log(error.message)
            let callError = CONSTANTS.ERRORDESC;
            
            if(error.message){
                callError = error.message
            }

            Message('error', callError, 5);
        }
        setLoading(false);
    }, [loading]);

    const updateStore = useCallback(async (formData) => {
        setLoading(true);
        try {
            await dispatch(StoreActions.update(formData));
            Message('success', 'Store was updated successfully', 5);

        }catch (error){
            // console.log(error.response)
            console.log(error);
            console.log(error.message)
            let callError = CONSTANTS.ERRORDESC;
            
            if(error.message){
                callError = error.message
            }

            Message('error', callError, 5);
        }
        setLoading(false);
    }, [loading]);

    const getStore = useCallback(async () => {
        try {
            await dispatch(StoreActions.read());

        }catch (error){
            let callError = CONSTANTS.ERRORDESC;
            Message('error', callError, 5);
        }
    }, []);

    useEffect(() => {
        getStore();
    }, [])

    return (
        <div className="store-setup">
            <div className="content">
                <div className="left">
                    <h1>STORE</h1>
                    <img className="setup-img" src={SetupStoreimage} alt="setup image" />
                    <h2>SETUP YOUR STORE</h2>
                    <p>Easiest way to manage your store; stock on goods and profit calculations.</p>
                </div>
                <div className="right">
                    <h1>XPLORE</h1>
                    <div className="devugo-card">

                        {
                            store.loaded ?
                            <>
                                <p className="mt-3 mb-2"><strong>Create Store!</strong></p>
                                <Formik
                                    initialValues={{ name: store.data.name, description: store.data.description, sector: store.data.sector, address: store.data.address }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.name) {
                                            errors.name = 'Please, provide the name of your store';
                                        } 
                                        if(!values.description){
                                            errors.description = 'Please, provide the description of your store';
                                        }
                                        if(!values.sector){
                                            errors.sector = 'Please, provide the sector of your store';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        
                                        if(store.data.name){
                                            updateStore(values)
                                        }else{
                                            createStore(values);
                                        }
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
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Select a sector"
                                                    value={values.sector}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    name="sector"
                                                    id="sector"
                                                    fullWidth
                                                    error={errors.sector && touched.sector && true}
                                                >
                                                    {sectors.map((sector) => (
                                                        <MenuItem key={sector} value={sector}>
                                                            {sector}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                {/* <TextField onChange={handleChange} value={values.sector} id="sector" name="sector" label="Sector" variant="outlined" fullWidth error={errors.sector && touched.sector && true} /> */}
                                                <small className="text-danger">{errors.sector && touched.sector && errors.sector}</small>
                                            </div>
                                            <div className="mb-4">
                                                <TextField rows={4} multiline onChange={handleChange} value={values.description} id="description" name="description" label="Description" variant="outlined" fullWidth error={errors.description && touched.description && true} /> 
                                                <small className="text-danger">{errors.description && touched.description && errors.description}</small>
                                            </div>
                                            <div className="mb-4">
                                                <TextField rows={4} multiline onChange={handleChange} value={values.address} id="address" name="address" label="Address" variant="outlined" fullWidth error={errors.address && touched.address && true} /> 
                                                <small className="text-danger">{errors.address && touched.address && errors.address}</small>
                                            </div>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {
                                                    store.data.name ?
                                                    'Update' :
                                                    'Create'
                                                }
                                                {
                                                    loading ? <CircularProgress size={20} style={{color: 'white'}} /> : ''
                                                }
                                            </Button>
                                        </form>
                                    )}
                                </Formik>
                            </> :
                            <div>
                                <div className="mb-4">
                                    <Skeleton variant="rect" height={40} />
                                </div>
                                <div className="mb-4">
                                    <Skeleton variant="rect" height={40} />
                                </div>
                                <div className="mb-4">
                                    <Skeleton variant="rect" height={80} />
                                </div>
                                <div className="mb-4">
                                    <Skeleton variant="rect" height={80} />
                                </div>
                                <div className="mb-4">
                                    <Skeleton variant="rect" height={40} width={100} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreSetup;