import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
const Profile = () => {
    return <div className={cx('wrapper')}>Profile</div>;
};

export default Profile;
