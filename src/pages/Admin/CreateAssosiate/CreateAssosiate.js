import "../../Users/EditProfile/style.scss";
import {
    TextField,
    FormControl,
    Typography,
    List,
    ListItem,
    Button
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { createAssosiate } from "../../../api/api";
import Loading from "../../../ui-components/Loding/Loading";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import './style.scss'


export const CreateAssosiate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [notaValidPhoneNumber, setNotaValidPhoneNumber] = useState('')

    const [formData, setFormData] = useState({
        "username": "",
        "name": "",
        "dob": null,
        "email_id": "",
        "phone": "",
        "date_of_joining": new Date(),
        "address": "",
        "candiate_referal_code": "",
        // "designation": "",
        "edit_access": false,
        "payment_permission": false,
        "pan_card": "",
        "bank_account": "",
        "ifsc_code": "",
        "bank_name": "",
        "referral_code": ""
    });

    useEffect(() => {
    }, []);

    const createProfile = async (data) => {
        try {
            setLoading(true);
            delete data.images;
            const response = await createAssosiate(data);
            console.log(response, "response");
            setLoading(false);
            if (response.status === 200) {
                toast.success("Profile Created successfully", {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "colored",
                    transition: Zoom,
                });
                setTimeout(() => {
                      navigate("/auth/admin/dashboard");
                  }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.error?.message || "Something wend wrong",
                {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "colored",
                    transition: Zoom,
                }
            );
            setLoading(false);
        }
    };
    const handlePhoneChange = (newValue) => {
        if (newValue.replaceAll(" ", "").length <= 13) {
            setPhoneNumber(newValue);
        }
    }

    return (
        <div
            className="container-fluid edit-profile"
            style={{
                overflow: loading ? "hidden" : "auto",
                height: loading ? "calc(100vh - 112px)" : "auto",
            }}
        >
            <div>
                <h1>Create Associate</h1>
                <br />
                {(
                    <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        validate={(values) => {
                            const errors = {};
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const data = { ...values };
                            console.log(data, formData, "data");
                            Object.keys(data).forEach((e) => {
                                if(e =="dob"){

                                }
                                else if (data[e] == null) {
                                    data[e] = "";
                                }
                            });
                            let payload = { ...formData, ...data };

                            payload.username = payload.username.toString();
                            payload.name = payload.name.toString();
                            payload.email_id = payload.email_id.toString();
                            if (!matchIsValidTel(phoneNumber)) {
                                setNotaValidPhoneNumber(true);
                                return
                            }
                            setNotaValidPhoneNumber(false);
                            payload.phone = phoneNumber.replaceAll(" ", "");
                            payload.address = payload.address.toString();
                            payload.candiate_referal_code = payload.candiate_referal_code.toString();
                            // payload.designation = payload.designation.toString();
                            payload.edit_access = payload.edit_access;
                            payload.payment_permission = payload.payment_permission;
                            payload.pan_card = payload.pan_card.toString();
                            payload.bank_account = payload.bank_account.toString();
                            payload.ifsc_code = payload.ifsc_code.toString();
                            payload.bank_name = payload.bank_name.toString();
                            payload.referral_code = payload.referral_code.toString();


                            // delete payload.id;
                            // delete payload.created_by;
                            // delete payload.updated_by;
                            // delete payload.created_at;
                            // delete payload.updated_at;
                            // delete payload.is_membership;
                            // delete payload.paid_status;
                            // delete payload.paid_date;
                            // delete payload.start_date;
                            // delete payload.end_date;
                            // delete payload.role_id;
                            // delete payload.forget_hash;
                            // delete payload.earnings;
                            // delete payload.earnings_id;

                            console.log(payload, "payload");
                            createProfile(payload);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <List>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        User Name:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        name="username"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.username}
                                                        size="small"
                                                        fullWidth
                                                        label="User name"
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Name:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        name="name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.name}
                                                        size="small"
                                                        fullWidth
                                                        label="Name"
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Email:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        name="email_id"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email_id}
                                                        size="small"
                                                        fullWidth
                                                        label="Email"
                                                        type="email"
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            {/* <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Designation:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        name="designation"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.designation}
                                                        size="small"
                                                        fullWidth
                                                        label="Designation"
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem> */}
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Mobile:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormControl size="small" fullWidth>
                                                        <MuiTelInput
                                                            size="small"
                                                            variant="outlined"
                                                            value={phoneNumber}
                                                            forceCallingCode={true}
                                                            defaultCountry="IN"
                                                            disableDropdown={true}
                                                            onChange={handlePhoneChange}
                                                            label="Mobile Numer"
                                                            error={notaValidPhoneNumber}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Date Of Birth:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            name="dob"
                                                            label="Date Of Birth"
                                                            value={values.dob}
                                                            onChange={(value) =>
                                                                setFieldValue("dob", value, true)
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    name="dob"
                                                                    size="small"
                                                                    fullWidth
                                                                    {...params}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Date Of Joining:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            name="date_of_joining"
                                                            label="date of joining"
                                                            value={values.date_of_joining}
                                                            onChange={(value) =>
                                                                setFieldValue("date_of_joining", value, true)
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    name="date_of_joining"
                                                                    size="small"
                                                                    fullWidth
                                                                    {...params}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Candidate Referral Code:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        size="small"
                                                        name="candiate_referal_code"
                                                        value={values.candiate_referal_code || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth
                                                        label="candidate Referral code"
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>


                                        </List>
                                    </div>
                                    <div className="col-sm-6">
                                        <List>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Referral Code:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        size="small"
                                                        name="referral_code"
                                                        value={values.referral_code || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth
                                                        label="Referral Code "
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Pan No:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        size="small"
                                                        name="pan_card"
                                                        value={values.pan_card || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth
                                                        label="Pan No "
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Bank Name:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        size="small"
                                                        name="bank_name"
                                                        value={values.bank_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth
                                                        label="Bank name "
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Account Number:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        size="small"
                                                        name="bank_account"
                                                        value={values.bank_account || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth
                                                        label="Account Number"
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        IFSC Code:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <TextField
                                                        size="small"
                                                        name="ifsc_code"
                                                        value={values.ifsc_code || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        fullWidth
                                                        label="IFSC Code "
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Edit Access
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control=
                                                            {<Checkbox
                                                                checked={values.edit_access}
                                                                name="edit_access"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />}
                                                            value={false} />
                                                    </FormGroup>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-4">
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Payment Permission:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control=
                                                            {<Checkbox
                                                                checked={values.payment_permission}
                                                                name="payment_permission"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />}
                                                            value={false} />
                                                    </FormGroup>
                                                </div>
                                            </ListItem>
                                        </List>
                                    </div>
                                    <div className="col-sm-6">
                                        <List>
                                    <ListItem className="row">
                                                <div className="col-sm-6">
                                                    <Button
                                                        style={{ marginTop: 0 , width : "100%"}}
                                                        className="button"
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Create Profile
                                                    </Button>
                                                </div>
                                            </ListItem>
                                            </List>
                                    </div>
                                </div>
                                <br />
                            </form>
                        )}
                    </Formik>
                )}
            </div>
            <Loading
                styles={{ top: 0, left: 0, right: 0, width: "100%" }}
                loading={loading}
            />
            <ToastContainer />
        </div>
    );
};
