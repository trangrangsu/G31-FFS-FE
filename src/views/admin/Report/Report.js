import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import * as adminReportServices from '../../../services/adminReportServices';
import ReportPopup from './ReportPopup';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './Report.module.scss';
const cx = classNames.bind(styles);
function Report() {
    const headers = ['ID', 'NGƯỜI ĐĂNG', 'TIÊU ĐỀ', 'NGÀY TẠO'];
    const [reports, setReports] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const fetchApi = async (pIndex) => {
        const result = await adminReportServices.getReports(searchValue, pIndex);
        console.log(result);
        setReports(result.results);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPage);
    };
    useEffect(() => {
        fetchApi(0);
    }, []);
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
    const handleViewDetail = (report) => {
        setTitle(report.title);
        setDetail(report.content);
        setShow(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Báo cáo</h1>

                <div className={cx('report-filter')}>
                    <div className={cx('report-search')}>
                        <GlobalSearch
                            title="Tìm kiếm báo cáo"
                            onPending={(value) => {
                                setSearchValue(value);
                            }}
                            onSearch={(value) => handlePaging(value)}
                        />
                    </div>
                    {show && (
                        <ReportPopup
                            title={title}
                            detail={detail}
                            callback={() => {
                                setShow(false);
                            }}
                        />
                    )}
                </div>

                <table className={cx('report')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => {
                            return (
                                <tr key={report.id} onClick={() => handleViewDetail(report)}>
                                    <td>{report.id}</td>
                                    <td>{report.createdBy}</td>
                                    <td>{report.title}</td>
                                    <td>{report.createdDate}</td>
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

export default Report;
