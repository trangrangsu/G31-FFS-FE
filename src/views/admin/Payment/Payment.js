import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import * as adminPaymentServices from '../../../services/adminPaymentServices';
import RequestPopup from './RequestPopup';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './Payment.module.scss';
const cx = classNames.bind(styles);
function Payment() {
    const status = ['Tất cả', 'Đã phê duyệt', 'Không phê duyệt', 'Chờ phê duyệt'];

    const headers = ['MÃ NẠP', 'ID KHÁCH HÀNG', 'SỐ TIỀN', 'NGÀY YÊU CẦU', 'NGÀY PHÊ DUYỆT'];

    const [updatePage, setUpdatePage] = useState(0);
    const [requestPayment, setRequestPayment] = useState([]);
    const [show, setShow] = useState(false);
    const [request, setRequest] = useState({});
    const [state, setState] = useState(status[0]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const fetchApi = async (pIndex) => {
        let s = -1;
        if (state === 'Đã phê duyệt') {
            s = 1;
        } else if (state === 'Không phê duyệt') {
            s = 0;
        } else if (state === 'Chờ phê duyệt') {
            s = 2;
        }
        const result = await adminPaymentServices.getPayments(searchValue, s, pIndex);
        console.log(result);
        setRequestPayment(result.payments);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    const updateApi = async (data) => {
        const result = await adminPaymentServices.updatePayment(data);
        console.log(result);
        fetchApi();
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        fetchApi();
    }, [state]);
    useEffect(() => {
        fetchApi();
    }, [updatePage]);
    const handlePaging = (pIndex) => {
        fetchApi(pIndex);
    };
    const renderPages = () => {
        if (totalPages < 2) {
            return;
        }
        let paging = [];
        if (pageIndex > 2) {
            paging.push(
                <CPaginationItem aria-label="Previous" key="0" onClick={() => handlePaging(0)}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>,
            );
        }
        for (let i = pageIndex - 1; i < pageIndex; i++) {
            if (i >= 1) {
                paging.push(
                    <CPaginationItem key={i} onClick={() => handlePaging(i - 1)}>
                        {i}
                    </CPaginationItem>,
                );
            }
        }
        paging.push(
            <CPaginationItem active className={cx('active-page')} key={pageIndex}>
                {pageIndex}
            </CPaginationItem>,
        );
        for (let y = pageIndex + 1; y <= pageIndex + 1; y++) {
            if (y <= totalPages) {
                paging.push(
                    <CPaginationItem key={y} onClick={() => handlePaging(y - 1)}>
                        {y}
                    </CPaginationItem>,
                );
            }
        }
        if (pageIndex < totalPages - 1) {
            paging.push(
                <CPaginationItem aria-label="Next" key="9999" onClick={() => handlePaging(totalPages - 1)}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>,
            );
        }
        return paging;
    };
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
                        <GlobalSearch
                            title="Tìm kiếm mã nạp"
                            onPending={(value) => {
                                setSearchValue(value);
                            }}
                            onSearch={(value) => handlePaging(value)}
                        />
                    </div>
                    {show && (
                        <RequestPopup
                            request={request}
                            callback={() => {
                                setShow(false);
                                setUpdatePage(Math.random());
                            }}
                            onUpdate={(data) => {
                                updateApi(data);
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
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default Payment;
