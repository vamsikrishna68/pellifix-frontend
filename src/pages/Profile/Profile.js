import { Card, Divider, Typography, CardMedia, CardContent, Box, AppBar, Tabs, Tab, List, ListItem, ListItemText } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react"
import { getProfileData } from '../../api/api'
import EditIcon from '@mui/icons-material/Edit';
import SwipeableViews from 'react-swipeable-views';
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

// register lottie and define custom element
defineLordIconElement(loadAnimation);
import './style.scss'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const Profile = () => {
    const theme = useTheme();
    const [profileData, setProfileData] = useState(null)
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            const response = await getProfileData()
            if (response) {
                setProfileData(response.data)
            }

        } catch (error) {
            console.log(error, "error")
        }

    }

    const profileCard = (
        <Card>
            <CardMedia
                component="img"
                height="400"
                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Sabareesh Addepalli
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ut aperiam numquam distinctio veniam ipsam assumenda odit quasi saepe, cumque, magnam facere tempore totam quis quod repellat quisquam dicta? Laudantium?
                </Typography>
            </CardContent>
        </Card>
    )

    return (
        <div className="container-fluid profile">
            <h2>
                <lord-icon
                    src="https://cdn.lordicon.com/dxjqoygy.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{ width: 55, height: 50 }}>
                </lord-icon>Profile Details</h2>
            <div className="row">
                <div className="col">
                    <Box>
                        <AppBar style={{ background: 'whitesmoke' }} elevation={0} position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="primary"
                                indicatorColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Personal Information" {...a11yProps(0)} />
                                <Tab label="Religion Information" {...a11yProps(1)} />
                                <Tab label="Horoscopic Information" {...a11yProps(2)} />
                                <Tab label="Location Information" {...a11yProps(3)} />
                                <Tab label="Professional Information" {...a11yProps(4)} />
                                <Tab label="Family Details" {...a11yProps(5)} />
                                <Tab label="Other Information" {...a11yProps(6)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <List>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Name:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Sabareesh
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Surname:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Addepalli
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Gender:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Male
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Date Of Birth:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        20-June-1997 (25 Years)
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Physical Status:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Normal
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Body Type:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Chubby
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Color:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Fair
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Weight (In KG):
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        70
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Height (In CM):
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        165
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Mother Tounge:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Telugu
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Marital Status:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Unmarried
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Eating Habits:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Non-Vegetarian
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Smoking Habits:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Ocassionally
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Drinking Habits:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        No
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                        </List>

                                    </div>
                                    <div className="col-sm-3">
                                        {profileCard}
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className="row">
                                    <div className="col-sm-9">
                                        <List>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Religion:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Hindu
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Caste:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        Kapu (OC)
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                            <ListItem className="row">
                                                <div className="col-sm-2">
                                                    <Typography variant="h6" color="text.secondary" component="div">
                                                        Sub Caste:
                                                    </Typography>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Typography variant="h5" color="primary" component="div">
                                                        -
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                        </List>

                                    </div>
                                    <div className="col-sm-3">
                                        {profileCard}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                Item Three
                            </TabPanel>
                        </SwipeableViews>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Profile