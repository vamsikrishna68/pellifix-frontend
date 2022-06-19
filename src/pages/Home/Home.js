import { Box, Divider } from "@mui/material"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.scss'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};
const Home = () => {
    const profiles = [
        {
            id: 1,
            name: 'Stefie',
            img: 'p1.jpg'
        },
        {
            id: 1,
            name: 'Laxu',
            img: 'p2.jpg'
        },
        {
            id: 1,
            name: 'Ramx',
            img: 'p3.jpg'
        },
        {
            id: 1,
            name: 'Loxy',
            img: 'p4.jpg'
        }, {
            id: 1,
            name: 'Stefie',
            img: 'p1.jpg'
        },
        {
            id: 1,
            name: 'Laxu',
            img: 'p2.jpg'
        },
        {
            id: 1,
            name: 'Ramx',
            img: 'p3.jpg'
        },
        {
            id: 1,
            name: 'Loxy',
            img: 'p4.jpg'
        }, {
            id: 1,
            name: 'Stefie',
            img: 'p1.jpg'
        },
        {
            id: 1,
            name: 'Laxu',
            img: 'p2.jpg'
        },
        {
            id: 1,
            name: 'Ramx',
            img: 'p3.jpg'
        },
        {
            id: 1,
            name: 'Loxy',
            img: 'p4.jpg'
        }
    ]
    const corousel = (
        <Carousel
            responsive={responsive}
            autoPlay={false}
            infinite={true}>
            {
                profiles.map(profile => (
                    <div style={{ padding: '10px 15px 10px 0px' }}>


                        <Card className="profile-card" elevation={3} sx={{ maxWidth: 345 }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <FavoriteIcon />
                                    </IconButton>
                                }
                                title={profile.name}
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="300"
                                image={require(`../../assets/img/profiles/${profile.img}`)}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like.
                                </Typography>
                            </CardContent>
                            {/* <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions> */}
                        </Card>
                    </div>
                )
                )
            }
        </Carousel>
    )
    return (
        <Box className="home_page">
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <lord-icon
                    src="https://cdn.lordicon.com/lupuorrc.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{ width: 55, height: 50}}>
                </lord-icon>
                <Typography variant="h5">Daily Recommendations</Typography>
            </span>
            {corousel}
            <br />
            <Divider />
            <br />
            <span style={{ display: 'flex', alignItems: 'center' }}>

                <lord-icon
                    src="https://cdn.lordicon.com/nxaaasqe.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{ width: 55, height: 50,marginTop:'-2px' }}>
                </lord-icon>
                <Typography variant="h5">Horoscopic Matches</Typography>
            </span>
            {corousel}
            <br />
            <Divider />
            <br />
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <lord-icon
                    src="https://cdn.lordicon.com/uukerzzv.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{ width: 55, height: 50,marginTop:'-2px' }}>
                </lord-icon>
                <Typography variant="h5">Preference Matches</Typography>
            </span>
            {corousel}
        </Box>
    )
}

export default Home