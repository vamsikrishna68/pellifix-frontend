import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getEarningsInfo } from '../../../api/api';
import EarningsInfo_LineChart from './EarningInfo-LineChart';
import EarningsInfo_BarChart from './EarningsInfo-BarChart';
import EarningsInfo_PieChart from './EarningsInfo-PieChart';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { makeStyles } from '@mui/styles';

import {
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl
} from "@mui/material";

const useStyles = makeStyles({
    chart_dropdown_width: {
        width: '80%',
        '@media (min-width: 680px)': {
            width: '25%'
        },
        height: 40
    }
});

function EarningsInfo() {
    const [chartDisplayType, setChartDisplayType] = useState('YEAR');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dropdownOptions, setDropdownOptions] = useState([
        { id: 1, name: 'Line Chart' },
        { id: 2, name: 'Bar Chart' },
        { id: 3, name: 'Pie Chart' }
    ]);
    const [chartType, setChartType] = useState(1);


    const [earningsData, setEarningsData] = useState([]);
    const labels = {
        DAY: [],
        MONTH: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'],
        YEAR: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027']
    }
    const classes = useStyles();

    useEffect(() => {
        getEarnings();
    }, [])

    const getEarnings = async () => {
        try {
            const response = await getEarningsInfo(chartDisplayType);
            if (response.status === 200) {
                if (chartDisplayType == 'MONTH') {
                    formatEarnigsData(response.data, chartDisplayType);
                    return;
                }
                if (chartDisplayType == 'YEAR') {
                    formatEarnigsData(response.data, chartDisplayType);
                    return;
                }
                setEarningsData(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const formatEarnigsData = (list, type) => {
        let modifiedList = [];
        let monthInfo = {};
        labels[chartDisplayType].map((name, monthindex) => {
            list.map((item, index) => {
                const d = new Date(item.date);
                if (d.getMonth() == monthindex && type == 'MONTH') {
                    monthInfo = item;
                } else if (d.getFullYear() == name && type == 'YEAR') {
                    monthInfo = item;
                }
            });
            if (monthInfo && monthInfo.date && (type == 'MONTH' || type == 'YEAR')) {
                modifiedList.push(monthInfo);
            } else {
                modifiedList.push({
                    date: '', amount: 0
                })
            }
            monthInfo = {};
        })
        setEarningsData(modifiedList)
    }

    const handleDropdownChange = (event) => {
        setChartType(event.target.value)
    }

    return (
        <>
            {/* <div className='row container-fluid'>
                <div className='col-md-6'>
                    <div className='row container-fluid mb-5'>
                        <div className='col-md-5'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    name="startDate"
                                    label="From"
                                    value={startDate}
                                    onChange={(value) =>
                                        setFieldValue("startDate", value, true)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            name="startDate"
                                            size="small"
                                            fullWidth
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                        </div>
                        <div className='col-md-2'>
                        </div>
                        <div className='col-md-5'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    name="endDate"
                                    label="To"
                                    value={endDate}
                                    onChange={(value) =>
                                        setFieldValue("endDate", value, true)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            name="endDate"
                                            size="small"
                                            fullWidth
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>  */}

            <div className='row container-fluid'>
                <FormControl>
                    <InputLabel id="demo-simple-select-required-label">Chart Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        name="chartType"
                        label="Chart Type"
                        value={chartType || ""}
                        onChange={handleDropdownChange}
                        // onBlur={handleBlur}
                        className={classes.chart_dropdown_width}
                    >
                        {dropdownOptions?.map(
                            (option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
            </div>
            <div className="row container-fluid justify-content-center">
                <div className='col-12 mt-5'>

                    {chartType === 1 ?
                        <EarningsInfo_LineChart chartDisplayType={chartDisplayType} data={earningsData}
                            labels={labels[chartDisplayType]} />
                        : null}

                    {chartType === 2 ?
                        <EarningsInfo_BarChart chartDisplayType={chartDisplayType} data={earningsData}
                            labels={labels[chartDisplayType]} />
                        : null}
                        
                    {chartType === 3 ?
                        <EarningsInfo_PieChart chartDisplayType={chartDisplayType} data={earningsData}
                            labels={labels[chartDisplayType]} />
                        : null}
                </div>

            </div>
        </>
    )

}

export default EarningsInfo;