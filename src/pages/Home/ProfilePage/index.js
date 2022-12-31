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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Pagination } from "@mui/material";
import usePagination from "./Pagination";
import { getDailyRecommendation } from "../../../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

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

  const handleSearch = (e) => {
    let target = e.target;
    setRecords((items) => {
      if (target.value == "") return items;
      else
        return items.filter((x) => x.name.toLowerCase().includes(target.value));
    });
  };

  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  let length = records?.data?.length ? records?.data?.length : 0;
  const count = Math.ceil(length / PER_PAGE);
  const _DATA = usePagination(records?.data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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

  return (
    <>
      <Box p="5">
        <Typography gutterBottom variant="h4" component="h2">
          All profiles
        </Typography>
        <TextField
          variant="outlined"
          label="Search Employees"
          name="search"
          onChange={handleSearch}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <Search />
          //     </InputAdornment>
          //   ),
          // }}
        />
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {loading ? (
            skeletonLoader()
          ) : _DATA.currentData().length ? (
            _DATA.currentData().map((d, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
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
      <ToastContainer />
    </>
  );
}
