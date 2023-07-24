import React, { useState, useEffect } from "react";
import { getWishList } from "../../../api/api";
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
import "./WishList.scss";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    fetchWishList();
  }, []);

  const fetchWishList = async () => {
    try {
      const response = await getWishList();
      if (response && response.data) {
        debugger;
        setWishList(response.data);
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
    return [1, 2, 3, 4].map((n) => (
      <Grid item xs={12} sm={6} md={3} key={n}>
        <Card className="wishlist-card" elevation={1} sx={{ maxWidth: 345 }}>
          <Skeleton variant="rectangular" height={158} />
          <Skeleton />
          <Skeleton width="60%" />
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      <Box className="wishlist">
        <Typography gutterBottom variant="h4" component="h2">
          Wishlist
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
          ) : wishlist?.data?.length ? (
            wishlist.data.map((d, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  className="wishlist-card"
                  elevation={1}
                  sx={{ maxWidth: 345 }}
                >
                  <ButtonBase
                    className="wishlist-btn"
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
              className="wishlist-no-record"
            >
              No records found.
            </Typography>
          )}
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
};

export default WishList;
