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
import { getPreferenceMatches } from "../../../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import useWishList from "../../../utils/useWishList";
import Loading from "../../../ui-components/Loding/Loading";

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [copyList, setCopyList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoader(true);
      const response = await getPreferenceMatches();
      if (response && response.data) {
        setRecords(response.data);
        setLoader(false);
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
      setLoader(false);
      setLoading(false);
    }
  };
  const { handleUpdateWishlist } = useWishList(fetchRecords);

  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  let length = copyList.length
    ? copyList.length
    : records?.data?.length
    ? records?.data?.length
    : 0;
  const count = Math.ceil(length / PER_PAGE);
  const _DATA = usePagination(
    copyList.length ? copyList : records?.data,
    PER_PAGE
  );

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
  const shortListButtonClicked = (id, is_liked) => {
    setLoader(true);
    handleUpdateWishlist(id, !is_liked);
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
                            onClick={() =>
                              shortListButtonClicked(d.id, d.is_liked)
                            }
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
        loading={loader}
      />
      <ToastContainer />
    </>
  );
}
