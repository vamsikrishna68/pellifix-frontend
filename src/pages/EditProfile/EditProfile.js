import './style.scss'
import { TextField, Card, CardMedia, CardContent, Typography, List, ListItem, MenuItem, InputAdornment, Fab } from '@mui/material';
import {
    genderList,
    physicalStatusList,
    maritalStatusList,
    smokingHabitsList,
    drinkingHabitsList,
    eatingHabitsList,
    bodyTypeList,
    motherToungeList,
    religionsList,
    nakshtramList,
    raasilist
} from '../../utils/dropDownValues'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SaveIcon from '@mui/icons-material/Save';

const EditProfile = () => {
    const religionList = religionsList.map(e => ({ label: e.name, value: e.name }))
    return (
        <div className="container-fluid edit-profile">
            <h1>Edit Profile</h1>
            <br/>
            <Fab className='save_btn' variant="extended" color="primary" >
                <SaveIcon /> Save Changes
            </Fab>
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
                            <div className="col-sm-6">
                                <TextField size="small" fullWidth label="Name" variant="outlined" />
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Gender:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Gender"
                                    size="small"
                                    id='Gender'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {genderList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Physical Status:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    id='Physical_Status'
                                    label="Physical Status"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                >
                                    {physicalStatusList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Height (In CM):
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">cms</InputAdornment>
                                    }}
                                    size="small"
                                    fullWidth
                                    label="Height"
                                    variant="outlined" />
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Marital Status:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    id='Marital Status'
                                    label="Marital Status"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                >
                                    {maritalStatusList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Smoking Habit:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Smoking Habit"
                                    size="small"
                                    id='Smoking Habit'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {smokingHabitsList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Drinking Habit:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Drinking Habit"
                                    size="small"
                                    id='Drinking Habit'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {drinkingHabitsList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                <TextField size="small" fullWidth label="Surname" variant="outlined" />
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Date Of Birth:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Date Of Birth"

                                        renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Body Type:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Body Type"
                                    size="small"
                                    id='Body Type'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {bodyTypeList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Weight (In KG):
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">kgs</InputAdornment>
                                    }}
                                    size="small"
                                    fullWidth
                                    label="Weight"
                                    variant="outlined" />
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Mother Tounge:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Mother Tounge"
                                    size="small"
                                    id='Mother Tounge'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {motherToungeList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Eating Habits:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    id='Eating Habits'
                                    label="Eating Habits"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                >
                                    {eatingHabitsList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Religion"
                                    size="small"
                                    id='Religion'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {religionList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Caste:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Caste"
                                    size="small"
                                    id='Caste'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {religionList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Sub Caste:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField size="small" fullWidth label="Sub Caste" variant="outlined" />
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
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Nakshtram"
                                    size="small"
                                    id='Nakshtram'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {nakshtramList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Raasi:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    select
                                    label="Raasi"
                                    size="small"
                                    id='Raasi'
                                    variant="outlined"
                                    fullWidth
                                >
                                    {raasilist.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ListItem>
                        <ListItem className="row">
                            <div className="col-sm-4">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Time of Birth:
                                </Typography>
                            </div>
                            <div className="col-sm-6">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Time of Birth"
                                        renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
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
        </div>

    )
}
export default EditProfile