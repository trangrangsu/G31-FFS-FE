import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import classNames from 'classnames/bind';

import styles from './Statistic.module.scss';
const cx = classNames.bind(styles);
const Statistic = () => {
    return <div className={cx('wrapper')}>Statistic</div>;
};

export default Statistic;
