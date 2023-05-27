import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


function EarningsInfo_PieChart(props) {
    const labels=props.labels;
    const state = {
        labels,
        datasets: [
            {
                label: 'My Earnings',
                data: labels.map((item, index) => props.data && props.data[index] && props.data[index].amount),
                backgroundColor: [
                    'rgba(178, 222, 39, 1)',
                    'rgba(145, 180, 150, 1)',
                    'rgba(255, 99, 71, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(247, 202, 24, 1)',
                    'rgba(154, 0, 0, 0.1)',
                    'rgba(38, 194, 129, 1)',
                    'rgba(0, 0, 0, 0.1)',
                    'rgba(255, 210, 212, 0.5)',
                    'rgba(3, 201, 169, 1)',
                    'rgba(255, 210, 71, 0.5)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(178, 222, 39, 1)',
                    'rgba(145, 180, 150, 1)',
                    'rgba(255, 99, 71, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(247, 202, 24, 1)',
                    'rgba(154, 0, 0, 0.1)',
                    'rgba(38, 194, 129, 1)',
                    'rgba(0, 0, 0, 0.1)',
                    'rgba(255, 210, 212, 0.5)',
                    'rgba(3, 201, 169, 1)',
                    'rgba(255, 210, 71, 0.5)',
                    'rgba(153, 102, 255, 0.2)',
                ],
            }
        ],
    }

    return (
        <div className="container-fluid">
            <Pie
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

export default EarningsInfo_PieChart;