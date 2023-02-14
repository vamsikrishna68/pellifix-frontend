import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAssociateEarningsInfo } from '../../../api/api';
import EarningsInfo_LineChart from './EarningInfo-LineChart';
import EarningsInfo_BarChart from './EarningsInfo-BarChart';
import EarningsInfo_PieChart from './EarningsInfo-PieChart';

function EarningsInfo() {
    const [chartDisplayType, setChartDisplayType] = useState('YEAR');
    const [earningsData, setEarningsData] = useState([]);
    const labels = {
        DAY: [],
        MONTH: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'],
        YEAR: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027']
    }
    useEffect(() => {
        getEarnings();
    }, [])

    const getEarnings = async () => {
        try {
            const response = await getAssociateEarningsInfo(chartDisplayType);
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

    return (
        <div className="row container-fluid">
            <div className='col-md-6 col-lg-4'>
                <EarningsInfo_BarChart chartDisplayType={chartDisplayType} data={earningsData}
                    labels={labels[chartDisplayType]} />
            </div>
            <div className='col-md-6 col-lg-4'>
                <EarningsInfo_LineChart chartDisplayType={chartDisplayType} data={earningsData}
                    labels={labels[chartDisplayType]} />
            </div>
            <div className='col-md-6 col-lg-4'>
                <EarningsInfo_PieChart chartDisplayType={chartDisplayType} data={earningsData}
                    labels={labels[chartDisplayType]} />
            </div>
        </div>
    )

}

export default EarningsInfo;