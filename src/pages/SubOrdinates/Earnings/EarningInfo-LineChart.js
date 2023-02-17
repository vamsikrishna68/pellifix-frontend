import React, { useEffect, useState } from 'react';
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
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
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
};

function EarningsInfo_LineChart(props) {
    const labels = props.labels;
    const state = {
        labels,
        datasets: [
            {
                label: 'My Earnings',
                data: labels.map((item, index) => props.data && props.data[index] && props.data[index].amount),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)'
            }
        ],
    }

    return (
        <div
            className="container-fluid">
            <Line
                data={state}
                options={options}
                width={'400px'}
                height={'300px'}
            />
        </div>
    )

}

export default EarningsInfo_LineChart;