import { Box, Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import HomeCarousel from "./HomeCarousel";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import {
  getDropwdownValues,
  getStates,
  getDailyRecommendation,
  getPreferenceMatches,
  getHoroscopeMatches,
  sendWishList,
} from "../../api/api";
import { ls } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Home = () => {
  const [dailyRecomLoad, setDailyRecomLoad] = useState(true);
  const [horoscopeLoad, setHoroscopeLoad] = useState(true);
  const [preferenceLoad, setPreferenceLoad] = useState(true);

  const [dailyRecommendation, setDailyRecommendation] = useState([]);
  const [horoscopeMatches, setHoroscopeMatches] = useState([]);
  const [preferenceMatches, setPreferenceMatches] = useState([]);

  const [isLiked, setIsLiked] = useState([]);

  useEffect(() => {
    fetchDropdownsValues();
    fetchStates();
    fetchDailyRecommendation();
    fetchHoroscopeMatches();
    fetchPreferenceMatches();
  }, []);

  const fetchDropdownsValues = async () => {
    const response = await getDropwdownValues();
    ls.setItem("dropdown_values_for_reference", JSON.stringify(response.data));
  };

  const fetchStates = async () => {
    const response = await getStates();
    ls.setItem("states_for_reference", JSON.stringify(response.data));
  };

  const fetchDailyRecommendation = async () => {
    try {
      const response = await getDailyRecommendation();
      if (response && response.data) {
        setDailyRecommendation(response.data);
        setDailyRecomLoad(false);
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
      setDailyRecomLoad(false);
    }
  };

  const fetchHoroscopeMatches = async () => {
    try {
      const response = await getHoroscopeMatches();
      if (response && response.data) {
        setHoroscopeMatches(response.data);
        setHoroscopeLoad(false);
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
      setHoroscopeLoad(false);
    }
  };

  const fetchPreferenceMatches = async () => {
    try {
      const response = await getPreferenceMatches();
      if (response && response.data) {
        setPreferenceMatches(response.data);
        setPreferenceLoad(false);
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
      setPreferenceLoad(false);
    }
  };

  const skeletonLoader = () => {
    return (
      <Carousel responsive={responsive} autoPlay={false} infinite={false}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div style={{ padding: "10px 15px 10px 0px" }}>
            <Card
              key={n}
              className="profile-card"
              elevation={1}
              sx={{ maxWidth: 345 }}
            >
              <Skeleton variant="rectangular" height={158} />
              <Skeleton />
              <Skeleton width="60%" />
            </Card>
          </div>
        ))}
      </Carousel>
    );
  };

  const onClickLike = (item) => {
    let index = isLiked.findIndex((x) => x === item.id);
    if (index >= 0) isLiked.splice(index, 1);
    else isLiked.push(item.id);
    setIsLiked([...isLiked]);
  };

  return (
    <Box className="home_page">
      {console.log({ isLiked })}
      <span style={{ display: "flex", alignItems: "center" }}>
        <lord-icon
          src="https://cdn.lordicon.com/lupuorrc.json"
          trigger="loop"
          colors="primary:#121331,secondary:#d53833"
          style={{ width: 55, height: 50 }}
        ></lord-icon>
        <Typography variant="h5">Daily Recommendations</Typography>
      </span>
      {console.log({ dailyRecomLoad, dailyRecommendation })}
      {dailyRecomLoad ? (
        skeletonLoader()
      ) : (
        <HomeCarousel
          onClickLike={onClickLike}
          content={dailyRecommendation}
          responsive={responsive}
          isLiked={isLiked}
        />
      )}
      <br />
      <Divider />
      <br />
      <span style={{ display: "flex", alignItems: "center" }}>
        <lord-icon
          src="https://cdn.lordicon.com/nxaaasqe.json"
          trigger="loop"
          colors="primary:#121331,secondary:#d53833"
          style={{ width: 55, height: 50, marginTop: "-2px" }}
        ></lord-icon>
        <Typography variant="h5">Horoscopic Matches</Typography>
      </span>
      {console.log({ horoscopeLoad, horoscopeMatches })}
      {horoscopeLoad ? (
        skeletonLoader()
      ) : (
        <HomeCarousel
          onClickLike={onClickLike}
          content={horoscopeMatches}
          responsive={responsive}
          isLiked={isLiked}
        />
      )}
      <br />
      <Divider />
      <br />
      <span style={{ display: "flex", alignItems: "center" }}>
        <lord-icon
          src="https://cdn.lordicon.com/uukerzzv.json"
          trigger="loop"
          colors="primary:#121331,secondary:#d53833"
          style={{ width: 55, height: 50, marginTop: "-2px" }}
        ></lord-icon>
        <Typography variant="h5">Preference Matches</Typography>
      </span>
      {console.log({ preferenceLoad, preferenceMatches })}
      {preferenceLoad ? (
        skeletonLoader()
      ) : (
        <HomeCarousel
          onClickLike={onClickLike}
          content={preferenceMatches}
          responsive={responsive}
          isLiked={isLiked}
        />
      )}

      <ToastContainer />
    </Box>
  );
};

export default Home;
