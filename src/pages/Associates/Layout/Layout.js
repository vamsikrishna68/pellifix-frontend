import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "./style.scss";
import List from "@mui/material/List";


const AssociateLayout = (props) => {
  const { open } = props;
  let sideMenu = [
    {
      title: "View Profile",
      icon: "https://cdn.lordicon.com/imamsnbq.json",
      path: "associates/view-profile",
      role: "ASSOCIATE",
    },
    {
      title: "Edit Profile",
      icon: "https://cdn.lordicon.com/wloilxuq.json",
      path: "associates/edit-profile",
      role: "ASSOCIATE",
    },
    {
      title: "Earnings",
      icon: "https://cdn.lordicon.com/zpxybbhl.json",
      path: "associates/Earnings",
      role: "ASSOCIATE",
    },
  ];

  return (
    <List sx={{ paddingTop: 0 }}>
      {sideMenu.map((menu, index) =>
        menu.role === "ASSOCIATE" ? (
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

export default AssociateLayout;
