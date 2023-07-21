import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  Typography,
  List,
  ListItem,
  MenuItem,
  InputAdornment,
  Card,
  Button,
  Fab,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getWishList } from "../../../api/api";
import { getProfileDetails, getCustomerProfileData } from "../../../api/api";

import { ToastContainer, toast, Zoom } from "react-toastify";
import CompareProfileTable from "./CompareProfileTable";
import Loading from "../../../ui-components/Loding/Loading";

const CompareProfile = () => {
  const [loading, setLoading] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [profileOne, setProfileOne] = useState("");
  const [profileTwo, setProfileTwo] = useState("");
  const [profileOneData, setProfileOneData] = useState("");
  const [profileTwoData, setProfileTwoData] = useState("");
  const [showTable, setShowTable] = useState(false);

  const fetchWishlistData = async () => {
    try {
      const response = await getWishList();
      if (response && response.data) {
        const temp = response.data.data.map((ele) => {
          return { id: ele.id, name: ele.name };
        });
        setWishlistData(temp);
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
    }
  };
  useEffect(() => {
    fetchWishlistData();
  }, []);
  const handleChangeProfileOne = (e) => {
    setProfileOne(e.target.value);
  };
  const handleChangeProfileTwo = (e) => {
    setProfileTwo(e.target.value);
  };
  const getProfilesData = async () => {
    try {
      debugger;
      setLoading(true);
      const profileOneResponse = await getProfileDetails(profileOne);
      const profileTwoResponse = await getProfileDetails(profileTwo);
      if (profileOneResponse && profileOneResponse.data) {
        debugger;
        setProfileOneData({
          ...profileOneResponse.data,
        });
      }
      if (profileTwoResponse && profileTwoResponse.data) {
        debugger;
        setProfileTwoData({
          ...profileTwoResponse.data,
        });
      }
      setShowTable(true);
      setLoading(false);
    } catch (error) {
      toast.error(
        error?.profileOneResponse?.data?.error?.message ||
          "Something wend wrong",
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
    <div className="row">
      <div className="col-sm-4">
        <FormControl size="small" fullWidth>
          <InputLabel>Select </InputLabel>
          <Select
            name="wishlistData"
            value={profileOne || ""}
            label="Wishlist"
            onChange={(e) => handleChangeProfileOne(e)}
            onBlur={() => {}}
          >
            {wishlistData?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-sm-4">
        <FormControl size="small" fullWidth>
          <InputLabel>Select </InputLabel>
          <Select
            name="wishlistData"
            value={profileTwo || ""}
            label="Wishlist"
            onChange={(e) => handleChangeProfileTwo(e)}
            onBlur={() => {}}
          >
            {wishlistData?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-sm-2">
        <Button
          className="button"
          type="submit"
          variant="contained"
          color="primary"
          onClick={getProfilesData}
          disabled={!(profileTwo && profileOne)}
        >
          Compare
        </Button>
      </div>
      <div className="p-4">
        {showTable && (
          <CompareProfileTable
            profileOne={profileOneData}
            profileTwo={profileTwoData}
          />
        )}
      </div>
      <Loading
        styles={{ top: 0, left: 0, right: 0, width: "100%" }}
        loading={loading}
      />
      {/* <ToastContainer /> */}
    </div>
  );
};
export default CompareProfile;
