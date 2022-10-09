import './style.scss'
import {
    TextField,
    Select, InputLabel,
    FormControl, Typography,
    List, ListItem,
    MenuItem, InputAdornment, Card, Button,
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
import { useEffect, useState, useCallback } from 'react';
import { getDropwdownValues, getProfileData, updateProfileData, uploadImages } from '../../api/api'
import Loading from '../../ui-components/Loding/Loading';
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import { parse } from 'date-fns';



const EditProfile = () => {
    const religionList = religionsList.map(e => ({ label: e.name, value: e.name }))
    const [loading, setLoading] = useState(true)
    const [dropdownOptions, setDropdownOptions] = useState(null)


    const [casteList, setCasteList] = useState(religionsList.map(e => [...e.castes]).flat().map(e => ({ label: e.name, value: e.name })))
    const [formData, setFormData] = useState(
        {
            profile_creater: '',
            name: '',
            surname: '',
            marital_status: '',
            body_type: '',
            dob: new Date(),
            time_of_birth: new Date(),
            age: '',
            physical_status: '',
            height: 0,
            weight: 0,
            religion: '',
            caste: '',
            sub_caste: '',
            zodiac: '',
            star: '',
            eating_habit: '',
            drinking_habit: '',
            smoking_habit: '',
            country: '',
            city: '',
            state: '',
            education: '',
            occupation: '',
            employeed_in: '',
            salary: '',
            image: '',
            about_me: '',
            require_details: '',
            gender: '',
            profession: '',
            address: '',
            pincode: '',
            interests: '',
            hobbies: '',
            no_of_sisters_married: '',
            no_of_sisters: '',
            no_of_brothers_married: '',
            no_of_brothers: '',
            mothers_occupation: '',
            fathers_occupation: '',
            family_status: '',
            family_type: ''
        }
    )
    const [myFiles, setMyFiles] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        setMyFiles([...myFiles, ...acceptedFiles])
    }, [myFiles])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
    });


    const removeFile = file => () => {
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
    }



    const filterCasteByReligion = (religion) => {
        const filteredList = religionsList.filter(e => e.name === religion)[0].castes.map(e => ({ label: e.name, value: e.name }))
        setCasteList([...filteredList]);
    }

    const upload = async () => {
        const formData = new FormData();
        myFiles.forEach(e => {
            formData.append("images", e);
        })

        const response = await uploadImages(formData)
        console.log(response, "response")
    }

    const fetchDropdownsValues = async () => {
        const response = await getDropwdownValues(formData)
        setDropdownOptions(response.data)
    }



    const files = myFiles.map((file, index) => {
        const objectUrl = URL.createObjectURL(file)
        return (
            <div key={index} className='uploaded-image'>
                <IconButton onClick={removeFile(file)} size='small' className="clear-btn" color="primary" component="span">
                    <ClearIcon />
                </IconButton>
                <img src={objectUrl} />
            </div>
        )
    })


    useEffect(() => {
        fetchDropdownsValues()
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
                        const data = { ...values }
                        console.log(data, formData, "data")
                        Object.keys(data).forEach(e => {
                            if (data[e] == null) {
                                data[e] = ''
                            }
                        })
                        let payload = { ...formData, ...data }
                        payload.height = parseFloat(payload.height)
                        payload.weight = parseFloat(payload.weight)
                        payload.no_of_sisters_married = parseFloat(payload.no_of_sisters_married ? payload.no_of_sisters_married : 0)
                        payload.no_of_brothers_married = parseFloat(payload.no_of_brothers_married ? payload.no_of_brothers_married : 0)
                        payload.no_of_brothers = parseFloat(payload.no_of_brothers ? payload.no_of_brothers : 0)
                        payload.no_of_sisters = parseFloat(payload.no_of_sisters ? payload.no_of_sisters : 0)
                        payload.gender = payload.gender.toString()
                        delete payload.id
                        delete payload.created_by
                        delete payload.updated_by
                        delete payload.created_at
                        delete payload.updated_at
                        delete payload.images
                        delete payload.is_membership
                        delete payload.paid_status
                        delete payload.paid_date
                        delete payload.start_date
                        delete payload.end_date


                        console.log(payload, "payload")
                        updateProfile(payload)
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
                                                        {dropdownOptions?.GENDER.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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
                                                        {dropdownOptions?.PHYSICAL_STATUS.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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
                                                    value={values.height || 0}
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
                                                        {dropdownOptions?.MARITAL_STATUS.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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
                                                        {dropdownOptions?.SMOKING.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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
                                                        {dropdownOptions?.DRINKING.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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
                                                        {dropdownOptions?.BODY_TYPES.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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
                                                    value={values.weight || 0}
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


                                                <Autocomplete
                                                    disablePortal
                                                    id="language"
                                                    options={dropdownOptions?.MOTHER_TOUNGE_LIST ? dropdownOptions?.MOTHER_TOUNGE_LIST : []}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.id)
                                                        handleChange(v.id)
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
                                                        {dropdownOptions?.FOOD.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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

                                                    options={dropdownOptions?.RELIGION ? dropdownOptions?.RELIGION : []}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.id)
                                                        handleChange(v.id)
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

                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Caste</InputLabel>
                                                    <Select
                                                        name='caste'
                                                        label="Caste"
                                                        value={values.caste || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {dropdownOptions?.CASTE.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
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

                                                    options={dropdownOptions?.STAR_LIST ? dropdownOptions?.STAR_LIST : []}
                                                    size="small"
                                                    fullWidth
                                                    onChange={(e, v) => {
                                                        console.log(v)
                                                        filterCasteByReligion(v.id)
                                                        handleChange(v.id)
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.star || ''}
                                                    renderInput={(params) => <TextField {...params} label="Nakshtram" />}
                                                />

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

                                                    options={dropdownOptions?.ZODIAC_LIST ? dropdownOptions?.ZODIAC_LIST : []}
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
                                                        value={values.time_of_birth}
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

                                                    options={dropdownOptions?.COUNTRYS ? dropdownOptions?.COUNTRYS : []}
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
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} size="small" fullWidth label="Citizenship" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    State:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.state} size="small" fullWidth label="State" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    District:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} size="small" fullWidth label="District" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Town/City:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.city} size="small" fullWidth label="Town/City" variant="outlined" />

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
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.education} size="small" fullWidth label="Higher Qualification" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Employed In:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.employeed_in} size="small" fullWidth label="Employed In" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Occuption:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.occupation} size="small" fullWidth label="Occuption" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Annual Income:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.salary} size="small" fullWidth label="Annual Income" variant="outlined" />

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
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.family_type} size="small" fullWidth label="Family Type" variant="outlined" />

                                            </div>
                                        </ListItem>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Fathers Occupation:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.fathers_occupation} size="small" fullWidth label="Fathers Occupation" variant="outlined" />

                                            </div>
                                        </ListItem>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Brothers:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.no_of_brothers || 0} size="small" fullWidth label="Number of Brothers" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Brothers Married:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.no_of_brothers_married} size="small" fullWidth label="Number of Brothers Married" variant="outlined" />

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
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.family_status} size="small" fullWidth label="Family Status" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Mothers Occupation:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.mothers_occupation} size="small" fullWidth label="Mothers Occupation" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Sisters:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.no_of_sisters || 0} size="small" fullWidth label="Number of Sisters" variant="outlined" />

                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Number of Sisters Married:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField onChange={handleChange}
                                                    onBlur={handleBlur} value={values.no_of_sisters_married || 0} size="small" fullWidth label="Number of Sisters Married" variant="outlined" />

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
                                                <TextField size="small" onChange={handleChange}
                                                    onBlur={handleBlur} value={values.hobbies} fullWidth label="Hobbies" variant="outlined" />

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
                                                <TextField size="small" onChange={handleChange}
                                                    onBlur={handleBlur} value={values.interests} fullWidth label="Interests" variant="outlined" />

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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size="small" fullWidth
                                        rows={4}
                                        value={values.about_me}
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
                                    {
                                        acceptedFiles.length ?
                                            <Button onClick={() => upload()} style={{ width: '100%' }} variant="contained">Upload</Button> : ''
                                    }

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