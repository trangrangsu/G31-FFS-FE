import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import classNames from 'classnames/bind';

import styles from './UserService.module.scss';
const cx = classNames.bind(styles);
const UserService = () => {
    return <div className={cx('wrapper')}>UserService</div>;
};

export default UserService;
