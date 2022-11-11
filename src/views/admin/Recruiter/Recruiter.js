import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { CPagination, CPaginationItem } from '@coreui/react';

import * as adminRecruiterServices from '../../../services/adminRecruiterServices';
import Config from '../../../config';
import Search from '../../../components/Search';
import styles from './Recruiter.module.scss';
const cx = classNames.bind(styles);

function Recruiter() {
    const navigate = useNavigate();
    const headers = ['ID', 'Email', 'Họ và tên', 'Số dư tài khoản', 'Trạng thái tài khoản'];
    const [recruiters, setRecruiters] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const fetchApi = async (pIndex) => {
        const result = await adminRecruiterServices.getRecruiters(searchValue, pIndex);
        setRecruiters(result.results);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    useEffect(() => {
        fetchApi();
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
    const handleClickUser = (id) => {
        const to = {
            pathname: Config.routes.viewDetailRecruiterAdmin,
            search: `?id=${id}`,
        };
        navigate(to);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách nhà tuyển dụng</h1>
                <Search
                    type="r"
                    className={cx('search')}
                    title="Tìm kiếm nhà tuyển dụng"
                    onPending={(value) => {
                        setSearchValue(value);
                    }}
                    onSearch={(value) => handlePaging(value)}
                />
                <table className={cx('recruiters')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {recruiters.map((recruiters) => {
                            return (
                                <tr key={recruiters.id} onClick={() => handleClickUser(recruiters.id)}>
                                    <td>{recruiters.id}</td>
                                    <td>{recruiters.email}</td>
                                    <td>{recruiters.fullName}</td>
                                    <td>{recruiters.accountBalance}</td>
                                    <td>{recruiters.isBanned ? 'Cấm' : 'Hoạt động'}</td>
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

export default Recruiter;
