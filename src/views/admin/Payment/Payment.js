import { useState } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import RequestPopup from './RequestPopup';
import Search from '../../../components/Search';
import styles from './Payment.module.scss';
const cx = classNames.bind(styles);
function Payment() {
    const status = ['Tất cả', 'Đã phê duyệt', 'Không phê duyệt', 'Chờ phê duyệt'];
    const headers = ['MÃ NẠP', 'ID KHÁCH HÀNG', 'SỐ TIỀN', 'NGÀY YÊU CẦU', 'NGÀY PHÊ DUYỆT'];
    const requestPayment = [
        {
            code: 'AB1230',
            id: '1',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '16-10-2022 10:35',
            state: 0,
            description: 'Vi phạm quy định',
        },
        {
            code: 'AB1231',
            id: '2',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '16-10-2022 10:35',
            state: 1,
            description: 'Đã duyệt',
        },
        {
            code: 'AB1232',
            id: '3',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '',
            state: 2,
            description: '',
        },
        {
            code: 'AB1233',
            id: '4',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '16-10-2022 10:35',
        },
        {
            code: 'AB1234',
            id: '5',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '16-10-2022 10:35',
        },
        {
            code: 'AB1235',
            id: '6',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '16-10-2022 10:35',
        },
        {
            code: 'AB1236',
            id: '7',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '16-10-2022 10:35',
        },
        {
            code: 'AB1237',
            id: '8',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '',
        },
        {
            code: 'AB1238',
            id: '9',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '',
        },
        {
            code: 'AB1239',
            id: '10',
            money: '50000',
            date_request: '16-10-2022 10:30',
            date_approve: '',
        },
    ];

    const [show, setShow] = useState(false);
    const [request, setRequest] = useState(false);
    const [state, setState] = useState(status[0]);

    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };

    const handleViewDetail = (request) => {
        setRequest(request);
        setShow(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Yêu Cầu Nạp Tiền</h1>

                <div className={cx('request-filter')}>
                    <div className={cx('request-list')}>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            {status.map((state, index) => {
                                return (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('subCareer-search')}>
                        <Search title="Tìm kiếm mã nạp" />
                    </div>
                    {show && (
                        <RequestPopup
                            request={request}
                            callback={() => {
                                setShow(false);
                            }}
                        />
                    )}
                </div>

                <table className={cx('subCareers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {requestPayment.map((request) => {
                            return (
                                <tr key={request.code} onClick={() => handleViewDetail(request)}>
                                    <td>{request.code}</td>
                                    <td>{request.id}</td>
                                    <td>{request.money}</td>
                                    <td>{request.date_request}</td>
                                    <td>{request.date_approve}</td>
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
}

export default Payment;
