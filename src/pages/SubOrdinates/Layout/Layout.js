import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "./style.scss";
import List from "@mui/material/List";
import { Divider } from '@mui/material';


const SubordinateLayout = (props) => {
  const { open } = props;

  let sideMenu = [
    {
      title: "Home",
      icon: "https://cdn.lordicon.com/gmzxduhd.json",
      path: "sub-ordinate/home",
      role: "SUB_ORDINATE",
    },
    {
      title: "View Profile",
      icon: "https://cdn.lordicon.com/imamsnbq.json",
      path: "sub-ordinate/view-profile",
      role: "SUB_ORDINATE",
    },
    {
      title: "Edit Profile",
      icon: "https://cdn.lordicon.com/wloilxuq.json",
      path: "sub-ordinate/edit-profile",
      role: "SUB_ORDINATE",
    },
    {
      title: "Earnings",
      icon: "https://cdn.lordicon.com/zpxybbhl.json",
      path: "sub-ordinate/earnings",
      role: "SUB_ORDINATE",
    },
  ];

  let subordinateSidemenu = [
    {
      title: "Edit customer",
      icon: "https://cdn.lordicon.com/dxjqoygy.json",
      path: "sub-ordinate/edit-customer-profile",
      role: "SUB_ORDINATE",
    },
    {
      title: "Customer Details",
      icon: "https://cdn.lordicon.com/tyounuzx.json",
      path: "sub-ordinate/customer-details",
      role: "SUB_ORDINATE",
    },
    {
      title: "Payment References",
      icon: "https://cdn.lordicon.com/lupuorrc.json",
      path: "sub-ordinate/payment-references",
      role: "SUB_ORDINATE",
    },
  ];

  return (
    <List sx={{ paddingTop: 0 }}>
      {sideMenu.map((menu, index) =>
        menu.role === "SUB_ORDINATE" ? (
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              isActive ? "activeRoute" : "routes"
            }
            key={index}
          >
            <ListItem
              key={menu.title}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  padding: 0,
                }}
              >
                <Tooltip title={menu.title} placement="right">
                  <lord-icon
                    src={menu.icon}
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{
                      width: open ? "60px" : "500px",
                      marginLeft: open ? "auto" : "10px",
                    }}
                  ></lord-icon>
                </Tooltip>

                <ListItemText
                  className="menu-text"
                  primary={menu.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ) : null
      )}
      <Divider />
      {subordinateSidemenu.map((menu, index) =>
        menu.role === "SUB_ORDINATE" ? (
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              isActive ? "activeRoute" : "routes"
            }
            key={index}
          >
            <ListItem
              key={menu.title}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  padding: 0,
                }}
              >
                <Tooltip title={menu.title} placement="right">
                  <lord-icon
                    src={menu.icon}
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{
                      width: open ? "60px" : "500px",
                      marginLeft: open ? "auto" : "10px",
                    }}
                  ></lord-icon>
                </Tooltip>

                <ListItemText
                  className="menu-text"
                  primary={menu.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ) : null
      )}
    </List>
  );
};

export default SubordinateLayout;
