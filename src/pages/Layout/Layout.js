import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '../Home/Home';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PreviewIcon from '@mui/icons-material/Preview';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => {
    {
        let obj = {}
        if (open) {
            obj = {
                flexGrow: 1,
                padding: theme.spacing(3),
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                marginLeft: `${drawerWidth}px`,
            }
        } else {
            obj = {
                flexGrow: 1,
                padding: theme.spacing(3),
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 60,
            }
        }
        return obj
    }
});

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Layout = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const sideMenu = [
        { title: 'Home', icon: <HomeIcon /> },
        { title: 'Whist List', icon: <FavoriteIcon /> },
        { title: 'Chat', icon: <ChatIcon /> },
        { title: 'Edit Profile', icon: <ManageAccountsIcon /> },
        { title: 'Edit Preference', icon: <DisplaySettingsIcon /> },
        { title: 'Compare Profiles', icon: <CompareArrowsIcon /> },
        { title: 'Profile Viewed', icon: <PreviewIcon /> },
    ]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    return (
        <Box>
            <CssBaseline />
            <AppBar color='secondary' position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="div">
                        Pellifix
                    </Typography>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            color="inherit"
                        >
                            <Avatar src={require('../../assets/img/testimonials/testimonials-5.jpg')} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideMenu.map((menu, index) => (
                        <ListItem key={menu.title} disablePadding sx={{ display: 'block', backgroundColor:index==0?'#F7C254':'white' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                       
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.title} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Home />
            </Main>
        </Box>
    );
}

export default Layout
