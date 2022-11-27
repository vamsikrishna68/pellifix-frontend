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
import Loading from "../../ui-components/Loding/Loading";
import { ls } from "../../utils/localStorage";
import SaveIcon from "@mui/icons-material/Save";
import { Formik } from "formik";
import { getPreferenceData, updatePreferenceData } from "../../api/api";

const EditPreferences = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [states, setStates] = useState(null);

  const [formData, setFormData] = useState({
    age: [],
    annual_income: "",
    caste: "",
    country: "",
    district: "",
    dosham: "",
    drinking_habits: "",
    eating_habits: "",
    education: "",
    employed_in: "",
    height: [],
    location: "",
    looking_for: "Homely girl",
    marital_status: "",
    mother_tongue: "",
    occupation: "",
    physical_status: "",
    religion: "",
    smoking_habits: "",
    star: "",
    state: "",
    zodiac: "",
  });

  const fetchDropdownsValues = async () => {
    const data = JSON.parse(ls.getItem("dropdown_values_for_reference"));
    setDropdownOptions(data);
    fetchPreferenceData()
  };

  const fetchStates = async () => {
    const data = JSON.parse(ls.getItem("states_for_reference"));
    setStates(data);
    fetchPreferenceData()
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
          age: [response?.data?.age?.from, response?.data?.age?.to],
          height: [response?.data?.height?.from, response?.data?.height?.to],
        });
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

  const updatePreference = async (data) => {
    setLoading(true);
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
        setLoading(false);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong.",
        {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        }
      );
    }
  };
  return (
    <div
      className="container-fluid edit-preferences"
      style={{
        overflow: loading ? "hidden" : "auto",
        height: loading ? "calc(100vh - 112px)" : "auto",
      }}
    >
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
              payload.height = {
                from: payload.height[0],
                to: payload.height[1],
              };
              payload.age = { from: payload.age[0], to: payload.age[1] };
              payload.caste = payload.caste.toString();
              payload.country = payload.country.toString();
              payload.drinking_habits = payload.drinking_habits.toString();
              payload.eating_habits = payload.eating_habits.toString();
              payload.education = payload.education.toString();
              payload.marital_status = payload.marital_status.toString();
              payload.mother_tongue = payload.mother_tongue.toString();
              payload.occupation = payload.occupation.toString();
              payload.physical_status = payload.physical_status.toString();
              payload.religion = payload.religion.toString();
              payload.annual_income = payload.annual_income.toString();
              payload.smoking_habits = payload.smoking_habits.toString();
              payload.star = payload.star.toString();
              payload.zodiac = payload.zodiac.toString();
              payload.state = payload.state.toString();
              payload.district = payload.district.toString();

              delete payload.id;
              delete payload.created_by;
              delete payload.updated_by;
              delete payload.created_at;
              delete payload.updated_at;

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
                              name="smoking_habits"
                              label="Smoking Habit"
                              value={values.smoking_habits || ""}
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
                            min={120}
                            max={220}
                            marks
                            step={1}
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
                              name="eating_habits"
                              label="Eating Habit"
                              value={values.eating_habits || ""}
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
                              name="drinking_habits"
                              label="Drinking Habit"
                              value={values.drinking_habits || ""}
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
                            name="employed_in"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.employed_in}
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
                              name="annual_income"
                              label="Annual Income"
                              value={values.annual_income || ""}
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
      <Loading
        styles={{ top: 0, left: 0, right: 0, width: "100%" }}
        loading={loading}
      />
      <ToastContainer />
    </div>
  );
};
export default EditPreferences;
