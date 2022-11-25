import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import classNames from 'classnames/bind';
import Menu from './Popper/Menu';

import config from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faRightFromBracket, faUnlock } from '@fortawesome/free-solid-svg-icons';
import styles from './Component.module.scss';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUnlock} />,
        title: 'Đổi mật khẩu',
        to: '/changePasswordForAdmin',
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Đăng xuất',
        to: config.routes.login,
    },
];

const AppHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state) => state.sidebarShow);

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderBrand className="mx-auto d-md-none" to="/"></CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-margin-left">
                    <CNavItem></CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <Menu items={MENU_ITEMS} hideOnClick>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </CHeaderNav>
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
