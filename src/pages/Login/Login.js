import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Loading from "../../ui-components/Loding/Loading";
import Authorization from "../../utils/authorization";
import AOS from 'aos';
import './style.scss'
import "aos/dist/aos.css";
import { API } from "../../utils/apiEndpoints";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isAssociatelogin = location && location.pathname && location.pathname == '/associates/login';
  const isSubOrdinatelogin = location && location.pathname && location.pathname == '/sub-ordinate/login';

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
    let api;
    if (isAssociatelogin) {
      api = API.associateLogin;
    }else if(isSubOrdinatelogin) {
      api = API.subOrdinateLogin;
    } else {
      api = API.customerLogin;
    }
    validateUserLogin(values, api);
  };

  const validateUserLogin = (values, api) => {
    axios
      .post(api, { ...values },)
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
            if (isAssociatelogin) {
              navigate("/auth/associates/view-profile");
            } else if (isSubOrdinatelogin) {
              navigate("/auth/sub-ordinate/home");
            } else {
              navigate("/auth/home");
            }
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
    <div className="container-fluid login-container">
      {(!isAssociatelogin && !isSubOrdinatelogin) ?
        <div
          data-aos="fade-down"
          className="col-xs-12 col-sm-12 col-md-12 col-lg-7"
          style={{ position: "relative" }}
        >
          <div className="login-bg-image"></div>
        </div>
        : null}
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
                <NavLink to={isAssociatelogin ? '/associates/forgot-password' : isSubOrdinatelogin ? '/sub-ordinate/forgot-password'  :'/forgot-password'} className="forgotpwd">Forgot Password?</NavLink>
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
