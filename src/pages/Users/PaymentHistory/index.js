import React, { useState, useEffect } from "react";
import { getPaymentHistory } from "../../../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Card, Typography, Grid, Box, Skeleton } from "@mui/material";
import "./PaymentHistory.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const response = await getPaymentHistory();
      if (response && response.data) {
        setPaymentHistory(response.data);
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
        <Card className="history-card" elevation={1} sx={{ maxWidth: 345 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      <Box className="history">
        <Typography gutterBottom variant="h4" component="h2">
          Payment history
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {console.log({ paymentHistory })}
          {loading ? (
            skeletonLoader()
          ) : paymentHistory?.length ? (
            paymentHistory.map((d, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  className="history-card"
                  elevation={1}
                  sx={{ maxWidth: 400 }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Typography level="body3">Profile ID</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        {d.profile_id || "-"}
                      </Typography>
                    </div>
                    <div>
                      <Typography level="body3">Amount</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        ₹{d.amount || "-"}
                      </Typography>
                    </div>
                    <div>
                      <Typography level="body3">Date</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        {moment(d.created_at).format("MMM DD yyyy") || "-"}
                      </Typography>
                    </div>
                    <div>
                      <Typography level="body3">Time</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        {moment(d.created_at).format("HH:mm") || "-"}
                      </Typography>
                    </div>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              component="p"
              className="history-no-record"
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

export default PaymentHistory;
