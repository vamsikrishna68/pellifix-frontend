import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  ButtonBase,
  Grid,
  Skeleton,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Pagination } from "@mui/material";
import usePagination from "./Pagination";
import { getDailyRecommendation, sendWishList } from "../../../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../ui-components/Loding/Loading";

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [copyList, setCopyList] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await getDailyRecommendation();
      if (response && response.data) {
        setRecords(response.data);
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

  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  let length = copyList.length
    ? copyList.length
    : records?.data?.length
    ? records?.data?.length
    : 0;
  console.log({ length });
  const count = Math.ceil(length / PER_PAGE);
  console.log({ count });
  const _DATA = usePagination(
    copyList.length ? copyList : records?.data,
    PER_PAGE
  );
  console.log({ _DATA });

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleSearch = (searched) => {
    setCopyList(
      records?.data?.filter((item) =>
        searched ? item.name.toLowerCase().includes(searched.toLowerCase()) : ""
      )
    );
  };

  const skeletonLoader = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
      <Grid item xs={12} sm={6} md={3} key={n}>
        <Card className="wishlist-card" elevation={1} sx={{ maxWidth: 345 }}>
          <Skeleton variant="rectangular" height={158} />
          <Skeleton />
          <Skeleton width="60%" />
        </Card>
      </Grid>
    ));
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
        fetchRecords();
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
  return (
    <>
      <Box p="5">
        {/* <Typography gutterBottom variant="h4" component="h2">
          All profiles
        </Typography> */}
        <TextField
          style={{ width: "50%" }}
          variant="outlined"
          label="Search profiles"
          name="search"
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Grid
          style={{ marginTop: "1rem" }}
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {console.log({ copyList, dkjjj: _DATA.currentData() })}
          {loading ? (
            skeletonLoader()
          ) : _DATA.currentData().length ? (
            (copyList.length ? copyList : _DATA.currentData()).map((d, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  className="wishlist-card"
                  elevation={1}
                  sx={{ maxWidth: 345 }}
                >
                  <ButtonBase
                    className="wishlist-btn"
                    onClick={() => navigate(`/auth/home/view-profile/${d.id}`)}
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
              className="wishlist-no-record"
            >
              No records found.
            </Typography>
          )}
        </Grid>
      </Box>
      <Stack mt={6} mb={6} alignItems="flex-end">
        <Pagination
          count={count}
          size="large"
          page={page}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
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
}
