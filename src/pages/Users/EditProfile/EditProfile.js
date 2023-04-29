import "./style.scss";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  Typography,
  List,
  ListItem,
  MenuItem,
  InputAdornment,
  Card,
  Button,
  Fab,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { isValid } from 'date-fns';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import SaveIcon from "@mui/icons-material/Save";
import { Formik } from "formik";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { getProfileData, updateProfileData, uploadImages } from "../../../api/api";
import Loading from "../../../ui-components/Loding/Loading";
import { ToastContainer, toast, Zoom } from "react-toastify";
import DropZone from "./DropZone";
import ImageGrid from "./ImageGrid";
import { ls } from "../../../utils/localStorage";

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [states, setStates] = useState(null);
  const [enableSaveButton, setEnableSaveButton] = useState(false);

  const [formData, setFormData] = useState({
    about_me: "",
    address: "",
    age: "",
    body_type: "",
    caste: "",
    citizen: "",
    city: "",
    country: "",
    dob: new Date(),
    drinking_habit: "",
    eating_habit: "",
    education: "",
    email_id: "",
    employeed_in: "",
    end_date: new Date(),
    family_status: "",
    family_type: "",
    fathers_occupation: "",
    gender: "",
    height: "",
    hobbies: "",
    interests: "",
    marital_status: "",
    mobileno: "",
    mother_tongue: "",
    mothers_occupation: "",
    name: "",
    no_of_brothers: "",
    no_of_brothers_married: "",
    no_of_sisters: "",
    no_of_sisters_married: "",
    occupation: "",
    physical_status: "",
    pincode: "",
    profession: "",
    profile_creater: "",
    profile_id: "",
    referral_code: "",
    religion: "",
    require_details: "",
    salary: "",
    smoking_habit: "",
    star: "",
    start_date: new Date(),
    state: "",
    sub_caste: "",
    surname: "",
    time_of_birth:  "",
    weight: "",
    zodiac: "",
  });

  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      let formData = new FormData();
      formData.append("images", file, file.name);
      reader.onload = function (e) {
        setImages((prevState) => [...prevState, e.target.result]);
      };
      reader.readAsDataURL(file);
      uploadImage(formData);
      return file;
    });
  }, []);

  const removeFile = (file) => () => {
    setEnableSaveButton(true);
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(file), 1);
    setImages(newFiles);
  };

  const uploadImage = async (formData) => {
    try {
      setLoading(true);
      const response = await uploadImages(formData);
      if (response && response.status == 200) {
        setLoading(false);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
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

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const fetchDropdownsValues = async () => {
    const data = JSON.parse(ls.getItem("dropdown_values_for_reference"));
    setDropdownOptions(data);
  };

  const fetchStates = async () => {
    const data = JSON.parse(ls.getItem("states_for_reference"));
    setStates(data);
  };

  useEffect(() => {
    fetchDropdownsValues();
    fetchStates();
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await getProfileData();
      if (response && response.data) {
        setFormData({
          ...formData,
          ...response.data,
          time_of_birth:response.data.time_of_birth==""?"":response.data.time_of_birth
        });
        setImages(response.data.images);
        setLoading(false);
        setEnableSaveButton(false);
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
      const response = await updateProfileData(data);
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

  return (
    <div
      className="container-fluid edit-profile"
      style={{
        overflow: loading ? "hidden" : "auto",
        height: loading ? "calc(100vh - 112px)" : "auto",
      }}
    >
      <div>
        <h1>Edit Profile</h1>
        <br />
        {dropdownOptions ? (
          <Formik
            enableReinitialize={true}
            initialValues={formData}
            validate={(values,initialValues) => {
              // if(JSON.stringify(values) === JSON.stringify(formData)){
              // setEnableSaveButton(false);
              // }
              // else {
              setEnableSaveButton(true);
              // }
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
              let payload = { ...formData, ...data };
              payload.height = payload.height ? parseFloat(payload.height) : 0;
              payload.weight = payload.weight ? parseFloat(payload.weight) : 0;
              payload.no_of_sisters_married = parseFloat(
                payload.no_of_sisters_married
                  ? payload.no_of_sisters_married
                  : 0
              );
              payload.no_of_brothers_married = parseFloat(
                payload.no_of_brothers_married
                  ? payload.no_of_brothers_married
                  : 0
              );
              payload.no_of_brothers = parseFloat(
                payload.no_of_brothers ? payload.no_of_brothers : 0
              );
              payload.no_of_sisters = parseFloat(
                payload.no_of_sisters ? payload.no_of_sisters : 0
              );
              payload.gender = payload.gender.toString();
              payload.body_type = payload.body_type.toString();
              payload.caste = payload.caste.toString();
              payload.citizen = payload.citizen.toString();
              payload.country = payload.country.toString();
              payload.drinking_habit = payload.drinking_habit.toString();
              payload.eating_habit = payload.eating_habit.toString();
              payload.education = payload.education.toString();
              payload.family_status = payload.family_status.toString();
              payload.family_type = payload.family_type.toString();
              payload.marital_status = payload.marital_status.toString();
              payload.mother_tongue = payload.mother_tongue.toString();
              payload.occupation = payload.occupation.toString();
              payload.physical_status = payload.physical_status.toString();
              payload.profession = payload.profession.toString();
              payload.profile_creater = payload.profile_creater.toString();
              payload.religion = payload.religion.toString();
              payload.salary = payload.salary.toString();
              payload.smoking_habit = payload.smoking_habit.toString();
              payload.star = payload.star.toString();
              payload.zodiac = payload.zodiac.toString();
              payload.state = payload.state.toString();
              payload.district = payload.district.toString();
              payload.images = images;

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

              console.log(payload, "payload");
              // if(isValid(payload.time_of_birth) || payload.time_of_birth == ""){
              //   payload.time_of_birth=payload.time_of_birth== ""? "" :payload.time_of_birth
              //   updateProfile(payload);

              // }else{
              //   toast.error(
              //      "Time of birth format is not correct",
              //     {
              //       position: "top-right",
              //       autoClose: 1500,
              //       theme: "colored",
              //       transition: Zoom,
              //     }
              //   );
              // }
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
                  disabled={!enableSaveButton}
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
                            Gender:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                              name="gender"
                              value={values.gender || ""}
                              label="Gender"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.GENDER.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Physical Status:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Physical Status</InputLabel>
                            <Select
                              name="physical_status"
                              label="Physical Status"
                              value={values.physical_status || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.PHYSICAL_STATUS.map(
                                (option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                )
                              )}
                            </Select>
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
                            Height (In CM):
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment name="height" position="start">
                                  cms
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                            fullWidth
                            name="height"
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Height"
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
                            Marital Status:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel> Marital Status</InputLabel>
                            <Select
                              name="marital_status"
                              label="Marital Status"
                              value={values.marital_status || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.MARITAL_STATUS.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Smoking Habit:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel> Smoking Habit</InputLabel>
                            <Select
                              name="smoking_habit"
                              label="Smoking Habit"
                              value={values.smoking_habit || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.SMOKING.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Drinking Habit:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel> Drinking Habit</InputLabel>
                            <Select
                              name="drinking_habit"
                              label="Drinking Habit"
                              value={values.drinking_habit || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.DRINKING.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                            Surname:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            size="small"
                            name="surname"
                            value={values.surname || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            label="Surname"
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
                            Body Type:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel> Body Type</InputLabel>
                            <Select
                              name="body_type"
                              label="Body Type"
                              value={values.body_type || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.BODY_TYPES.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Weight (In KG):
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  kgs
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                            fullWidth
                            name="weight"
                            value={values.weight || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Weight"
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
                            Mother Tounge:
                          </Typography>
                        </div>
                        {/* <div className="col-sm-6">
                          <Autocomplete
                            disablePortal
                            id="mother_tongue"
                            name="mother_tongue"
                            options={
                              dropdownOptions?.MOTHER_TOUNGE_LIST
                                ? dropdownOptions?.MOTHER_TOUNGE_LIST
                                : []
                            }
                            value={values.mother_tongue}
                            size="small"
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            fullWidth
                            onChange={(e, v) => {
                              setFieldValue("mother_tongue", v.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="mother_tongue"
                                label="Language"
                              />
                            )}
                          />
                        </div> */}
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Language</InputLabel>
                            <Select
                              name="mother_tongue"
                              label="Language"
                              value={values.mother_tongue || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.MOTHER_TOUNGE_LIST.map(
                                (option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                )
                              )}
                            </Select>
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
                            Eating Habit:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel> Eating Habit</InputLabel>
                            <Select
                              name="eating_habit"
                              label="Eating Habit"
                              value={values.eating_habit || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.FOOD.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-12">
                        <Typography gutterBottom variant="h5" component="div">
                          Religion Information
                        </Typography>
                      </div>
                    </div>
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-4">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Religion:
                          </Typography>
                        </div>
                        {/* <div className="col-sm-6">
                          <Autocomplete
                            disablePortal
                            id="religion"
                            name="religion"
                            options={
                              dropdownOptions?.RELIGION
                                ? dropdownOptions?.RELIGION
                                : []
                            }
                            value={values.religion}
                            size="small"
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            fullWidth
                            onChange={(e, v) => {
                              setFieldValue("religion", v.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="religion"
                                label="Religion"
                              />
                            )}
                          />
                        </div> */}
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Religion</InputLabel>
                            <Select
                              name="religion"
                              label="Religion"
                              value={values.religion || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.RELIGION.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Caste:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Caste</InputLabel>
                            <Select
                              name="caste"
                              label="Caste"
                              value={values.caste || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.CASTE.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-12">
                        <Typography gutterBottom variant="h5" component="div">
                          Horoscopic Information
                        </Typography>
                      </div>
                    </div>
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-4">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Nakshtram:
                          </Typography>
                        </div>
                        {/* <div className="col-sm-6">
                          <Autocomplete
                            disablePortal
                            id="star"
                            name="star"
                            options={
                              dropdownOptions?.STAR_LIST
                                ? dropdownOptions?.STAR_LIST
                                : []
                            }
                            size="small"
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            fullWidth
                            onChange={(e, v) => {
                              setFieldValue("star", v.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="star"
                                label="Nakshtram"
                              />
                            )}
                          />
                        </div> */}
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Nakshtram</InputLabel>
                            <Select
                              name="star"
                              label="Nakshtram"
                              value={values.star || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.STAR_LIST.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Raasi:
                          </Typography>
                        </div>
                        {/* <div className="col-sm-6">
                          <Autocomplete
                            disablePortal
                            id="zodiac"
                            name="zodiac"
                            options={
                              dropdownOptions?.ZODIAC_LIST
                                ? dropdownOptions?.ZODIAC_LIST
                                : []
                            }
                            size="small"
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            fullWidth
                            onChange={(e, v) => {
                              setFieldValue("zodiac", v.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="zodiac"
                                label="Raasi"
                              />
                            )}
                          />
                        </div> */}
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Raasi</InputLabel>
                            <Select
                              name="zodiac"
                              label="Raasi"
                              value={values.zodiac || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.ZODIAC_LIST.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Time of Birth:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Time of Birth"
                              onChange={(value) =>
                                setFieldValue("time_of_birth", value, true)
                              }
                              value={values.time_of_birth== "" ? null : values.time_of_birth}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  name="time_of_birth"
                                  fullWidth
                                  {...params}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-12">
                        <Typography gutterBottom variant="h5" component="div">
                          Location Information
                        </Typography>
                      </div>
                    </div>
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-4">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Country:
                          </Typography>
                        </div>
                        {/* <div className="col-sm-6">
                          <Autocomplete
                            disablePortal
                            id="countries"
                            name="countries"
                            options={
                              dropdownOptions?.COUNTRYS
                                ? dropdownOptions?.COUNTRYS
                                : []
                            }
                            size="small"
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            fullWidth
                            onChange={(e, v) => {
                              setFieldValue("countries", v.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="countries"
                                label="Country"
                              />
                            )}
                          />
                        </div>                        */}
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Country</InputLabel>
                            <Select
                              name="country"
                              label="Country"
                              value={values.country || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.COUNTRYS.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Citizenship:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Citizenship</InputLabel>
                            <Select
                              name="citizen"
                              label="Citizenship"
                              value={values.citizen || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.COUNTRYS.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            State:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>State</InputLabel>
                            <Select
                              name="state"
                              label="State"
                              value={values.state || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {states?.STATES.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            District:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>District</InputLabel>
                            <Select
                              name="district"
                              label="District"
                              value={values.district || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {states?.DISTRICTS.filter(
                                (obj) => values.state == obj.state_id
                              ).map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Town/City:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            size="small"
                            fullWidth
                            label="Town/City"
                            variant="outlined"
                          />
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-12">
                        <Typography gutterBottom variant="h5" component="div">
                          Professional Information
                        </Typography>
                      </div>
                    </div>
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-4">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Higher Qualification:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Higher Qualification</InputLabel>
                            <Select
                              name="education"
                              label="Higher Qualification"
                              value={values.education || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.EDUCATION.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Employed In:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="employeed_in"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.employeed_in}
                            size="small"
                            fullWidth
                            label="Employed In"
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
                            Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Occupation</InputLabel>
                            <Select
                              name="occupation"
                              label="Occuption"
                              value={values.occupation || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.OCCUPATION.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Annual Income:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Annual Income</InputLabel>
                            <Select
                              name="salary"
                              label="Annual Income"
                              value={values.salary || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.SALARY.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12">
                    <Typography gutterBottom variant="h5" component="div">
                      Family Information
                    </Typography>
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
                            Family Type:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Family Type</InputLabel>
                            <Select
                              name="family_type"
                              label="Family Type"
                              value={values.family_type || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.FAMILY_TYPE.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Fathers Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="fathers_occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fathers_occupation}
                            size="small"
                            fullWidth
                            label="Fathers Occupation"
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
                            Number of Brothers:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="no_of_brothers"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.no_of_brothers}
                            size="small"
                            fullWidth
                            label="Number of Brothers"
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
                            Number of Brothers Married:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="no_of_brothers_married"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.no_of_brothers_married}
                            size="small"
                            fullWidth
                            label="Number of Brothers Married"
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
                            Family Status:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <FormControl size="small" fullWidth>
                            <InputLabel>Family Status</InputLabel>
                            <Select
                              name="family_status"
                              label="Family Status"
                              value={values.family_status || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {dropdownOptions?.FAMILY_STATUS.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            Mothers Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="mothers_occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mothers_occupation}
                            size="small"
                            fullWidth
                            label="Mothers Occupation"
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
                            Number of Sisters:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="no_of_sisters"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.no_of_sisters || ""}
                            size="small"
                            fullWidth
                            label="Number of Sisters"
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
                            Number of Sisters Married:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="no_of_sisters_married"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.no_of_sisters_married || ""}
                            size="small"
                            fullWidth
                            label="Number of Sisters Married"
                            variant="outlined"
                          />
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12">
                    <Typography gutterBottom variant="h5" component="div">
                      Other Information
                    </Typography>
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
                            Hobbies:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="hobbies"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.hobbies}
                            fullWidth
                            label="Hobbies"
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
                            Interests:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            name="interests"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.interests}
                            fullWidth
                            label="Interests"
                            variant="outlined"
                          />
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12">
                    <Typography gutterBottom variant="h5" component="div">
                      About Me
                    </Typography>
                  </div>
                  <div className="col-sm-12">
                    <TextField
                      name="about_me"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="small"
                      fullWidth
                      rows={4}
                      value={values.about_me}
                      label="About me"
                      placeholder="Describe yourself"
                      multiline
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12">
                    <Typography gutterBottom variant="h5" component="div">
                      Images
                    </Typography>
                  </div>
                  <div className="col-sm-12">
                    {images.length < 5 ? (
                      <DropZone onDrop={onDrop} accept={"image/*"} />
                    ) : (
                      ""
                    )}
                    <ImageGrid images={images} removeFile={removeFile} />
                  </div>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          ""
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
export default EditProfile;
