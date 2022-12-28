import {
  Card,
  Divider,
  Typography,
  CardMedia,
  CardContent,
  Box,
  AppBar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileDetails } from "../../api/api";
import EditIcon from "@mui/icons-material/Edit";
import SwipeableViews from "react-swipeable-views";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { ls } from "../../utils/localStorage";

// register lottie and define custom element
defineLordIconElement(loadAnimation);
import "../Profile/style.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Profile = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [profileDetails, setProfileDetails] = useState(null);
  const [value, setValue] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    fetchDropdownsValues();
    getProfile();
  }, []);

  const fetchDropdownsValues = async () => {
    const data = JSON.parse(ls.getItem("dropdown_values_for_reference"));
    setDropdownOptions(data);
  };

  const getProfile = async () => {
    try {
      const response = await getProfileDetails(id);
      if (response) {
        setProfileDetails(response.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const profileCard = (
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={
          profileDetails?.image !== "" &&
          profileDetails?.image !== undefined &&
          profileDetails?.image !== null
            ? // process.env.REACT_APP_BASE_URL + "/" +
              profileDetails?.image
            : ""
        }
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {profileDetails?.name || "-"}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {profileDetails?.about_me || "-"}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div className="container-fluid profile">
      <h2>
        <lord-icon
          src="https://cdn.lordicon.com/dxjqoygy.json"
          trigger="loop"
          colors="primary:#121331,secondary:#d53833"
          style={{ width: 55, height: 50 }}
        ></lord-icon>
        Profile Details
      </h2>
      <div className="row">
        <div className="col">
          <Box>
            <AppBar
              style={{ background: "whitesmoke" }}
              elevation={0}
              position="static"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Personal Information" {...a11yProps(0)} />
                <Tab label="Religion Information" {...a11yProps(1)} />
                <Tab label="Horoscopic Information" {...a11yProps(2)} />
                <Tab label="Location Information" {...a11yProps(3)} />
                <Tab label="Professional Information" {...a11yProps(4)} />
                <Tab label="Family Details" {...a11yProps(5)} />
                <Tab label="Other Information" {...a11yProps(6)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Name:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.name || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Surname:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.surname || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Gender:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.GENDER.filter(
                              (x) => x.id === parseInt(profileDetails?.gender)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Date Of Birth:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.dob || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Physical Status:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.PHYSICAL_STATUS.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.physical_status)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Body Type:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.BODY_TYPES.filter(
                              (x) => x.id === parseInt(profileDetails?.body_type)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Weight (In KG):
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.weight || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Height (In CM):
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.height || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Mother Tounge:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.MOTHER_TOUNGE_LIST.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.mother_tongue)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Marital Status:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.MARITAL_STATUS.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.marital_status)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Eating Habits:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.FOOD.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.eating_habit)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Smoking Habits:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.SMOKING.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.smoking_habit)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Drinking Habits:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.DRINKING.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.drinking_habit)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Religion:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.RELIGION.filter(
                              (x) => x.id === parseInt(profileDetails?.religion)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Caste:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.CASTE.filter(
                              (x) => x.id === parseInt(profileDetails?.caste)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Nakshtram:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.STAR_LIST.filter(
                              (x) => x.id === parseInt(profileDetails?.star)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Raasi:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.ZODIAC_LIST.filter(
                              (x) => x.id === parseInt(profileDetails?.zodiac)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Time of Birth:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.time_of_birth || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Country:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.COUNTRYS.filter(
                              (x) => x.id === parseInt(profileDetails?.country)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Citizenship:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.COUNTRYS.filter(
                              (x) => x.id === parseInt(profileDetails?.citizen)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            State:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.state || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            District:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.district || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Town/City:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.city || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Higher Qualification:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.EDUCATION.filter(
                              (x) => x.id === parseInt(profileDetails?.education)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Employed In:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.employeed_in || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.OCCUPATION.filter(
                              (x) => x.id === parseInt(profileDetails?.occupation)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Annual Income:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.SALARY.filter(
                              (x) => x.id === parseInt(profileDetails?.salary)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={5} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Family Type:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.FAMILY_TYPE.filter(
                              (x) => x.id === parseInt(profileDetails?.family_type)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Family Status:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.FAMILY_STATUS.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.family_status)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Fathers Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.fathers_occupation || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Mothers Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.mothers_occupation || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Number of Brothers:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.no_of_brothers || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Number of Brothers Married:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.no_of_brothers_married || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Number of Sisters:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.no_of_sisters || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Number of Sisters Married:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.no_of_sisters_married || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={6} dir={theme.direction}>
                <div className="row">
                  <div className="col-sm-9">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Hobbies:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.hobbies || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-3">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                          >
                            Interests:
                          </Typography>
                        </div>
                        <div className="col-sm-5">
                          <Typography
                            variant="h6"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.interests || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-3">{profileCard}</div>
                </div>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
