
import { Card, CardMedia, CardContent, Typography, List, ListItem, Divider } from '@mui/material'
import './style.scss'
const ViewProfile = () => {
    return (

        <div className="container-fluid view_profile">
            <h1>Profile</h1>
            <div className="row">
                <div className="col-sm-3 profile_image">
                    <div className="profile_basic_details">
                        <Card elevation={8}>
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
                    </div>
                </div>
                <div className="col-sm-9 profile_details">
                    <Card elevation={8}>
                        <CardContent>
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Personal Information
                                        </Typography>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <List>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Name:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Sabareesh
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Gender:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Male
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Physical Status:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Normal
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Height (In CM):
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    165
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Marital Status:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Unmarried
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Smoking Habits:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Ocassionally
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Drinking Habits:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    No
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Surname:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Addepalli
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Date Of Birth:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    20-June-1997 (25 Years)
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Body Type:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Chubby
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Weight (In KG):
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Typography variant="h6" color="primary" component="div">
                                                    70
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Mother Tounge:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Telugu
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Eating Habits:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Non-Vegetarian
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Religion Information
                                            </Typography>
                                        </div>
                                    </div>
                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Religion:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Hindu
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Caste:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Kapu (OC)
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Sub Caste:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    -
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Horoscopic Information
                                            </Typography>
                                        </div>
                                    </div>
                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Nakshtram:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Mulaa
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Raasi:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Danu Rasi
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Time of Birth:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    3:30 PM
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>

                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Location Information
                                            </Typography>
                                        </div>
                                    </div>
                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Town/City:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Anakapalle
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    District:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Visakhapatnam
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    State:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Andhra Pradesh
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Country:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    India
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Citizenship:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    India
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>

                                </div>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Professional Information
                                            </Typography>
                                        </div>
                                    </div>
                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Higher Qualification:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    B.Tech
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Employed In:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Private
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Occuption:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Senior Software Engineer
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Country:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    India
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Annual Income:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    12LPA
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>

                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Family Information
                                    </Typography>
                                </div>
                                <div className='col-sm-6'>

                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Family Type:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Joint Family
                                                </Typography>
                                            </div>
                                        </ListItem>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Fathers Occupation:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Bussiness
                                                </Typography>
                                            </div>
                                        </ListItem>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Brothers:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    2/1 Married
                                                </Typography>
                                            </div>
                                        </ListItem>

                                    </List>
                                </div>
                                <div className='col-sm-6'>

                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Family Status:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Middle Class
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Mothers Occupation:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    House Keeper
                                                </Typography>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Sisters:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    0
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>
                                </div>


                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Other Information
                                    </Typography>
                                </div>
                                <div className='col-sm-6'>

                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Hobbies:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Cooking
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className='col-sm-6'>

                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Interest:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-8">
                                                <Typography variant="h6" color="primary" component="div">
                                                    Short Films
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Other Images
                                    </Typography>
                                </div>
                                <div className='row other_images'>
                                    <div className='col-sm-4'>
                                        <Card elevation={8}>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Card elevation={8}>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Card elevation={8}>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Card elevation={8}>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Card elevation={8}>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Card elevation={8}>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={require('../../assets/img/testimonials/testimonials-5.jpg')}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    )
}
export default ViewProfile