import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from '../../../config';
import Button from '../../../components/Button';
import styles from './SearchJob.module.scss';

const cx = classNames.bind(styles);
const postDetail = {
    postID: 100,
    avatar: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffpttelecom.net.vn%2Fstorage%2Fmedia%2F1vesPKZS1Endp5TFr7hXSTtgG4n0I5ZiLpHmu7m7.jpeg&imgrefurl=https%3A%2F%2Ffpttelecom.net.vn%2Ftai-sao-ban-nen-lam-viec-tai-fpt-telecom&tbnid=FqPOn8Wwp4q7BM&vet=12ahUKEwi7xKmb_977AhUHgJQKHWp1BUIQMygQegUIARDcAQ..i&docid=vQi3cVbZqEr16M&w=674&h=1024&q=fpt&ved=2ahUKEwi7xKmb_977AhUHgJQKHWp1BUIQMygQegUIARDcAQ',
    jobTitle: 'Thiết kế website bán quần áo online',
    subCareer: 'Lập trình website',
    paymentType: 'Trả theo dự án',
    budget: '4.000.000 VNĐ',
    area: 'Hà Nội',
};
function TopItem({ post, userId }) {
    const navigate = useNavigate();

    const handleViewDetail = () => {
        const to = {
            pathname: config.routes.viewDetailPost,
            search: `?id=${post.postID}`,
        };
        navigate(to);
    };
    return <div className={cx('wrapper-top')}></div>;
}

export default TopItem;
