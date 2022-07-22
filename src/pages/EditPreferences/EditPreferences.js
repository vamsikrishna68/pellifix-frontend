import './style.scss'
import {
    TextField,
    Select, InputLabel,
    FormControl, Typography,
    List, ListItem,
    MenuItem, InputAdornment,
    Fab, Autocomplete, Slider
} from '@mui/material';
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { Formik } from "formik";
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

const EditPreferences = () => {
    const religionList = religionsList.map(e => ({ label: e.name, value: e.name }))
    const [loading, setLoading] = useState(true)
    const [casteList, setCasteList] = useState(religionsList.map(e => [...e.castes]).flat().map(e => ({ label: e.name, value: e.name })))
    // const [formData, setFormData] = useState({
    //     name: '',
    //     surname: '',
    //     gender: null,
    //     dob: null,
    //     physicalStatus: null,
    //     bodyType: null,
    //     height: null,
    //     weight: null,
    //     maritalStatus: null,
    //     motherTounge: null,
    //     smokingHabit: null,
    //     eatingHabit: null,
    //     drinkingHabit: null,
    //     religion: null,
    //     nakshtram: null,
    //     caste: null,
    //     raasi: null,
    //     dot: null,
    //     country: null,
    //     citizen: null,
    //     state: null,
    //     district: null,
    //     city: null,
    //     higherQualification: null,
    //     employedIn: null,
    //     occupation: null,
    //     annualIncome: null,
    //     familyType: null,
    //     familyStatus: null,
    //     fathersOccupation: null,
    //     mothersOccupation: null,
    //     noOfBrothers: null,
    //     noOfBrothersMarried: null,
    //     noOfSisters: null,
    //     noOfSistersMarried: null,
    //     hobbies: null,
    //     interests: null,
    //     aboutMe: null

    // })

    const filterCasteByReligion = (religion) => {
        const filteredList = religionsList.filter(e => e.name === religion)[0].castes.map(e => ({ label: e.name, value: e.name }))
        setCasteList([...filteredList])
    }
    return (
        <div className="container-fluid edit-preferences">
            <div>
                <h1>Edit Preferences</h1>
                <br />
                <Formik
                    enableReinitialize
                    initialValues={{
                        age: [20, 37],
                        height: [4.5, 6.5],
                        maritalStatus: ''
                    }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {

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
                                <SaveIcon /> Save Preferences
                            </Fab>
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Basic Preference
                                        </Typography>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <List>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Age (Years):
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Slider
                                                    min={18}
                                                    max={60}
                                                    marks
                                                    name="age"
                                                    value={values.age}
                                                    onChange={handleChange}
                                                    valueLabelDisplay="on"
                                                />
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
                                                        name='maritalStatus'
                                                        label="Marital Status"
                                                        value={values.maritalStatus || ''}
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
                                                    Physical Status:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel >Physical Status</InputLabel>
                                                    <Select
                                                        name='physicalStatus'
                                                        label="Physical Status"
                                                        value={values.physicalStatus || ''}
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
                                                    Smoking Habit:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel > Smoking Habit</InputLabel>
                                                    <Select
                                                        name='smokingHabit'
                                                        label="Smoking Habit"
                                                        value={values.smokingHabit || ''}
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
                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <List>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Height (Feet):
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6" style={{ display: 'flex' }}>
                                                <Slider
                                                    min={4}
                                                    max={7}
                                                    marks
                                                    step={0.5}
                                                    name="height"
                                                    value={values.height}
                                                    onChange={handleChange}
                                                    valueLabelDisplay="on"
                                                />
                                            </div>
                                        </ListItem>
                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Mother Tounge:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormControl size="small" fullWidth>
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
                                                </FormControl>

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
                                                        name='eatingHabit'
                                                        label="Eating Habit"
                                                        value={values.eatingHabit || ''}
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
                                                        name='drinkingHabit'
                                                        label="Drinking Habit"
                                                        value={values.drinkingHabit || ''}
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
                            </div>
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Religion Preference
                                        </Typography>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
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

                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <List>
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
                            </div>
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Horoscopic Preference
                                        </Typography>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
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


                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <List>
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
                                    </List>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Professional Preference
                                        </Typography>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
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

                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <List>
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
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Location Preference
                                        </Typography>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <List>

                                        <ListItem className="row">
                                            <div className="col-sm-4">
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Country:
                                                </Typography>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField size="small" fullWidth label="Country" variant="outlined" />
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

                                    </List>
                                </div>
                                <div className='col-sm-6'>
                                    <List>
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
                            </div>
                        </form>)}
                </Formik>
            </div>
        </div>
    )
}
export default EditPreferences