import React, { useState, useEffect } from "react";
import PageHeader from "../../../ui-components/PageHeader";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Theme,
} from "@mui/material";
import ProfileTable from "./ProfileTable";
import Controls from "../../../ui-components/controls/Controls";
import {
  getDropwdownValues,
  getStates,
  getDailyRecommendation,
  getPreferenceMatches,
  getHoroscopeMatches,
  sendWishList,
} from "../../../api/api";
import { Search } from "@mui/icons-material";
import { ToastContainer, toast, Zoom } from "react-toastify";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     pageContent: {
//       margin: '1rem',
//       padding: '0.8rem',
//     },
//     searchInput: {
//       width: "75%",
//     },
//   })
// );

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department", disableSorting: true },
];

export default function Employees() {
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [dailyRecomLoad, setDailyRecomLoad] = useState(true);
  const [dailyRecommendation, setDailyRecommendation] = useState([]);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    fetchDailyRecommendation();
  }, []);

  const fetchDailyRecommendation = async () => {
    try {
      const response = await getDailyRecommendation();
      if (response && response.data) {
        setDailyRecommendation(response.data.data);
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

  return (
    <>
      <PageHeader
        title="All profiles"
        icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
      />
      {dailyRecommendation.length ? (
        <Paper className="pageContent">
          <Toolbar>
            <Controls.Input
              label="Search Employees"
              className="searchInput"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Toolbar>
          {/* <ProfileTable
            records={dailyRecommendation}
            headCells={headCells}
            filterFn={filterFn}
          /> */}
        </Paper>
      ) : (
        ""
      )}
    </>
  );
}
