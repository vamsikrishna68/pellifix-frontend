import { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Loading from "../../ui-components/Loding/Loading";
import axios from "axios";
import AOS from 'aos';
import './style.scss'
import "aos/dist/aos.css";

const ForgotPassword = () => {
    const [emailId, setEmailId] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: false,
            mirror: true
        });
    })

    const checkEmailValid = () => {
        let emailPattern = new RegExp(/^[a-zA-Z0-9_]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)
        return !emailId || !emailPattern.test(emailId)
    }

    const forgotPassword = () => {
        setLoading(true);
        axios
            .post("https://api.pellifix.com/v1/customer/password/reset", { email_id: emailId })
            .then((response) => {
                console.log(response);
                if (response && response.status == 200) {
                    setLoading(false);
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 1500,
                        theme: "colored",
                        transition: Zoom,
                    });

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
            <div className="forgot-password container-fluid">
                <div className="row">
                    <div data-aos="fade-down" className="center  col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    </div>
                    <div data-aos="fade-up" className="center-left col-xs-12 col-sm-12 col-md-4 col-lg-4">

                        <h3 className="primaryColor heading1">Forgot Password</h3>
                        <br />
                        <h5 className="heading2">Forgot your password? No Worry!</h5>
                        <span className="para">
                            Enter your Email ID and we will send a link to your mail to reset your password!
                        </span>
                        <TextField
                            className="formField"
                            name="email_id"
                            fullWidth
                            label="Email"
                            variant="outlined"
                            size="small"
                            onChange={(e) => setEmailId(e.target.value)}

                        />
                        <Button
                            className="button"
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={checkEmailValid()}
                            onClick={() => forgotPassword()}
                        >
                            Send Mail
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword