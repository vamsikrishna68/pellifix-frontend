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
  Fab,
  Autocomplete,
  Slider,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { ls } from "../../utils/localStorage";
import SaveIcon from "@mui/icons-material/Save";
import { Formik } from "formik";
import { getPreferenceData, updatePreferenceData } from "../../api/api";

const EditPreferences = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [states, setStates] = useState(null);

  const [formData, setFormData] = useState({
    about_me: "",
    address: "",
    age: [20, 37],
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
    height: [4.5, 6.5],
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
    time_of_birth: new Date(),
    weight: "",
    zodiac: "",
  });

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
    fetchPreferenceData();
  }, []);

  const fetchPreferenceData = async () => {
    try {
      setLoading(true);
      const response = await getPreferenceData();
      if (response && response.data) {
        setFormData({
          ...formData,
          ...response.data,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const updatePreference = async (data) => {
    try {
      const response = await updatePreferenceData(data);
      console.log(response, "response");
      if (response.status === 204) {
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        });
        fetchPreferenceData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wend wrong", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        transition: Zoom,
      });
    }
  };
  return (
    <div className="container-fluid edit-preferences">
      <div>
        <h1>Edit Preferences</h1>
        <br />
        {dropdownOptions ? (
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
              let payload = { ...formData, ...data };
              payload.height = parseFloat(payload.height);
              payload.weight = parseFloat(payload.weight);
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

              delete payload.id;
              delete payload.created_by;
              delete payload.updated_by;
              delete payload.created_at;
              delete payload.updated_at;
              delete payload.images;
              delete payload.is_membership;
              delete payload.paid_status;
              delete payload.paid_date;
              delete payload.start_date;
              delete payload.end_date;

              console.log(payload, "payload");
              updatePreference(payload);
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
                  <SaveIcon /> Save Preferences
                </Fab>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <Typography gutterBottom variant="h5" component="div">
                        Basic Preference
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
                            Age (Years):
                          </Typography>
                        </div>
                        <div
                          className="col-sm-6"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Slider
                            min={18}
                            max={60}
                            marks
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                            valueLabelDisplay="on"
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
                            Height (Feet):
                          </Typography>
                        </div>
                        <div className="col-sm-6" style={{ display: "flex" }}>
                          <Slider
                            min={4}
                            max={7}
                            marks
                            step={0.5}
                            name="height"
                            value={values.height}
                            onChange={handleChange}
                            valueLabelDisplay="on"
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
                </div>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <Typography gutterBottom variant="h5" component="div">
                        Religion Preference
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
                            Religion:
                          </Typography>
                        </div>
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
                </div>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <Typography gutterBottom variant="h5" component="div">
                        Horoscopic Preference
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
                            Nakshtram:
                          </Typography>
                        </div>
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
                            Raasi:
                          </Typography>
                        </div>
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
                    </List>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <Typography gutterBottom variant="h5" component="div">
                        Professional Preference
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
                            Occuption:
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
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <Typography gutterBottom variant="h5" component="div">
                        Location Preference
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
                            Country:
                          </Typography>
                        </div>
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
                                (obj) => values.state === obj.state_id
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
                </div>
              </form>
            )}
          </Formik>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default EditPreferences;
