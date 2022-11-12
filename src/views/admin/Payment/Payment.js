import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import * as adminPaymentServices from '../../../services/adminPaymentServices';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './Payment.module.scss';
const cx = classNames.bind(styles);
function Payment() {
    const status = ['Tất cả', 'Đã phê duyệt', 'Không phê duyệt', 'Chờ phê duyệt'];

    const headers = ['MÃ NẠP', 'ID KHÁCH HÀNG', 'SỐ TIỀN', 'THỜI GIAN'];

    const [requests, setRequests] = useState([]);
    const [state, setState] = useState(status[0]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const fetchApi = async (pIndex) => {
        const result = await adminPaymentServices.getPayments(searchValue, -1, pIndex);
        console.log(result);
        setRequests(result.results);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    useEffect(() => {
        fetchApi(pageIndex);
    }, []);
    useEffect(() => {
        fetchApi();
    }, [state]);

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Yêu Cầu Nạp Tiền</h1>

                <div className={cx('request-filter')}>
                    {/* <div className={cx('request-list')}>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            {status.map((state, index) => {
                                return (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                    <div className={cx('subCareer-search')}>
                        <GlobalSearch
                            title="Tìm kiếm mã nạp"
                            onPending={(value) => {
                                setSearchValue(value);
                            }}
                            onSearch={(value) => handlePaging(value)}
                        />
                    </div>
                </div>

                <table className={cx('subCareers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.paymentCode}</td>
                                <td>{request.userId}</td>
                                <td>{request.money}</td>
                                <td>{request.dateRequest}</td>
                            </tr>
                        ))}
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
