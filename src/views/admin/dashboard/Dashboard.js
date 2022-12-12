import { useState, useEffect } from 'react';
import { CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CRow, CWidgetStatsF } from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import { Table } from 'antd';
import classNames from 'classnames/bind';

import * as adminDashboardServices from '../../../services/adminDashboardServices';
import styles from './Dashboard.module.scss';
const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số tiền đã sử dụng',
        dataIndex: 'money',
        key: 'money',
    },
];
const Dashboard = () => {
    const [revenue, setRevenue] = useState({
        label: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        data: [4, 5, 9, 11, 15, 13, 18],
    });
    const [countExample, setCountExample] = useState([
        { title: 'Ngành nghề', value: 2 },
        { title: 'Chuyên ngành', value: 50 },
        { title: 'Loại Membership', value: 5 },
        { title: 'Membership', value: 2000 },
    ]);
    const [freelancers, setFreelancers] = useState([]);
    const [recruiters, setRecruiters] = useState([]);

    const fetchApi = async () => {
        const result = await adminDashboardServices.getDashboard();
        setRevenue({
            label: result.label,
            data: result.revenues,
        });
        setCountExample([
            { title: 'Ngành nghề', value: result.totalCareer },
            { title: 'Chuyên ngành', value: result.totalSubCareer },
            { title: 'Loại Membership', value: 6 },
            { title: 'Membership', value: result.totalMemberShip },
        ]);
    };
    const getUserHotApi = async () => {
        const result = await adminDashboardServices.getUserHot();
        setFreelancers(result.freelancers);
        setRecruiters(result.recruiters);
    };
    useEffect(() => {
        fetchApi();
        getUserHotApi();
    }, []);

    const genderData = (data) => {
        return data.map((user) => {
            return {
                key: user.id,
                email: user.email,
                name: user.fullName,
                money: user.totalMoneyUsed,
            };
        });
    };
    return (
        <>
            <WidgetsDropdown />
            <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Doanh thu
                            </h4>
                            <div className="small text-medium-emphasis">
                                {revenue.label[0]} - {revenue.label[revenue.label.length - 1]}
                            </div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButtonGroup className="float-end me-3"></CButtonGroup>
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
                <div className={cx('top-revenue')}>
                    <div className={cx('top-revenue-item')}>
                        <h4>10 nhà tuyển dụng đóng góp doanh thu cao nhất</h4>
                        <Table
                            columns={columns}
                            dataSource={genderData(recruiters)}
                            pagination={false}
                            className={cx('top-revenue-table')}
                        />
                    </div>
                    <div className={cx('top-revenue-item')}>
                        <h4>10 freelancer đóng góp doanh thu cao nhất</h4>
                        <Table
                            dataSource={genderData(freelancers)}
                            columns={columns}
                            pagination={false}
                            className={cx('top-revenue-table')}
                        />
                    </div>
                </div>
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
