import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileDetails } from "../../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Carousel from "react-multi-carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  ButtonBase,
  Grid,
  Box,
  Skeleton,CardActionArea,
} from "@mui/material";
import "./ProfileDetails.scss";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState([]);

  useEffect(() => {
    fetchprofileDetails();
  }, []);

  const fetchprofileDetails = async () => {
    try {
      const response = await getProfileDetails(id);
      if (response && response.data) {
        setProfileDetails(response.data);
        setLoading(false);
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

  return (
    <Box className="profile-detail">
      {loading ? (
        ""
      ) : (
        <Card sx={{ display: "flex" }}>
        {/* {profileDetails?.name}
        {profileDetails?.created_by}
        {profileDetails?.age}
        {profileDetails?.height}
        {profileDetails?.id}
        {profileDetails?.id}
        {profileDetails?.id} */}
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={6} md={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={profileDetails?.image}
                  alt="Profile"
                />
              </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Mac Miller
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton
                    aria-label="settings"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      console.log("Button clicked");
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
    </Box>
  );
};

export default ProfileDetails;
