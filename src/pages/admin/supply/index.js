import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {useDropzone} from 'react-dropzone'

// Bootstrap Components
import { Card } from 'react-bootstrap';

// Material-ui conponents
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import DashboardWrapper from "../../../components/dashboard-wrapper";
import * as CONSTANTS from '../../../constants';
import { Message } from '../../../components/message';

import { sideLinks } from '../nav-links';

//  Redux Actions
import * as SupplyActions from '../../../store/actions/supply';

import './supply.scss';



const Supply = () => {
    const supply = useSelector(state => state.supply);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(CONSTANTS.LOADERS);
    const [open, setOpen] = useState(false);

    const [productImage, setProductImage] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    }; 

    // Message('success', 'Supply was created successfully', 5);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setProductImage(acceptedFiles[0]);
        console.log(acceptedFiles)
    }, [setProductImage])
    
    //  Dropzone params
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const createSupply = useCallback(async (formData) => {
        console.log(formData)
        setLoading({
            ...loading,
            create: true
        });
        try {
            await dispatch(SupplyActions.create(formData));
            Message('success', 'Supply was created successfully', 5);

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
        setLoading({
            ...loading,
            create: false
        });
    }, [dispatch, loading]);

    const getSupply = useCallback(async () => {
        try {
            await dispatch(SupplyActions.read());

        }catch (error){
            let callError = CONSTANTS.ERRORDESC;
            Message('error', callError, 5);
        }
    }, [dispatch]);

    useEffect(() => {
        getSupply();
    }, [])

    // useEffect(() => {
    //     if(productImage) {

    //     }
    // })

    return (
        <DashboardWrapper sidenavs={sideLinks}>
            <div className="supply-page admin-supply">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    Add New <AddIcon />
                </Button>
                
            
                <Grid container spacing={3}>

                    {
                        supply.loaded && supply.data.map((item, index) => {
                            return (
                                <Grid item md={6} lg={3} key={index}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src="holder.js/100px180" />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                                {item.description}
                                            </Card.Text>
                                            <Button variant="primary">View</Button>
                                        </Card.Body>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                    <Grid item md={6} lg={3}>
                        {/* <Card style={{ width: '18rem' }}> */}
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid item md={6} lg={3}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid>
            </div>
          
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">Add new supply</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Add new supply
                    </DialogContentText> */}
                   
                        <Formik
                            initialValues={{ name: '', description: '', cost: '', sellingPrice: '', image: '' }}
                            validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Name of supply is required';
                            }
                            if(!values.cost){
                                errors.cost = 'Cost of supply is required';
                            }else if(values.cost < 1){
                                errors.cost = 'Cost of item should be greater than 0';
                            }
                            if(!values.sellingPrice){
                                errors.sellingPrice = 'Selling price is required';
                            }else if(values.sellingPrice <= values.cost){
                                errors.sellingPrice = 'Selling price should be greater than cost price';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            
                            setLoading({
                                ...loading,
                                add: true
                            })

                            createSupply(values)
                        
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
                                    <TextField multiline={true} rows={4} onChange={handleChange} value={values.description} id="description" name="description" label="Description" variant="outlined" fullWidth error={errors.description && touched.description && true} /> 
                                    <small className="text-danger">{errors.description && touched.description && errors.description}</small>
                                </div>
                                <div className="mb-4">
                                    <TextField onChange={handleChange} type="number" value={values.cost} id="cost" name="cost" label="Cost" variant="outlined" fullWidth error={errors.cost && touched.cost && true} /> 
                                    <small className="text-danger">{errors.cost && touched.cost && errors.cost}</small>
                                </div>
                                <div className="mb-4">
                                    <TextField onChange={handleChange} type="number" value={values.sellingPrice} id="cost" name="sellingPrice" label="Selling Price" variant="outlined" fullWidth error={errors.sellingPrice && touched.sellingPrice && true} /> 
                                    <small className="text-danger">{errors.sellingPrice && touched.sellingPrice && errors.sellingPrice}</small>
                                </div>
                                <div className="mb-4">
                                    <div className={`storexplore-dropzone ${productImage ? 'active' : ''}`} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                            <p>Drop the product image here ...</p> :
                                            <p>Drag and drop product image here, or click to select product image</p>
                                        }
                                    </div>
                                    <small className="text-danger">{errors.image && touched.image && errors.image}</small>
                                </div>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={loading.create}
                                >
                                    Add Supply
                                    {
                                        loading.create ? <CircularProgress size={20} style={{color: 'white'}} /> : ''
                                    }
                                </Button>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardWrapper>
    )
}

export default Supply;