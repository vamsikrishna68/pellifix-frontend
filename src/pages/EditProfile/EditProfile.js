import './style.scss'
import {
    TextField,
    Select, InputLabel,
    FormControl, Typography,
    List, ListItem,
    MenuItem, InputAdornment, Card,
    Fab, Autocomplete, IconButton
} from '@mui/material';
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
    raasilist,
    countries
} from '../../utils/dropDownValues'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SaveIcon from '@mui/icons-material/Save';
import { Formik } from "formik";
import { useEffect, useState } from 'react';
import { getProfileData, updateProfileData } from '../../api/api'
import Loading from '../../ui-components/Loding/Loading';
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';


const EditProfile = () => {
    const religionList = religionsList.map(e => ({ label: e.name, value: e.name }))
    const [loading, setLoading] = useState(true)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [casteList, setCasteList] = useState(religionsList.map(e => [...e.castes]).flat().map(e => ({ label: e.name, value: e.name })))
    const [formData, setFormData] = useState({
        name: '',
        // surname: '',
        gender: null,
        dob: null,
        physical_status: null,
        body_type: null,
        height: null,
        weight: null,
        marital_status: null,
        motherTounge: null,
        smoking_habit: null,
        eating_habit: null,
        drinking_habit: null,
        religion: null,
        star: null,
        caste: null,
        zodiac: null,
        dot: null,
        country: null,
        citizen: null,
        state: null,
        district: null,
        city: null,
        higherQualification: null,
        employedIn: null,
        occupation: null,
        annualIncome: null,
        familyType: null,
        familyStatus: null,
        fathersOccupation: null,
        mothersOccupation: null,
        noOfBrothers: null,
        noOfBrothersMarried: null,
        noOfSisters: null,
        noOfSistersMarried: null,
        hobbies: null,
        interests: null,
        aboutMe: null

    })

    const filterCasteByReligion = (religion) => {
        const filteredList = religionsList.filter(e => e.name === religion)[0].castes.map(e => ({ label: e.name, value: e.name }))
        setCasteList([...filteredList]);
    }

    const files = acceptedFiles.map(file => {
        const objectUrl = URL.createObjectURL(file)
        return (
            <div className='uploaded-image'>
                <IconButton size='small' className="clear-btn" color="primary" component="span">
                    <ClearIcon />
                </IconButton>
                <img src={objectUrl} />
            </div>
        )
    })


    useEffect(() => {
        fetchProfileData();

    }, [])

    const fetchProfileData = async () => {

        try {
            setLoading(true)
            const response = await getProfileData()
            if (response && response.data) {

                setFormData({ ...formData, ...response.data })
                if (formData.religion) {
                    filterCasteByReligion(formData.religion)
                }

                // setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const updateProfile = async (data) => {
        try {
            const response = await updateProfileData(data)
            console.log(response, "response")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid edit-profile">
            <div>
                <h1>Edit Profile</h1>
                <br />

                <Formik
                    enableReinitialize
                    initialValues={formData}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        updateProfile({ ...formData, ...values })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Fab type='submit' className='save_btn' variant="extended" color="primary" >
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
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    size="small"
                                                    fullWidth
                                                    label="Name" variant="outlined" />
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Gender:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">

                                                <FormControl size="small" fullWidth>
                                                    <InputLabel>Gender</InputLabel>
                                                    <Select
                                                        name='gender'
                                                        value={values.gender || ''}
                                                        label="Gender"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {genderList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Physical Status:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel >Physical Status</InputLabel>
                                                    <Select
                                                        name='physical_status'
                                                        label="Physical Status"
                                                        value={values.physical_status || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {physicalStatusList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
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
                                                    name='height'
                                                    value={values.height || ''}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
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
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Marital Status</InputLabel>
                                                    <Select
                                                        name='marital_status'
                                                        label="Marital Status"
                                                        value={values.marital_status || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {maritalStatusList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Smoking Habit:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Smoking Habit</InputLabel>
                                                    <Select
                                                        name='smoking_habit'
                                                        label="Smoking Habit"
                                                        value={values.smoking_habit || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {smokingHabitsList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Drinking Habit:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Drinking Habit</InputLabel>
                                                    <Select
                                                        name='drinking_habit'
                                                        label="Drinking Habit"
                                                        value={values.drinking_habit || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {drinkingHabitsList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

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
                                                <TextField
                                                    size="small"
                                                    name='surname'
                                                    value={values.surname || ''}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    fullWidth label="Surname" variant="outlined" />
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
                                                        value={values.dob}
                                                        onChange={handleChange}
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
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Body Type</InputLabel>
                                                    <Select
                                                        name='body_type'
                                                        label="Body Type"
                                                        value={values.body_type || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {bodyTypeList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

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
                                                    name='weight'
                                                    value={values.weight || ''}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
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
                                                {/* <FormControl size="small" fullWidth>
                                                    <InputLabel > Mother Tounge</InputLabel>
                                                    <Select
                                                        name='motherTounge'
                                                        label="Mother Tounge"
                                                        value={values.motherTounge || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {motherToungeList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl> */}

                                                <Autocomplete
                                                    disablePortal
                                                    id="language"

                                                    options={motherToungeList}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.value)
                                                        handleChange(v.value)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.language || ''}
                                                    renderInput={(params) => <TextField {...params} label="Language" />}
                                                />
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Eating Habit:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Eating Habit</InputLabel>
                                                    <Select
                                                        name='eating_habit'
                                                        label="Eating Habit"
                                                        value={values.eating_habit || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {eatingHabitsList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

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
                                                <Autocomplete
                                                    disablePortal
                                                    id="religion"

                                                    options={religionList}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.value)
                                                        handleChange(v.value)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.religion || ''}
                                                    renderInput={(params) => <TextField {...params} label="Religion" />}
                                                />
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Caste:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* <Autocomplete
                                                    disablePortal
                                                    id="caste"

                                                    options={casteList}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.value)
                                                        handleChange(v.value)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.caste || ''}
                                                    renderInput={(params) => <TextField {...params} label="Caste" />}
                                                /> */}
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Caste</InputLabel>
                                                    <Select
                                                        name='caste'
                                                        label="Caste"
                                                        value={values.caste || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {casteList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
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
                                                <Autocomplete
                                                    disablePortal
                                                    id="Nakshtram"

                                                    options={nakshtramList}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.value)
                                                        handleChange(v.value)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.star || ''}
                                                    renderInput={(params) => <TextField {...params} label="Nakshtram" />}
                                                />
                                                {/* <TextField
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
                                                </TextField> */}
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Raasi:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Autocomplete
                                                    disablePortal
                                                    id="Raasi"

                                                    options={raasilist}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.value)
                                                        handleChange(v.value)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.zodiac || ''}
                                                    renderInput={(params) => <TextField {...params} label="Raasi" />}
                                                />

                                                {/* <TextField
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
                                                </TextField> */}
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
                                                        onChange={handleChange}
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
                                                    Country:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <Autocomplete
                                                    disablePortal
                                                    id="country"

                                                    options={countries}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        // filterCasteByReligion(v.value)
                                                        handleChange(v.value)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.countries || ''}
                                                    renderInput={(params) => <TextField {...params} label="Country" />}
                                                />
                                                {/* <TextField size="small" fullWidth label="Country" variant="outlined" /> */}
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Citizenship:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Citizenship" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    State:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="State" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    District:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="District" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Town/City:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Town/City" variant="outlined" />

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
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Higher Qualification" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Employed In:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Employed In" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Occuption:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Occuption" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Annual Income:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Annual Income" variant="outlined" />

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
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Family Type" variant="outlined" />

                                            </div>
                                        </ListItem>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Fathers Occupation:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Fathers Occupation" variant="outlined" />

                                            </div>
                                        </ListItem>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Brothers:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Number of Brothers" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Brothers Married:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Number of Brothers Married" variant="outlined" />

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
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Family Status" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Mothers Occupation:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Mothers Occupation" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Sisters:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Number of Sisters" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Sisters Married:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Number of Sisters Married" variant="outlined" />

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
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Hobbies" variant="outlined" />

                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className='col-sm-6'>

                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Interests:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Interests" variant="outlined" />

                                            </div>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Typography gutterBottom variant="h5" component="div">
                                        About Me
                                    </Typography>
                                </div>
                                <div className='col-sm-12'>
                                    <TextField
                                        size="small" fullWidth
                                        rows={4}
                                        id="outlined-textarea"
                                        label="About me"
                                        placeholder="Describe yourself"
                                        multiline
                                    />
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Images
                                    </Typography>
                                </div>
                                <div className='col-sm-12'>
                                    <section className="image-container">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop Images here, or click to select Images</p>
                                        </div>
                                    </section>
                                    <div className='image-list'>
                                        {files}
                                    </div>
                                </div>
                            </div>
                            <br />
                        </form>)}
                </Formik>
            </div>
            {/* <Loading loading={loading} /> */}
            <ToastContainer />
        </div>

    )
}
export default EditProfile