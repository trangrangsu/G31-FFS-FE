import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Space, Pagination } from 'antd';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import * as transactionServices from '../../../services/transactionServices';
import config from '../../../config';
import images from '../../../assets/images';
import styles from './RechargeHistory.module.scss';
import Button from '../../../components/Button';
const cx = classNames.bind(styles);
const dateFormat = 'DD-MM-YYYY';
const customFormat = (value) => `${value.format(dateFormat)}`;
const RechargeHistory = () => {
    const account = useSelector((state) => state.account);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [recharges, setRecharges] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [disable, setDisable] = useState(false);

    const headers = ['Mã giao dịch', 'Giá trị', 'Thời gian'];
    const getServicesApi = async (from, to, pageIndex) => {
        const result = await transactionServices.getTransactionHistory(account.userId, from, to, pageIndex);
        console.log(result);
        if (typeof result === 'object') {
            setRecharges(result.results);
            setTotalResults(result.totalResults);
        }
    };
    useEffect(() => {
        getServicesApi(from, to, 0);
    }, []);
    useEffect(() => {
        if (from === '' && to === '') {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [from, to]);
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const stringFormat = (dateString) => {
        return dateString.slice(6, 10) + dateString.slice(2, 6) + dateString.slice(0, 2);
    };
    const onChangeFrom = (date, dateString) => {
        setFrom(stringFormat(dateString));
    };
    const onChangeTo = (date, dateString) => {
        setTo(stringFormat(dateString));
    };
    const onChange = (page, pageSize) => {
        getServicesApi(from, to, page - 1);
    };
    const handleSearch = () => {
        getServicesApi(from, to, 0);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('bannerSale_left')}>
                    <img src={images.sales} className={cx('mb-bank')} alt="banner" />
                </div>

                <div className={cx('container')}>
                    <div className={cx('container-header')}>
                        <div className={cx('title')}>
                            <h2>Lịch sử giao dịch</h2>
                        </div>
                        <div>
                            <Button
                                to={config.routes.recharge}
                                leftIcon={<FontAwesomeIcon icon={faWallet} className={cx('faWallet')} />}
                                className={cx('btn-recharge')}
                            >
                                Nạp tiền
                            </Button>
                        </div>
                    </div>
                    <div className={cx('container-first')}>
                        <div className={cx('container-date-first')}>
                            <label className={cx('label')}>Từ</label>
                            <Space direction="vertical" className="custom">
                                <DatePicker onChange={onChangeFrom} format={customFormat} />
                            </Space>
                        </div>
                        <div className={cx('container-date-second')}>
                            <label className={cx('label')}>Đến</label>
                            <Space direction="vertical" className="custom">
                                <DatePicker onChange={onChangeTo} format={customFormat} />
                            </Space>
                        </div>
                        <div className={cx('icon')}>
                            {disable ? (
                                <Button primary disabled className={cx('button-search')} onClick={handleSearch}>
                                    Tìm kiếm
                                </Button>
                            ) : (
                                <Button primary className={cx('button-search')} onClick={handleSearch}>
                                    Tìm kiếm
                                </Button>
                            )}
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
                                        <tr key={recharge.id}>
                                            <td>{recharge.paymentCode}</td>
                                            <td>{recharge.amount} $</td>
                                            <td>{recharge.dateRequest}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className={cx('paging')}>
                            <Pagination defaultCurrent={1} pageSize="10" total={totalResults} onChange={onChange} />
                        </div>
                    </div>
                </div>
                <div className={cx('bannerSale_right')}>
                    <img src={images.sales} className={cx('mb-bank')} alt="banner" />
                </div>
            </div>
        </div>
    );
};

export default RechargeHistory;
