import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Loading from "../../ui-components/Loding/Loading";
import AOS from 'aos';
import './style.scss'
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true
    });
})

  const login = (values) => {
    setLoading(true);
    axios
      .post("https://api.pellifix.com/v1/customer/login", { ...values })
      .then((response) => {
        console.log(response);
        if(response && response.status==200){
          localStorage.setItem('pfToken',response.data.token)
          setLoading(false);
          toast.success("Login Successfully!", {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
            transition: Zoom,
          });
          setTimeout(() => {
            navigate("/auth/home");
          }, 1000);
        }
  
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error.message, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Zoom,
        });
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid login-container">
      <div
        data-aos="fade-down"
        className="col-xs-12 col-sm-12 col-md-12 col-lg-7"
        style={{ position: "relative" }}
      >
        <div className="login-bg-image"></div>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 align-center">
        <h3 className="primaryColor heading1">Login</h3>
        <br />
        <h5 className="heading2">Login to your account</h5>
        <span className="para">
          Thank you for get back to Pellifix, Lets acess our the best
          recommendation for you.
        </span>
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
              login(values);
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
              <NavLink to={'/forgot-password'} className="forgotpwd">Forgot Password?</NavLink>
                </div>
             
              <div className="newuser">
                <span>
                  Don't have an account yet?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="primaryColor"
                  >
                    Join Pellifix
                  </span>
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Loading loading={loading} />
      <ToastContainer />
    </div>
  );
};
export default Login;
