import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CPagination, CPaginationItem } from '@coreui/react';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

import images from '../../../assets/images';
import styles from './RechargeHistory.module.scss';
import Button from '../../../components/Button';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const RechargeHistory = () => {
    const headers = ['Mã giao dịch', 'Giá trị', 'Thời gian'];
    const recharges = [
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
        {
            payment_code: 'ABC1523',
            amount: '360.000đ',
            date: '11/10/2022 20:00',
        },
    ];
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bannerSale')}>
                <div className={cx('banner_wrap')}>
                    <div className={cx('bannerSale_left')}>
                        <a href="..">
                            <img src={images.sales} className={cx('mb-bank')} />
                        </a>
                    </div>
                    <div className={cx('bannerSale_right')}>
                        <a href="..">
                            <img src={images.sales} className={cx('mb-bank')} />
                        </a>
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('container-header')}>
                    <h2>Lịch sử giao dịch</h2>
                    <div className={cx('container-header-name')}>
                        <FontAwesomeIcon icon={faWallet} className={cx('faWallet')} />
                        <a href="..">Nạp tiền</a>
                    </div>
                </div>
                <div className={cx('container-first')}>
                    <div className={cx('container-date-first')}>
                        <tr>
                            <td>Từ</td>
                            <td>
                                <Space direction="vertical" className="custom">
                                    <DatePicker onChange={onChange} />
                                </Space>
                            </td>
                        </tr>
                    </div>
                    <div className={cx('container-date-second')}>
                        <tr>
                            <td>Đến</td>
                            <td>
                                <Space direction="vertical" className="custom">
                                    <DatePicker onChange={onChange} />
                                </Space>
                            </td>
                        </tr>
                    </div>
                    <div className={cx('icon')}>
                        <Button primary className={cx('button-search')}>
                            <h6>Tìm kiếm</h6>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('recharge')}>
                <table className={cx('recharges')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {recharges.map((recharge) => {
                            return (
                                <tr key={recharge.payment_code}>
                                    <td>{recharge.payment_code}</td>
                                    <td>{recharge.amount}</td>
                                    <td>{recharge.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active className={cx('active-page')}>
                        1
                    </CPaginationItem>
                    <CPaginationItem>2</CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </div>
        </div>
    );
};

export default RechargeHistory;
