import React, { useState, useEffect } from "react";
import { getViewedProfile, sendWishList } from "../../../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  ButtonBase,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import "./ViewedProfile.scss";
import { useNavigate } from "react-router-dom";
import Loading from "../../../ui-components/Loding/Loading";

const ViewedProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [viewedProfile, setViewedProfile] = useState([]);

  useEffect(() => {
    fetchViewedProfile();
  }, []);

  const fetchViewedProfile = async () => {
    try {
      const response = await getViewedProfile();
      if (response && response.data) {
        setViewedProfile(response.data);
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
  const shortListProfile = (id, is_liked) => {
    setLoading(true);
    let data = {
      is_liked: is_liked,
      short_id: Number(id),
    };
    handleUpdateWishlist(data, is_liked);
  };

  const handleUpdateWishlist = async (data, is_liked) => {
    try {
      const response = await sendWishList(data);
      let message = "";
      if (response && response.data) {
        if (is_liked) {
          message = "Profile is shortlisted successfully";
        } else {
          message = "Profile is removed successfully";
        }
        toast.success(response.message || message, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        });
        fetchViewedProfile();
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Zoom,
      });
      setLoading(false);
    }
  };

  const skeletonLoader = () => {
    return [1, 2, 3, 4].map((n) => (
      <Grid item xs={12} sm={6} md={3} key={n}>
        <Card
          className="viewed-profile-card"
          elevation={1}
          sx={{ maxWidth: 345 }}
        >
          <Skeleton variant="rectangular" height={158} />
          <Skeleton />
          <Skeleton width="60%" />
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      <Box className="viewed-profile">
        <Typography gutterBottom variant="h4" component="h2">
          Viewed profile
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {loading ? (
            skeletonLoader()
          ) : viewedProfile?.data?.length ? (
            viewedProfile.data.map((d, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  className="viewed-profile-card"
                  elevation={1}
                  sx={{ maxWidth: 345 }}
                >
                  <ButtonBase
                    className="viewed-profile-btn"
                    onClick={() => navigate(`/auth/viewed-profile/${d.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={d.image}
                      alt="Paella dish"
                    />
                    <CardHeader
                      action={
                        <IconButton
                          aria-label="settings"
                          onMouseDown={(event) => event.stopPropagation()}
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            console.log("Button clicked");
                          }}
                        >
                          <FavoriteIcon
                            style={{
                              color: d.is_liked
                                ? "#D53833"
                                : "rgba(0, 0, 0, 0.54)",
                            }}
                            onClick={() => shortListProfile(d.id, !d.is_liked)}
                          />
                        </IconButton>
                      }
                      title={d.name}
                      titleTypographyProps={{ variant: "subtitle1" }}
                    />
                    <CardHeader
                      subheader={
                        d.age + " yrs" + " " + d.education + " " + d.city
                      }
                      subheaderTypographyProps={{ variant: "subtitle2" }}
                    />
                  </ButtonBase>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              component="p"
              className="viewed-profile-no-record"
            >
              No records found.
            </Typography>
          )}
        </Grid>
      </Box>
      <Loading
        styles={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
        }}
        loading={loading}
      />
      <ToastContainer />
    </>
  );
};

export default ViewedProfile;
