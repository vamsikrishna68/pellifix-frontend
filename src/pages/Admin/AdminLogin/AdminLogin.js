import { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button } from '@mui/material'
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import './style.scss'
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Loading from "../../../ui-components/Loding/Loading";
import { API } from "../../../utils/apiEndpoints";
import Authorization from "../../../utils/authorization";

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateLogin = (values) => {
        setLoading(true);
        axios
            .post(API.adminLogin, { ...values },)
            .then((response) => {
                if (response && response.status == 200) {
                    Authorization.login(response.data)
                    setLoading(false);
                    toast.success("Login Successfully!", {
                        position: "top-right",
                        autoClose: 1500,
                        theme: "colored",
                        transition: Zoom,
                    });
                    setTimeout(() => {
                        navigate("/auth/admin/home");
                    }, 1000);
                }

            })
            .catch((err) => {
                toast.error(err.response.data.error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                    transition: Zoom,
                });
                setLoading(false);
            });
    }

    return (
        <div className="container-fluid admin-login">
            <Card elevation={4} className='card'>
                <CardContent className='content'>
                    <h3 className="primaryColor heading1">Login</h3>
                    <Formik
                        initialValues={{ email_id: "", password: "" }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email_id) {
                                errors.email_id = "Email is Required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_id)
                            ) {
                                errors.email_id = "Invalid email address";
                            }
                            if (!values.password) {
                                errors.password = "Password is Required";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                validateLogin(values);
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
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    className="formField"
                                    name="email_id"
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    error={
                                        errors.email_id && touched.email_id && errors.email_id
                                            ? true
                                            : false
                                    }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email_id}
                                    helperText={
                                        errors.email_id && touched.email_id ? errors.email_id : ""
                                    }
                                />
                                <TextField
                                    className="formField"
                                    type="password"
                                    name="password"
                                    variant="outlined"
                                    error={
                                        errors.password && touched.password && errors.password
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    label="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    size="small"
                                    helperText={
                                        errors.password && touched.password ? errors.password : ""
                                    }
                                />
                                <Button
                                    className="button"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </Button>
                                <div>
                                    <NavLink to={'/admin/forgot-password'} className="forgotpwd">Forgot Password?</NavLink>
                                </div>
                            </form>
                        )}
                    </Formik>
                </CardContent>

            </Card>
            <Loading loading={loading} />
            <ToastContainer />
        </div>
    )
}
export default AdminLogin