import "./style.scss";
import {
  TextField,
  FormControl,
  Typography,
  List,
  ListItem,
  Fab,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SaveIcon from "@mui/icons-material/Save";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { getAssosiateProfileData, updateAssosiateProfileData } from "../../api/api";
import Loading from "../../ui-components/Loding/Loading";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { MuiTelInput ,matchIsValidTel} from 'mui-tel-input'


export const EditAssosiateProfile = () => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [notaValidPhoneNumber, setNotaValidPhoneNumber] = useState('')

  const [formData, setFormData] = useState({
    "username": "",
    "name": "",
    "dob": new Date(),
    "email_id": "",
    "phone": "",
    "date_of_joining": new Date(),
    "address": "",
    "candiate_referal_code": "",
    "designation": "",
    "edit_access": false,
    "payment_permission": false,
    "pan_card": "",
    "bank_account": "",
    "ifsc_code": "",
    "bank_name": "",
    "referral_code": ""
});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await getAssosiateProfileData();
      if (response && response.data) {
        setFormData({
          ...formData,
          ...response.data,
        });
        setPhoneNumber(response.data.phone);
        setLoading(false);
      }
    } catch (error) {
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

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      delete data.images;
      const response = await updateAssosiateProfileData(data);
      console.log(response, "response");
      if (response.status === 204) {
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        });
        fetchProfileData();
        setLoading(false);
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
  const handlePhoneChange= (newValue)=>{
    if(newValue.replaceAll(" ", "").length<=13){
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
        <h1>Edit Associate Profile</h1>
        <br />
        { (
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
                if (data[e] == null) {
                  data[e] = "";
                }
              });
              debugger
              let payload = { ...formData, ...data };
             
              payload.username = payload.username.toString();
              payload.name = payload.name.toString();
              payload.email_id = payload.email_id.toString();
              if( !matchIsValidTel(phoneNumber)){
                setNotaValidPhoneNumber(true);
                return
              }
              setNotaValidPhoneNumber(false);
              payload.phone = phoneNumber.replaceAll(" ", "");
              payload.address = payload.address.toString();
              payload.candiate_referal_code = payload.candiate_referal_code.toString();
              payload.designation = payload.designation.toString();
              payload.edit_access = false;
              payload.payment_permission = false;
              payload.earnings_id = payload.earnings_id.toString();
              payload.pan_card = payload.pan_card.toString();
              payload.bank_account = payload.bank_account.toString();
              payload.ifsc_code = payload.ifsc_code.toString();
              payload.bank_name = payload.bank_name.toString();
              payload.referral_code = payload.referral_code.toString();
             

              delete payload.id;
              delete payload.created_by;
              delete payload.updated_by;
              delete payload.created_at;
              delete payload.updated_at;
              delete payload.is_membership;
              delete payload.paid_status;
              delete payload.paid_date;
              delete payload.start_date;
              delete payload.end_date;
              delete payload.role_id;
              delete payload.forget_hash;
              delete payload.earnings;
              delete payload.earnings_id;

              console.log(payload, "payload");
              updateProfile(payload);
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
                <Fab
                  type="submit"
                  className="save_btn"
                  variant="extended"
                  color="primary"
                >
                  <SaveIcon /> Save Changes
                </Fab>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <Typography gutterBottom variant="h5" component="div">
                        Personal Information
                      </Typography>
                    </div>
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
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                   
                    </List>
                  </div>
                </div>
                <br />
              </form>
            )}
          </Formik>
        )  }
      </div>
      <Loading
        styles={{ top: 0, left: 0, right: 0, width: "100%" }}
        loading={loading}
      />
      <ToastContainer />
    </div>
  );
};
