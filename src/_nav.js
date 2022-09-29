import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilCash, cilChartLine, cilList, cilListRich, cilPeople, cilStar, cilUser } from '@coreui/icons';
import { CNavItem } from '@coreui/react';
import config from './config';

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
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
        name: 'Recruiter',
        to: config.routes.recruiter,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Staff',
        to: config.routes.staff,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Career',
        to: config.routes.career,
        icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'SubCareer',
        to: config.routes.subCareer,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Service',
        to: config.routes.service,
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Payment',
        to: config.routes.payment,
        icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Support',
        to: config.routes.support,
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
];

export default _nav;
