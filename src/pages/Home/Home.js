import { Box, Divider } from "@mui/material"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.scss'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    const corousel=(
        <Carousel
        responsive={responsive}
        autoPlay={false}
        infinite={true}>
            {
                profiles.map(profile => (
                    <div style={{padding:'10px 15px 10px 0px'}}>


                        <Card sx={{ maxWidth: 345 }}>
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
            <Typography variant="h6">Daily Recommendations</Typography>
            {corousel}
            <br/>
            <Divider/>
            <br/>
            <Typography variant="h6">Horoscopic Matches</Typography>
            {corousel}
            <br/>
            <Divider/>
            <br/>
            <Typography variant="h6">Preference Matches</Typography>
            {corousel}
        </Box>
    )
}

export default Home