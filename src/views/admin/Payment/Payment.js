import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import * as adminPaymentServices from '../../../services/adminPaymentServices';
import RequestPopup from './RequestPopup';
import Search from '../../../components/Search';
import styles from './Payment.module.scss';
const cx = classNames.bind(styles);
function Payment() {
    const status = ['Tất cả', 'Đã phê duyệt', 'Không phê duyệt', 'Chờ phê duyệt'];
    const headers = ['MÃ NẠP', 'ID KHÁCH HÀNG', 'SỐ TIỀN', 'NGÀY YÊU CẦU', 'NGÀY PHÊ DUYỆT'];

    const [requestPayment, setRequestPayment] = useState([]);
    const [show, setShow] = useState(false);
    const [request, setRequest] = useState(false);
    const [state, setState] = useState(status[0]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminPaymentServices.getPayments('a', '', 0);
            console.log(result);
            setRequestPayment(result.payments);
        };
        fetchApi();
    }, []);
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
                                    <td>{request.user_id}</td>
                                    <td>{request.money}</td>
                                    <td>{request.dateRequest}</td>
                                    <td>{request.dateApprove}</td>
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
