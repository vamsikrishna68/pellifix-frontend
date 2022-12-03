import React, { useState, useEffect } from "react";
import { getWishList } from "../../api/api";
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
        setWishList(response.data);
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

  const data = [
    {
      age: 25,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 3,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
    {
      age: 26,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 4,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
    {
      age: 25,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 5,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
    {
      age: 25,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 10,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
    {
      age: 25,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 6,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
    {
      age: 25,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 8,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
    {
      age: 25,
      city: "Chennai",
      education: "Bachelors - Engineering / Computers / Others",
      id: 9,
      image:
        "https://img.pellifix.com/profiles/pm000003_409895ed-ae9f-4817-96b6-371bff80981d.jpg",
      name: "Tamil2",
    },
  ];

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
        {loading
          ? skeletonLoader()
          : data.map((d, i) => (
              <Grid item xs={12} sm={6} md={3} key={data.indexOf(d)}>
                <Card
                  className="wishlist-card"
                  elevation={1}
                  sx={{ maxWidth: 345 }}
                >
                  <ButtonBase
                    className="wishlist-btn"
                    onClick={() => navigate(`/auth/wishlist/${d.id}`)}
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
                          <FavoriteIcon />
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
            ))}
      </Grid>
    </Box>
  );
};

export default WishList;
