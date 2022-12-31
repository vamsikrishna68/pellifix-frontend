import React from "react";
import { Paper, Card, Typography, Button } from "@mui/material";

// const useStyles = makeStyles((theme) => createStyles({
//   root: {
//     backgroundColor: "#fdfdff",
//   },
//   pageHeader: {
//     padding: "0.9rem",
//     display: "flex",
//     marginBottom: "0.5rem",
//   },
//   pageIcon: {
//     display: "inline-block",
//     padding: "0.5rem",
//     color: "#3c44b1",
//   },
//   pageTitle: {
//     paddingLeft: "0.9rem",
//     "& .MuiTypography-subtitle2": {
//       opacity: "0.6",
//     },
//   },
// }));

export default function PageHeader(props) {
  const { title, subTitle, icon } = props;
  return (
    <Paper elevation={0} square className="root">
      <div className="pageHeader">
        <Card className="pageIcon">{icon}</Card>
        <div className="pageTitle">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
