import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Box,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getAssosiateProfileData } from "../../../api/api";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import moment from "moment";

// register lottie and define custom element
defineLordIconElement(loadAnimation);
import "../../Users/Profile/style.scss";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await getAssosiateProfileData();
      if (response) {
        setProfileData({
          ...response.data,
          date_of_joining: moment(response.data.date_of_joining).format("MMM DD yyyy"),
          dob: moment(response.data.dob).format("MMM DD yyyy"),
        });
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
  const skeletonProfileLoader = () => {
    return (
      <div className="row">
        <div className="col-sm-9">
          <List>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <ListItem className="row">
                <div className="col-sm-3">
                  <Skeleton />
                </div>
                <div className="col-sm-5">
                  <Skeleton />
                </div>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="col-sm-3">
          <Card className="wishlist-card" elevation={8}>
            <Skeleton variant="rectangular" height={158} />
            <Skeleton />
            <Skeleton width="60%" />
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid profile">
      <h2>
        <lord-icon
          src="https://cdn.lordicon.com/dxjqoygy.json"
          trigger="loop"
          colors="primary:#121331,secondary:#d53833"
          style={{ width: 55, height: 100 }}
        ></lord-icon>
        Associates Details
      </h2>
      <div >
        <div >
          <Box>
                {loading ? (
                  skeletonProfileLoader()
                ) : (
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
                              User ID:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.id || "-"}
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
                              UserName:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.username || "-"}
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
                              Name:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.name || "-"}
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
                              Role ID:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.role_id || "-"}
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
                              Designation:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.designation || "-"}
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
                              Mobile:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                               {profileData?.phone || "-"}
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
                              Email:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.email_id}
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
                              {profileData?.dob || "-"}
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
                              Date Of Joining:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.date_of_joining || "-"}
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
                              Candidate Referal Code:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.candiate_referal_code}
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
                              Referal Code:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.referral_code}
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
                              Pan no:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.pan_card || "-"}
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
                              Bank Name :
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.bank_name || "-"}
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
                              Bank A/c No :
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.bank_account || "-"}
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
                              IFSC code:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.ifsc_code}
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
                              address:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.address}
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
                              Earnings ID:
                            </Typography>
                          </div>
                          <div className="col-sm-5">
                            <Typography
                              variant="h6"
                              color="primary"
                              component="div"
                            >
                              {profileData?.earnings_id}
                            </Typography>
                          </div>
                        </ListItem>
                      </List>
                    </div>
                  </div>
                )}
             
          </Box>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
