import {
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  Typography,
  Grid,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileDetails } from "../../api/api";
import { ls } from "../../utils/localStorage";
import "./style.scss";

const ViewProfile = () => {
  const { id } = useParams();
  const [profileDetails, setProfileDetails] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error?.message
          ? error.message
          : error?.response?.data?.error?.message || "Something went wrong",
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

  const skeletonLoader = () => {
    return (
      <Card className="wishlist-card" elevation={8}>
        <Skeleton variant="rectangular" height={158} />
        <Skeleton />
        <Skeleton width="60%" />
      </Card>
    );
  };

  const skeletonProfileLoader = () => {
    return (
      <Card className="wishlist-card" elevation={8}>
        <CardContent>
          <div className="row">
            <div className="row">
              <div className="col-sm-12">
                <Skeleton width="50%" />
              </div>
            </div>
            <div className="col-sm-6">
              <List>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <ListItem className="row">
                    <div className="col-sm-6">
                      <Skeleton />
                    </div>
                    <div className="col-sm-6">
                      <Skeleton />
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="col-sm-6">
              <List>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <ListItem className="row">
                    <div className="col-sm-6">
                      <Skeleton />
                    </div>
                    <div className="col-sm-6">
                      <Skeleton />
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container-fluid view_profile">
      <div className="vp-flex">
        <div className="profile_image">
          <div className="profile_basic_details">
            <h1>Profile</h1>
            {loading ? (
              skeletonLoader()
            ) : (
              <Card elevation={8}>
                <CardMedia
                  component="img"
                  height="250"
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
                    {profileDetails?.about || "-"}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <div className="profile_details">
          {loading ? (
            skeletonProfileLoader()
          ) : (
            <Card elevation={8}>
              <CardContent>
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Name:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.name || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Gender:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Physical Status:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.PHYSICAL_STATUS.filter(
                              (x) =>
                                x.id ===
                                parseInt(profileDetails?.physical_status)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Height (In CM):
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.height || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Marital Status:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.MARITAL_STATUS.filter(
                              (x) =>
                                x.id ===
                                parseInt(profileDetails?.marital_status)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Smoking Habits:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Drinking Habits:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.DRINKING.filter(
                              (x) =>
                                x.id ===
                                parseInt(profileDetails?.drinking_habit)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-6">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Surname:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.surname || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Date Of Birth:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.dob || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Body Type:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.BODY_TYPES.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.body_type)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Weight (In KG):
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.weight || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Mother Tounge:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Eating Habits:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Religion:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Caste:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Nakshtram:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Raasi:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Time of Birth:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.time_of_birth || "-"}
                          </Typography>
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Town/City:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.city || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            District:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.district || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            State:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.state || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Country:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Citizenship:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.COUNTRYS.filter(
                              (x) => x.id === parseInt(profileDetails?.citizen)
                            ).map((x) => x.name)}
                          </Typography>
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Higher Qualification:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.EDUCATION.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.education)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Employed In:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.employeed_in || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.OCCUPATION.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.occupation)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Country:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Annual Income:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Family Type:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {dropdownOptions?.FAMILY_TYPE.filter(
                              (x) =>
                                x.id === parseInt(profileDetails?.family_type)
                            ).map((x) => x.name)}
                          </Typography>
                        </div>
                      </ListItem>

                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Fathers Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.fathers_occupation || "-"}
                          </Typography>
                        </div>
                      </ListItem>

                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Number of Brothers:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.no_of_brothers || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-6">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Family Status:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Mothers Occupation:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.mothers_occupation || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Number of Sisters:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.no_of_sisters || "-"}
                          </Typography>
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
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Hobbies:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.hobbies || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                  <div className="col-sm-6">
                    <List>
                      <ListItem className="row">
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Interest:
                          </Typography>
                        </div>
                        <div className="col-sm-6">
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
                            {profileDetails?.interests || "-"}
                          </Typography>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12">
                    <Typography gutterBottom variant="h5" component="div">
                      Other Images
                    </Typography>
                  </div>
                  <div className="row other_images">
                    {profileDetails?.images.length &&
                      profileDetails?.images.map((img, i) => (
                        <div className="col-sm-6">
                          <Card style={{ marginBottom: "1rem" }} elevation={6}>
                            <CardMedia
                              component="img"
                              height="300"
                              image={
                                img !== "" && img !== undefined && img !== null
                                  ? // process.env.REACT_APP_BASE_URL + "/" +
                                    img
                                  : ""
                              }
                              alt="green iguana"
                            />
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
export default ViewProfile;
