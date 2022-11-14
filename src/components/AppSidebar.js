import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';

import { AppSidebarNav } from './AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import { navAdmin, navStaff } from '../_nav';

const AppSidebar = () => {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);
    const account = useSelector((state) => state.account);
    const [items, setItems] = useState(navAdmin);
    useEffect(() => {
        if (account.role === 'staff') {
            setItems(navStaff);
        }
    }, []);
    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible });
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/"></CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={items} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
            />
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
