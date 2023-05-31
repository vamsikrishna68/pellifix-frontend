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
      title: "Home",
      icon: "https://cdn.lordicon.com/gmzxduhd.json",
      path: "admin/home",
      role: "ADMIN",
    },
    {
      title: "View Profile",
      icon: "https://cdn.lordicon.com/imamsnbq.json",
      path: "admin/view-profile",
      role: "ADMIN",
    },
    {
      title: "Edit Profile",
      icon: "https://cdn.lordicon.com/wloilxuq.json",
      path: "admin/edit-profile",
      role: "ADMIN",
    },
    
  ];

  return (
    <List sx={{ paddingTop: 0 }}>
      {sideMenu.map((menu, index) =>
        menu.role === "ADMIN" ? (
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
