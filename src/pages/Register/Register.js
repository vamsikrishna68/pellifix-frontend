import './style.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    return (
        <div className='container-fluid register-container'>

            <div className='col-sm-5'>
                <div className='login-bg-image'></div>
            </div>
            <div className='col-sm-7 align-center'>
                <h3 className='primaryColor heading1'>Register</h3>
                <br />
                <h5 className='heading2'>Manage all your matchings</h5>
                <span style={{ width: '45%' }} className='para'>Let's get you all set up so you can verify your personal account and begin setting up your profile.</span>
                <Formik

                    initialValues={{ firstname: '', lastname: '', email: '', password: '',phone:'',confirmPwd:'' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Password is Required';
                        }
                        if (!values.firstname) {
                            errors.firstname = 'First Name is Required';
                        }
                        if (!values.lastname) {
                            errors.lastname = 'Last Name is Required';
                        }
                        if (!values.phone) {
                            errors.phone = 'Phone Number is Required';
                        }
                        if (!values.confirmPwd) {
                            errors.confirmPwd = 'Confirm Password is Required';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            navigate('/products')
                            setSubmitting(false);
                        }, 400);

                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting

                    }) => (

                        <form className='container' onSubmit={handleSubmit}>
                            <div className='row' style={{ paddingLeft: 0 }}>
                                <div className='col-sm-6'>
                                    <TextField
                                        className='formField '
                                        name='firstname'
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                        size='small'
                                        error={errors.firstname && touched.firstname && errors.firstname ? true : false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstname}
                                        helperText={errors.firstname && touched.firstname ? errors.firstname : ''}
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <TextField
                                        className='formField '
                                        name='lastname'
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                        size='small'
                                        error={errors.lastname && touched.lastname && errors.lastname ? true : false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname}
                                        helperText={errors.lastname && touched.lastname ? errors.lastname : ''}
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <TextField
                                        className='formField'
                                        type='phone'
                                        name='phone'
                                        variant="outlined"
                                        error={errors.phone && touched.phone && errors.phone ? true : false}
                                        fullWidth
                                        label="Phone Number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        size='small'
                                        helperText={errors.phone && touched.phone ? errors.phone : ''}
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <TextField
                                        className='formField '
                                        name='email'
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        size='small'
                                        error={errors.email && touched.email && errors.email ? true : false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        helperText={errors.email && touched.email ? errors.email : ''}
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <TextField
                                        className='formField'
                                        type='password'
                                        name='password'
                                        variant="outlined"
                                        error={errors.password && touched.password && errors.password ? true : false}
                                        fullWidth
                                        label="Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        size='small'
                                        helperText={errors.password && touched.password ? errors.password : ''}
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <TextField
                                        className='formField'
                                        type='confirmPwd'
                                        name='confirmPwd'
                                        variant="outlined"
                                        error={errors.confirmPwd && touched.confirmPwd && errors.confirmPwd ? true : false}
                                        fullWidth
                                        label="Confirm Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPwd}
                                        size='small'
                                        helperText={errors.confirmPwd && touched.confirmPwd ? errors.confirmPwd : ''}
                                    />
                                </div>
                           

                            </div>
                            <div className='row' style={{ paddingLeft: 0 }}>
                                <div className='col-sm-6'>
                                    <Button className='button' type="submit" variant="contained" color='primary'>Create Account</Button>
                                    <div className='newuser'>
                                        <span>Already have an account? <span onClick={() => navigate('/login')} className='primaryColor'>Login</span></span>
                                    </div>
                                </div>
                            </div>


                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
};
export default Register