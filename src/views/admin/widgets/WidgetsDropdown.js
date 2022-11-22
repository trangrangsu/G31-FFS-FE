import React from 'react';
import { useState, useEffect } from 'react';
import { CRow, CCol, CWidgetStatsA } from '@coreui/react';
import { getStyle } from '@coreui/utils';
import { CChartBar, CChartLine } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilArrowBottom, cilArrowTop } from '@coreui/icons';

import * as adminDashboardServices from '../../../services/adminDashboardServices';
const WidgetsDropdown = () => {
    const [datas, setDatas] = useState([
        {
            title: 'Freelancer',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            // data: [0, 0, 0, 0, 0, 1, 19],
            data: [2, 4, 3.5, 6, 5, 7, 9, 11],
        },
        {
            title: 'Recruiter',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            data: [1, 1.5, 1.2, 2, 2.1, 3, 2.5, 5],
        },
        {
            title: 'Posts',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            data: [10, 12, 11, 12.7, 13, 15, 17, 19],
        },
        {
            title: 'Apply',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            data: [12, 14, 13, 14.9, 15.6, 17, 19, 21],
        },
    ]);
    const fetchApi = async () => {
        const result = await adminDashboardServices.getDashboard();
        setDatas([
            {
                title: 'Freelancer',
                labels: result.label,
                data: result.freelancers,
            },
            {
                title: 'Nhà Tuyển dụng',
                labels: result.label,
                data: result.recruiters,
            },
            {
                title: 'Bài đăng',
                labels: result.label,
                data: result.posts,
            },
            {
                title: 'Lượt ứng tuyển',
                labels: result.label,
                data: result.applies,
            },
        ]);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    const freelancerPercent =
        ((datas[0].data[datas[0].data.length - 1] / datas[0].data[datas[0].data.length - 2]) * 100).toFixed(2) - 100;

    const recruiterPercent =
        ((datas[1].data[datas[1].data.length - 1] / datas[1].data[datas[1].data.length - 2]) * 100).toFixed(2) - 100;

    const postsPercent =
        ((datas[2].data[datas[2].data.length - 1] / datas[2].data[datas[2].data.length - 2]) * 100).toFixed(2) - 100;
    const recruitmentPercent =
        ((datas[3].data[datas[3].data.length - 1] / datas[3].data[datas[3].data.length - 2]) * 100).toFixed(2) - 100;

    return (
        <CRow>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={
                        <>
                            {datas[0].data[datas[0].data.length - 1]}{' '}
                            {datas[0].data[datas[0].data.length - 2] !== 0 && (
                                <span className="fs-6 fw-normal">
                                    ({freelancerPercent}
                                    {'% '}
                                    {freelancerPercent > 0 ? (
                                        <CIcon icon={cilArrowTop} />
                                    ) : (
                                        <CIcon icon={cilArrowBottom} />
                                    )}{' '}
                                    )
                                </span>
                            )}
                        </>
                    }
                    title={datas[0].title}
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: datas[0].labels,
                                datasets: [
                                    {
                                        label: datas[0].title,
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: getStyle('--cui-primary'),
                                        data: datas[0].data,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: Math.min.apply(Math, datas[0].data) - 2,
                                        max: Math.max.apply(Math, datas[0].data) + 2,
                                        // min: Math.min.apply(Math, datas[0].data) - Math.min.apply(Math, datas[0].data),
                                        // max: Math.max.apply(Math, datas[0].data) + Math.min.apply(Math, datas[0].data),
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={
                        <>
                            {datas[1].data[datas[1].data.length - 1]}{' '}
                            {datas[1].data[datas[1].data.length - 2] !== 0 && (
                                <span className="fs-6 fw-normal">
                                    ({recruiterPercent}
                                    {'% '}
                                    {recruiterPercent > 0 ? (
                                        <CIcon icon={cilArrowTop} />
                                    ) : (
                                        <CIcon icon={cilArrowBottom} />
                                    )}{' '}
                                    )
                                </span>
                            )}
                        </>
                    }
                    title={datas[1].title}
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: datas[1].labels,
                                datasets: [
                                    {
                                        label: datas[1].title,
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: getStyle('--cui-info'),
                                        data: datas[1].data,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: Math.min.apply(Math, datas[1].data) - 2,
                                        max: Math.max.apply(Math, datas[1].data) + 2,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="warning"
                    value={
                        <>
                            {datas[2].data[datas[2].data.length - 1]}{' '}
                            {datas[2].data[datas[2].data.length - 2] !== 0 && (
                                <span className="fs-6 fw-normal">
                                    ({postsPercent.toFixed(2)}
                                    {'% '}
                                    {postsPercent > 0 ? (
                                        <CIcon icon={cilArrowTop} />
                                    ) : (
                                        <CIcon icon={cilArrowBottom} />
                                    )}{' '}
                                    )
                                </span>
                            )}
                        </>
                    }
                    title={datas[2].title}
                    chart={
                        <CChartLine
                            className="mt-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: datas[2].labels,
                                datasets: [
                                    {
                                        label: datas[2].title,
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: datas[2].data,
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        display: false,
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 2,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value={
                        <>
                            {datas[3].data[datas[3].data.length - 1]}{' '}
                            {datas[3].data[datas[3].data.length - 2] !== 0 && (
                                <span className="fs-6 fw-normal">
                                    ({recruitmentPercent.toFixed(2)}
                                    {'% '}
                                    {recruitmentPercent > 0 ? (
                                        <CIcon icon={cilArrowTop} />
                                    ) : (
                                        <CIcon icon={cilArrowBottom} />
                                    )}{' '}
                                    )
                                </span>
                            )}
                        </>
                    }
                    title={datas[3].title}
                    chart={
                        <CChartBar
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: datas[3].labels,
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: datas[3].data,
                                        barPercentage: 0.6,
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
                                            display: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
        </CRow>
    );
};

export default WidgetsDropdown;
