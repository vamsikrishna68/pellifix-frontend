import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Loading from "../../ui-components/Loding/Loading";
import axios from "axios";
import { Formik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "./style.scss";
import "aos/dist/aos.css";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const params = window.location.pathname.split("d/").pop();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  });

  const resetPassword = (values) => {
    let payload = {
      password: values.password,
    };
    setLoading(true);
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/v1/customer/password/update/${params}`,
        {
          ...payload,
        }
      )
      .then((response) => {
        console.log(response);
        if (response && response.status == 204) {
          setLoading(false);
          toast.success(
            response.data.message || "Reset password successfully",
            {
              position: "top-right",
              autoClose: 1500,
              theme: "colored",
              transition: Zoom,
            }
          );
          setTimeout(() => {
            navigate("/login");
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
    <>
      <Loading loading={loading} />
      <ToastContainer />
      <div className="reset-password container-fluid">
        <div className="row">
          <div data-aos="fade-down" className="center col-sm-8"></div>
          <div data-aos="fade-up" className="center-left col-sm-4">
            <h3 className="primaryColor heading1">Reset Password</h3>
            <br />
            <h5 className="heading2">Reset your password here</h5>
            <span className="para">
              Please Enter Password and Confirm Password
            </span>
            <Formik
              initialValues={{ password: "", confirmPwd: "" }}
              validationSchema={Yup.object().shape({
                password: Yup.string().min(6).required("Password is Required"),
                confirmPwd: Yup.string()
                  .min(6)
                  .required("Password is Required")
                  .oneOf([Yup.ref("password"), null], "Passwords must match"),
              })}
              onSubmit={(values) => {
                setTimeout(() => {
                  resetPassword(values);
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ paddingLeft: 0 }}>
                    <TextField
                      className="formField"
                      type={showPassword ? "text" : "password"}
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
                        errors.password && touched.password
                          ? errors.password
                          : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setPassword(!showPassword);
                              }}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      className="formField"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPwd"
                      variant="outlined"
                      error={
                        errors.confirmPwd &&
                        touched.confirmPwd &&
                        errors.confirmPwd
                          ? true
                          : false
                      }
                      fullWidth
                      label="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPwd}
                      size="small"
                      helperText={
                        errors.confirmPwd && touched.confirmPwd
                          ? errors.confirmPwd
                          : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setConfirmPassword(!showConfirmPassword);
                              }}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      className="button"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
