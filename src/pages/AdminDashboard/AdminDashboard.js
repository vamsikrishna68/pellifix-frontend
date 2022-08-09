import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography, FormControl, InputLabel, Select,MenuItem } from "@mui/material"
import './style.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };
    const labels = [1,2,3,4,5,6,7];
    const data = {
        labels,
        datasets: [
            {
                label: 'User Count',
                data: [10, 200, 400, 500, 500, 700, 800],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    return (
        <div className='container-fluid admin-dashboard'>
            <h1>Admin Dashboard</h1>
            <br />
            <div className='row'>
                <div className='col-sm-4'>
                    <Card elevation={3} className='card new'>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                New Users
                            </Typography>
                            <Typography variant="h4" color="textSecondary" component="p">
                                45
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-sm-4'>
                    <Card elevation={3} className='card active'>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Active Users
                            </Typography>
                            <Typography variant="h4" color="textSecondary" component="p">
                                1200
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-sm-4'>
                    <Card elevation={3} className='card inactive'>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Inactive Users
                            </Typography>
                            <Typography variant="h4" color="textSecondary" component="p">
                                200
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <br />

            <Card elevation={4}>

                <CardContent>
                    <FormControl variant="filled" style={{ width: '100%' }}>
                        <InputLabel htmlFor="filter">Filter</InputLabel>
                        <Select
                            inputProps={{
                                name: 'age',
                                id: 'filter',
                            }}
                        >
                            <MenuItem value={10}>Last Week</MenuItem>
                            <MenuItem value={20}>Last Month</MenuItem>
                            <MenuItem value={30}>Current Year</MenuItem>
                            <MenuItem value={30}>Last 6 Months</MenuItem>
                            <MenuItem value={30}>Last Year</MenuItem>
                            <MenuItem value={30}>Custom</MenuItem>
                        </Select>
                    </FormControl>
                    <br /><br />
                    <Line height={100} options={options} data={data} />
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboard