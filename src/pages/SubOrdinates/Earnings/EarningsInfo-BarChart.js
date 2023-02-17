import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function EarningsInfo_BarChart(props) {
    const labels=props.labels;
    const state = {
        labels,
        datasets: [
            {
                label: 'My Earnings',
                data: labels.map((item, index) => props.data && props.data[index] && props.data[index].amount),
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow", 'plum', 'lightgreen', 'blue', 'lightblue', 'pink', 'brown'],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow", 'plum', 'lightgreen', 'blue', 'lightblue', 'pink', 'brown'],
                barThickness: 15,
                borderWidth: 1,
            }
        ],
    }

    return (
        <div
            className="container-fluid">
            <Bar
                data={state}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: false,
                            text: 'My Earnings',
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        },

                    },
                    elements: {
                        point: {
                            radius: 1
                        }
                    },

                    maintainAspectRatio: false,
                    aspectRatio: 2 / 3
                }}
                width={'400px'}
                height={'300px'}
            />
        </div>
    )

}

export default EarningsInfo_BarChart;