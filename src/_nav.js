import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilCash, cilChartLine, cilList, cilListRich, cilStar, cilUser } from '@coreui/icons';
import { CNavItem } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from './config';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

export const navAdmin = [
    {
        component: CNavItem,
        name: 'Bảng điều khiển',
        to: config.routes.dashboard,
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Freelancer',
        to: config.routes.freelancer,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Nhà tuyển dụng',
        to: config.routes.recruiter,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Nhân viên',
        to: config.routes.staff,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Hội viên',
        to: config.routes.service,
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Ngành nghề',
        to: config.routes.career,
        icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Chuyên ngành',
        to: config.routes.subCareer,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    },
];
export const navStaff = [
    {
        component: CNavItem,
        name: 'Freelancer',
        to: config.routes.freelancer,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Nhà tuyển dụng',
        to: config.routes.recruiter,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },

    {
        component: CNavItem,
        name: 'Thanh toán',
        to: config.routes.payment,
        icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Bài đăng',
        to: config.routes.post,
        icon: <FontAwesomeIcon icon={faClipboard} className="nav-icon-custom" />,
    },
    {
        component: CNavItem,
        name: 'Báo cáo',
        to: config.routes.report,
        icon: <FontAwesomeIcon icon={faFlag} className="nav-icon-custom" />,
    },
];
