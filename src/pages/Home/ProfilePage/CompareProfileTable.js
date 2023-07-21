import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function createData(category, firstProfile, secondProfile) {
  return { category, firstProfile, secondProfile };
}

export default function CompareProfileTable({ profileOne, profileTwo }) {
  const rows = [
    createData(
      "Name",
      profileOne.name + " " + profileOne.surname,
      profileTwo.name + " " + profileTwo.surname
    ),
    createData("Age", profileOne.age, profileTwo.age),
    createData("Height (In CM)", profileOne.height, profileTwo.height),
    createData("Weight (In KG)", profileOne.weight, profileTwo.weight),
    createData("Occupation", profileOne.occupation, profileTwo.occupation),
    createData("Company", profileOne.employeed_in, profileTwo.employeed_in),
    createData("Salary", profileOne.salary, profileTwo.salary),
    createData(
      "Marital Status",
      profileOne.marital_status,
      profileTwo.marital_status
    ),
    createData(
      "Date Of Birth",
      moment(profileOne.dob).format("MMM DD yyyy"),
      moment(profileTwo.dob).format("MMM DD yyyy")
    ),
    createData(
      "Mother Tounge",
      profileOne.mother_tongue,
      profileTwo.mother_tongue
    ),
  ];
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ fontWeight: 700 }}>
              Avatar
            </TableCell>
            <TableCell align="center">
              <img
                style={{ width: "300px", cursor: "pointer" }}
                src={profileTwo.image}
                onClick={() =>
                  navigate(`/auth/home/view-profile/${profileOne.id}`)
                }
                title="View Profile"
              ></img>
            </TableCell>
            <TableCell align="center">
              <img
                style={{ width: "300px", cursor: "pointer" }}
                src={profileTwo.image}
                onClick={() =>
                  navigate(`/auth/home/view-profile/${profileTwo.id}`)
                }
                title="View Profile"
              ></img>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="left"
                component="th"
                scope="row"
                style={{ fontWeight: 700 }}
              >
                {row.category}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.firstProfile}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.secondProfile}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
