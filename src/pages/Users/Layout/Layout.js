import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "./style.scss";
import { Divider } from "@mui/material";

const UserLayout = (props) => {
  const { open, membership } = props;
  const location = useLocation();
  const isAdminLogin =
    location && location.pathname && location.pathname.includes("admin");

  let sideMenu = [
    {
      title: "Home",
      icon: "https://cdn.lordicon.com/gmzxduhd.json",
      path: "home",
      role: "USER",
    },
    {
      title: "Wish List",
      icon: "https://cdn.lordicon.com/rjzlnunf.json",
      path: "wishlist",
      role: "USER",
    },
    {
      title: "Chat",
      icon: "https://cdn.lordicon.com/zpxybbhl.json",
      path: "chat",
      role: "USER",
    },
    {
      title: "Edit Profile",
      icon: "https://cdn.lordicon.com/wloilxuq.json",
      path: "edit-profile",
      role: "USER",
    },
    {
      title: "Edit Preference",
      icon: "https://cdn.lordicon.com/sbiheqdr.json",
      path: "edit-preference",
      role: "USER",
    },
    {
      title: "Profile Viewed",
      icon: "https://cdn.lordicon.com/tyounuzx.json",
      path: "profile-viewed",
      role: "USER",
    },
    {
      title: "Profile Assist",
      icon: "https://cdn.lordicon.com/imamsnbq.json",
      path: "profile-assist",
      role: membership ? "USER" : "",
    },
    {
      title: "Compare Profile",
      icon: "https://cdn.lordicon.com/qvzrpodt.json",
      path: "compare-profile",
      role: membership ? "USER" : "",
    },
    {
      title: "Admin Dashboard",
      icon: "https://cdn.lordicon.com/imamsnbq.json",
      path: "admin-dashboard",
      role: "SUPER_ADMIN",
    },
    {
      title: "Sub-Ordinates",
      icon: "https://cdn.lordicon.com/eszyyflr.json",
      path: "sub-ordinates",
      role: "SUPER_ADMIN",
    },
    {
      title: "Associates",
      icon: "https://cdn.lordicon.com/imamsnbq.json",
      path: "associates",
      role: "SUPER_ADMIN",
    },
  ];
  let createSideMenu = [
    {
      title: "Create Assosiate",
      icon: "https://cdn.lordicon.com/wloilxuq.json",
      path: "admin/create-assosiate",
      role: "SUPER_ADMIN",
    },
    {
      title: "Create SubOrdinate",
      icon: "https://cdn.lordicon.com/wloilxuq.json",
      path: "admin/create-subordinate",
      role: "SUPER_ADMIN",
    },
  ];

  return (
    <Box>
      {sideMenu.map((menu, index) =>
        menu.role === "USER" ? (
          <NavLink
            to={menu.path}
            className={({ isActive }) => (isActive ? "activeRoute" : "routes")}
            key={index}
          >
            <ListItem key={menu.title} disablePadding sx={{ display: "block" }}>
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
      {isAdminLogin &&
        createSideMenu.map((menu, index) =>
          menu.role === "SUPER_ADMIN" ? (
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive ? "activeRoute" : "routes"
              }
              key={index}
            >
              <Divider />
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
    </Box>
  );
};

export default UserLayout;
