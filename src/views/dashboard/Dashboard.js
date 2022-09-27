import React from 'react';
import { useState, useEffect } from 'react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import { CWidgetStatsF } from '@coreui/react';

const Dashboard = () => {
    const [revenue, setRevenue] = useState({
        label: ['January'],
        data: [4],
    });
    const [countExample, setCountExample] = useState([
        { title: 'Category', value: 2 },
        { title: 'Sub Category', value: 50 },
        { title: 'Service', value: 5 },
        { title: 'Request', value: 2000 },
    ]);

    // useEffect(() => {
    //     fetch('http://localhost:8080/dashboard/revenue')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setRevenue(data);
    //         });
    //     fetch('http://localhost:8080/dashboard/count')
    //         .then((response) => response.json())
    //         .then((data) => setCountExample(data));
    // }, []);

    return (
        <>
            <WidgetsDropdown />
            <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Revenue
                            </h4>
                            <div className="small text-medium-emphasis">
                                {revenue.label[0]} - {revenue.label[revenue.label.length - 1]}
                            </div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButtonGroup className="float-end me-3">
                                {['Day', 'Month', 'Year'].map((value) => (
                                    <CButton
                                        color="outline-secondary"
                                        key={value}
                                        className="mx-0"
                                        active={value === 'Month'}
                                    >
                                        {value}
                                    </CButton>
                                ))}
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <CChartLine
                        style={{ height: '300px', marginTop: '40px' }}
                        data={{
                            labels: revenue.label,
                            datasets: [
                                {
                                    label: 'Revenue',
                                    backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                                    borderColor: getStyle('--cui-info'),
                                    pointHoverBackgroundColor: getStyle('--cui-info'),
                                    borderWidth: 2,
                                    data: revenue.data,
                                    fill: true,
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                },
                                y: {
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 5,
                                        stepSize: Math.ceil(Math.max.apply(Math, revenue.data) / 5),
                                        max: Math.max.apply(Math, revenue.data),
                                    },
                                },
                            },
                            elements: {
                                line: {
                                    tension: 0.4,
                                },
                                point: {
                                    radius: 0,
                                    hitRadius: 10,
                                    hoverRadius: 4,
                                    hoverBorderWidth: 3,
                                },
                            },
                        }}
                    />
                </CCardBody>
                <CCardFooter>
                    <CRow>
                        <CCol sm={6} lg={3}>
                            <CWidgetStatsF
                                className="mb-6"
                                color="info"
                                title={countExample[0].title}
                                value={countExample[0].value + ' ' + countExample[0].title}
                            />
                        </CCol>
                        <CCol sm={6} lg={3}>
                            <CWidgetStatsF
                                className="mb-6"
                                color="info"
                                title={countExample[1].title}
                                value={countExample[1].value + ' ' + countExample[1].title}
                            />
                        </CCol>
                        <CCol sm={6} lg={3}>
                            <CWidgetStatsF
                                className="mb-6"
                                color="info"
                                title={countExample[2].title}
                                value={countExample[2].value + ' ' + countExample[2].title}
                            />
                        </CCol>
                        <CCol sm={6} lg={3}>
                            <CWidgetStatsF
                                className="mb-6"
                                color="info"
                                title={countExample[3].title}
                                value={countExample[3].value + ' ' + countExample[3].title}
                            />
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>
        </>
    );
};

export default Dashboard;
