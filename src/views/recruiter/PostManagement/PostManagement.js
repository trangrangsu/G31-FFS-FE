import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import classNames from 'classnames/bind';

import styles from './PostManagement.module.scss';
const cx = classNames.bind(styles);
const PostManagement = () => {
    return <div className={cx('wrapper')}>PostManagement</div>;
};

export default PostManagement;
