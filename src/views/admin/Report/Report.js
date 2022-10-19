import { useState } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import ReportPopup from './ReportPopup';
import Search from '../../../components/Search';
import styles from './Report.module.scss';
const cx = classNames.bind(styles);
function Report() {
    const headers = ['ID', 'NGƯỜI ĐĂNG', 'TIÊU ĐỀ'];
    const reports = [
        {
            id: 1,
            name: 'Nguyễn Đức Long',
            title: 'Người dùng lừa đảo',
            detail: 'Người dùng lừa đảo ...',
        },
        {
            id: 2,
            name: 'Nguyễn Đức Long',
            title: 'Người dùng lừa đảo',
            detail: 'Người dùng lừa đảo ...',
        },
        {
            id: 3,
            name: 'Nguyễn Đức Long',
            title: 'Người dùng lừa đảo',
            detail: 'Người dùng lừa đảo ...',
        },
        {
            id: 4,
            name: 'Nguyễn Đức Long',
            title: 'Người dùng lừa đảo',
            detail: 'Người dùng lừa đảo ...',
        },
        {
            id: 5,
            name: 'Nguyễn Đức Long',
            title: 'Người dùng lừa đảo',
            detail: 'Người dùng lừa đảo ...',
        },
        {
            id: 6,
            name: 'Nguyễn Đức Long',
            title: 'Người dùng lừa đảo',
            detail: 'Người dùng lừa đảo ...',
        },
    ];

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');

    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const handleViewDetail = (report) => {
        setTitle(report.title);
        setDetail(report.detail);
        setShow(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Báo cáo</h1>

                <div className={cx('report-filter')}>
                    <div className={cx('report-search')}>
                        <Search title="Tìm kiếm báo cáo" />
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
                                    <td>{report.name}</td>
                                    <td>{report.title}</td>
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

export default Report;
