
import { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LockIcon from '@mui/icons-material/Lock';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import firebase from '../../utils/firebase'
import Loading from '../../ui-components/Loding/Loading'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from 'axios';
import moment from 'moment'
import * as Yup from 'yup';
import './style.scss'
import 'react-toastify/dist/ReactToastify.css';
import "yup-phone";



const Register = () => {
    const [formData, setFormData] = useState({})
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

                console.log("Recaptca varified")
            },
            defaultCountry: "IN"
        });
    }

    const verifyMobileNumber = (mobileNo) => {
        setLoading(true)
        configureCaptcha()
        const phoneNumber = "+91" + mobileNo
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                console.log(confirmationResult, "confirmationResult")
                window.confirmationResult = confirmationResult;
                toast.success(`OTP has been sent to your mobile number.`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: 'colored',
                    transition: Zoom
                })
                setLoading(false)
                setOtpSent(true)
            }).catch((error) => {
                console.log(error, "error")
                setLoading(false)
                toast.error("Something Went Wrong, Please try again", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: 'colored',
                    transition: Zoom
                })
            });
    }

    const onSubmitOTP = (values) => {
        setLoading(true)
        const code = values.otp
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(JSON.stringify(user))
            setLoading(false)

            register()
            // ...
        }).catch((error) => {
            consoe.log(error)
            toast.error('Something Went Wrong, Please try again', {
                position: "top-right",
                autoClose: 3000,
                theme: 'colored',
                transition: Zoom
            })
            setLoading(false)
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    const register = (values) => {
        setLoading(true)
        let payload = { ...values, age: moment().diff(values.dob, 'years'), referral_code: '', dob: moment(values.dob).format('yyyy-MM-DD') }
        delete payload.confirmPwd
        console.log(payload)
        axios.post('http://api.dev.pellifix.com/v1/customer/register', { ...payload }).then(response => {
            console.log(response)
            setLoading(false)
            toast.success("Registration successfully completed!", {
                position: "top-right",
                autoClose: 3000,
                theme: 'colored',
                transition: Zoom
            })
            verifyMobileNumber(values.mobileno)

        }).catch(err => {
            console.log(err)
            toast.error(err.response.data.error.message, {
                position: "top-right",
                autoClose: 3000,
                theme: 'colored',
                transition: Zoom
            })
            setLoading(false)
        })
    }

    const moileVerify=()=>{
        setLoading(true)
        let payload = { ...values, age: moment().diff(values.dob, 'years'), referral_code: '', dob: moment(values.dob).format('yyyy-MM-DD') }
        delete payload.confirmPwd
        console.log(payload)
        axios.post('http://api.dev.pellifix.com/v1/customer/register', { ...payload }).then(response => {
            console.log(response)
            setLoading(false)
            toast.success("Registration successfully completed!", {
                position: "top-right",
                autoClose: 3000,
                theme: 'colored',
                transition: Zoom
            })
            verifyMobileNumber(values.mobileno)

        }).catch(err => {
            console.log(err)
            toast.error(err.response.data.error.message, {
                position: "top-right",
                autoClose: 3000,
                theme: 'colored',
                transition: Zoom
            })
            setLoading(false)
        })
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        email_id: Yup.string()
            .required('Email is Required')
            .email('Email is not Valid'),
        mobileno: Yup.string()
            .required('Mobile Number is Required')
            .phone('Mobile Number is not Valid'),
        gender: Yup.string()
            .required('Gender is Required'),
        dob: Yup.date()
            .required('Date Of Birth is Required'),
        profile_creater: Yup.string()
            .required('Profile Created By is Required'),
        password: Yup.string()
            .min(6)
            .required('Password is Required'),
        confirmPwd: Yup.string()
            .min(6)
            .required('Password is Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    return (
        <div className='container-fluid register-container'>

            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-5'>
                <div className='register-bg-image'></div>
            </div>
            {
                otpSent ?
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-7 align-center'>
                        <h3 className='primaryColor heading1'>Verify Your Mobile Number</h3>
                        <br />
                        <h5 className='heading2'>One Step ahead to complete your registration process</h5>
                        <span className='para'>An 6 digit OTP has sent to your +91 {formData.mobileno} mobile number, please enter below</span>
                        <Formik

                            initialValues={{ otp: '' }}
                            validationSchema={Yup.object().shape({
                                otp: Yup.string()
                                    .min(6)
                                    .max(6)
                                    .required('OTP is Required')
                            })}

                            onSubmit={(values) => {
                                setTimeout(() => {
                                    console.log(values, "values")
                                    onSubmitOTP(values)
                                }, 400);
                            }
                            }
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit

                            }) => (
                                <form className='container' onSubmit={handleSubmit}>
                                    <div className='row' style={{ paddingLeft: 0 }}>
                                        <div className='col-sm-6'>
                                            <TextField
                                                className='formField '
                                                name='otp'
                                                fullWidth
                                                label="OTP"
                                                variant="outlined"
                                                size='small'
                                                error={errors.otp && touched.otp && errors.otp ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.otp}
                                                helperText={errors.otp && touched.otp ? errors.otp : ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><MobileFriendlyIcon /></InputAdornment>
                                                }}
                                            />
                                        </div>

                                    </div>
                                    <div className='row' style={{ paddingLeft: 0 }}>
                                        <div className='col-sm-6'>
                                            <Button className='button' type="submit" variant="contained" color='primary'>Submit</Button>
                                            {/* <div className='newuser'>
                                                <span>Didn't get OTP? <span onClick={() => onSignInSubmit()} className='primaryColor'>Resend OTP</span></span>
                                            </div> */}
                                        </div>
                                    </div>
                                </form>
                            )
                            }

                        </Formik>
                    </div> :
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-7 align-center'>
                        <h3 className='primaryColor heading1'>Register</h3>
                        <br />
                        <h5 className='heading2'>Manage all your matchings</h5>
                        <span className='para'>Let's get you all set up so you can verify your personal account and begin setting up your profile.</span>
                        <Formik

                            initialValues={{ name: '', profile_creater: '', email_id: '', password: '', mobileno: '', confirmPwd: '', gender: '', dob: moment().subtract(18, 'years').calendar() }}
                            validationSchema={SignupSchema}

                            onSubmit={(values) => {
                                setTimeout(() => {
                                    register(values)
                                }, 400);
                            }
                            }
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldValue

                            }) => (

                                <form className='container' onSubmit={handleSubmit}>
                                    <div style={{ display: 'none' }} id="sign-in-button"></div>
                                    <div className='row' style={{ paddingLeft: 0 }}>
                                        <div className='col-sm-6'>
                                            <TextField
                                                className='formField'
                                                name='name'
                                                fullWidth
                                                label="Name"
                                                variant="outlined"
                                                size='small'
                                                error={errors.name && touched.name && errors.name ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                helperText={errors.name && touched.name ? errors.name : ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><AccountCircleIcon /></InputAdornment>
                                                }}
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            <TextField
                                                className='formField '
                                                name='email_id'
                                                fullWidth
                                                label="Email"
                                                variant="outlined"
                                                size='small'
                                                error={errors.email_id && touched.email_id && errors.email_id ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email_id}
                                                helperText={errors.email_id && touched.email_id ? errors.email_id : ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>
                                                }}
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            <TextField
                                                className='formField'
                                                type='text'
                                                name='mobileno'
                                                variant="outlined"
                                                error={errors.mobileno && touched.mobileno && errors.mobileno ? true : false}
                                                fullWidth
                                                label="Phone Number"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mobileno}
                                                size='small'
                                                helperText={errors.mobileno && touched.mobileno ? errors.mobileno : ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><PhoneIphoneIcon /></InputAdornment>,
                                                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                                                }}
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            <FormControl className='formField' fullWidth size='small' error={errors.gender && touched.gender && errors.gender ? true : false}>
                                                <InputLabel id="gender">Gender</InputLabel>
                                                <Select
                                                    labelId="gender"
                                                    id="gen"
                                                    label="Gender"
                                                    name='gender'
                                                    value={values.gender}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <MenuItem value='Male'>Male</MenuItem>
                                                    <MenuItem value='Female'>Female</MenuItem>
                                                    <MenuItem value='Others'>Others</MenuItem>
                                                </Select>
                                                <FormHelperText>{errors.gender && touched.gender ? errors.gender : ''}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className='col-sm-6'>
                                            <FormControl className='formField' fullWidth size='small' error={errors.profile_creater && touched.profile_creater && errors.profile_creater ? true : false}>
                                                <InputLabel id="profile_creater">Profile Created By</InputLabel>
                                                <Select
                                                    labelId="profile_creater"
                                                    id="profileCreated"
                                                    label="Profile Created By"
                                                    name='profile_creater'
                                                    value={values.profile_creater}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <MenuItem value='Self'>Self</MenuItem>
                                                    <MenuItem value='Daughter'>Daughter</MenuItem>
                                                    <MenuItem value='Son'>Son</MenuItem>
                                                    <MenuItem value='Relatives'>Relative</MenuItem>
                                                    <MenuItem value='Others'>Others</MenuItem>
                                                </Select>
                                                <FormHelperText>{errors.profile_creater && touched.profile_creater ? errors.profile_creater : ''}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className='col-sm-6'>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    sx={{ width: '100%' }}
                                                    label="Date of Birth"
                                                    inputFormat="dd-MM-yyyy"
                                                    value={values.dob}
                                                    name='dob'
                                                    maxDate={new Date(moment().subtract(18, 'years').calendar())}
                                                    onChange={(value) => setFieldValue('dob', value)}
                                                    onBlur={handleBlur}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={errors.dob && touched.dob && errors.dob ? true : false}
                                                            helperText={errors.dob && touched.dob ? errors.dob : ''}
                                                            className='formField'
                                                            size='small'
                                                            inputProps={{ ...params.inputProps, placeholder: "dd-mm-aaaa" }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
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
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><LockIcon /></InputAdornment>
                                                }}
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
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><LockIcon /></InputAdornment>
                                                }}
                                            />
                                        </div>


                                    </div>
                                    <div className='row' style={{ paddingLeft: 0 }}>

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
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><LockIcon /></InputAdornment>
                                                }}
                                            />
                                        </div>


                                        <div className='col-sm-6'>
                                            <Button className='button' type="submit" variant="contained" color='primary'>Create Account</Button>
                                            
                                        </div>
                                        <div className='newuser'>
                                                <span>Already have an account? <span onClick={() => navigate('/login')} className='primaryColor'>Login</span></span>
                                            </div>
                                    </div>


                                </form>
                            )}
                        </Formik>
                    </div>
            }
            <Loading loading={loading} />
            <ToastContainer />
        </div>
    )
};
export default Register

