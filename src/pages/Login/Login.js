import './style.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='container-fluid login-container'>

            <div className='col-sm-8' style={{ position: 'relative' }}>
                <div className='login-bg-image'></div>

            </div>
            <div className='col-sm-4 align-center'>
                <h3 className='primaryColor heading1'>Login</h3>
                <br />
                <h5 className='heading2'>Login to your account</h5>
                <span className='para'>Thank you for get back to Pellifix, Lets acess our the best recommendation for you.</span>
                <Formik

                    initialValues={{ email: '', password: '' }}
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

                        <form onSubmit={handleSubmit}>
                            <TextField
                                className='formField'
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
                            <Button className='button' type="submit" variant="contained" color='primary'>Login</Button>
                            <div className='forgotpwd'>Forgot Password?</div>
                            <div className='newuser'>
                                <span>Don't have an account yet? <span onClick={() => navigate('/register')} className='primaryColor'>Join Pellifix</span></span>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>

        </div>
    )
};
export default Login