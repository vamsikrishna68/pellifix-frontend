import {
  Card,
  Typography,
  Box,
  List,
  ListItem,
  Button
} from "@mui/material";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useEffect, useState } from "react";
import { getSubscriptionPageVisitedCustomerData, deleteViewedContactDetails } from "../../../api/api";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import "./style.css";
import Loading from "../../../ui-components/Loding/Loading"


// register lottie and define custom element
defineLordIconElement(loadAnimation);
import "../../Users/Profile/style.scss";

const CustomerDetails = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await getSubscriptionPageVisitedCustomerData();
      if (response) {
        setCustomerData([...response.data]);
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
  const deleteContact = async (customerDataEle) => {
    try {
      setLoading(true);
      const response = await deleteViewedContactDetails(customerDataEle.id);
      if (response) {
        getProfile();
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

  return (
    <div className="container-fluid profile">
      <h2>
        <lord-icon
          src="https://cdn.lordicon.com/dxjqoygy.json"
          trigger="loop"
          colors="primary:#121331,secondary:#d53833"
          style={{ width: 55, height: 100 }}
        ></lord-icon>
        Subscription Page Visited Customer Details
      </h2>
      <div >
        <div >
          <Box>
            <Loading loading={loading} />

            <div className="row">
              <div className="col-12">
                <List>
                  {customerData && customerData.map(customerDataEle => {
                    return (
                      <ListItem className="row">
                        <Card sx={{ minWidth: 275 }} variant="outlined" className="grid-container">

                          <div class="grid-item">
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              component="div"
                            >
                              {customerDataEle.name}
                            </Typography>
                          </div>

                          <div class="grid-item">
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              component="div"
                            >
                              {customerDataEle.mobileno}
                            </Typography>
                          </div>
                          <Button
                            className="button"
                            type="submit"
                            variant="contained"
                            color="primary"
                            // disabled={checkEmailValid()}
                            onClick={() => deleteContact(customerDataEle)}
                          >
                            Delete
                          </Button>
                        </Card>
                      </ListItem>
                    )
                  })}

                </List>
              </div>
            </div>
          </Box>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustomerDetails;
