import classNames from 'classnames/bind';
import React from 'react';

import { faUserPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import styles from './ViewDetailPost.module.scss';
const cx = classNames.bind(styles);
function ViewDetailPost() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>ViewDetailPost</div>
        </div>
    );
}

export default ViewDetailPost;
