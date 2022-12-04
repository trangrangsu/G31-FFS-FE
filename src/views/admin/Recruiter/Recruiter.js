import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { CPagination, CPaginationItem } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Select, message } from 'antd';

import * as adminRecruiterServices from '../../../services/adminRecruiterServices';
import Config from '../../../config';
import Search from '../../../components/Search';
import styles from './Recruiter.module.scss';
const cx = classNames.bind(styles);

function Recruiter() {
    const navigate = useNavigate();
    const pendingHeaders = ['ID', 'Email', 'Họ và tên', 'Số điện thoại', 'Duyệt'];
    const headers = ['ID', 'Email', 'Họ và tên', 'Số dư tài khoản', 'Trạng thái tài khoản', 'Membership'];
    const [recruiters, setRecruiters] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const [status, setStatus] = useState('-1');
    const [recruitersPending, setRecruitersPending] = useState([]);
    const [searchValuePending, setSearchValuePending] = useState('');
    const [pageIndexPending, setPageIndexPending] = useState(0);
    const [totalPagesPending, setTotalPagesPending] = useState(5);
    const fetchApi = async (searchValue, pIndex, status) => {
        const result = await adminRecruiterServices.getRecruiterActives(searchValue, pIndex, status);
        console.log(result);
        setRecruiters(result.results);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    const recruiterPendingApi = async (searchValuePending, pIndex) => {
        const result = await adminRecruiterServices.getRecruiterNotActives(searchValuePending, pIndex);
        setRecruitersPending(result.results);
        setPageIndexPending(result.pageIndex);
        setTotalPagesPending(result.totalPages);
        console.log(result);
    };
    const approveRecruiterApi = async (userId) => {
        const result = await adminRecruiterServices.approveRecruiter(userId);
        console.log(result);
        if (result) {
            message.success({
                content: 'Duyệt thành công',
                style: {
                    marginTop: '50px',
                },
            });
            const index = recruitersPending.findIndex((recruiter) => recruiter.id === userId);
            setRecruitersPending((pre) => {
                pre.splice(index, 1);
                return [...pre];
            });
        } else {
            message.error({
                content: 'Duyệt thất bại',
                style: {
                    marginTop: '50px',
                },
            });
        }
    };
    useEffect(() => {
        fetchApi(searchValue, 0, status);
        recruiterPendingApi(searchValuePending, 0);
    }, []);
    const handlePaging = (pageIndex) => {
        fetchApi(searchValue, pageIndex, status);
    };
    const handleInactivePaging = (pageIndex) => {
        recruiterPendingApi(searchValuePending, pageIndex);
    };
    const handleSearch = (value) => {
        recruiterPendingApi(value, 0);
    };
    const handleActiveSearch = (value) => {
        fetchApi(value, 0, status);
    };
    const renderPendingPages = () => {
        if (totalPagesPending < 2) {
            return;
        }
        let paging = [];
        if (pageIndexPending > 2) {
            paging.push(
                <CPaginationItem aria-label="Previous" key="0" onClick={() => handleInactivePaging(0)}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>,
            );
        }
        for (let i = pageIndexPending - 1; i < pageIndexPending; i++) {
            if (i >= 1) {
                paging.push(
                    <CPaginationItem key={i} onClick={() => handleInactivePaging(i - 1)}>
                        {i}
                    </CPaginationItem>,
                );
            }
        }
        paging.push(
            <CPaginationItem active className={cx('active-page')} key={pageIndexPending}>
                {pageIndexPending}
            </CPaginationItem>,
        );
        for (let y = pageIndexPending + 1; y <= pageIndexPending + 1; y++) {
            if (y <= totalPagesPending) {
                paging.push(
                    <CPaginationItem key={y} onClick={() => handleInactivePaging(y - 1)}>
                        {y}
                    </CPaginationItem>,
                );
            }
        }
        if (pageIndexPending < totalPagesPending - 1) {
            paging.push(
                <CPaginationItem
                    aria-label="Next"
                    key="9999"
                    onClick={() => handleInactivePaging(totalPagesPending - 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>,
            );
        }
        return paging;
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
    const renderTabPendingleHeader = () => {
        return pendingHeaders.map((properties, index) => {
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
    const handleApprove = (userId) => {
        approveRecruiterApi(userId);
    };
    const handleChangeStatus = (value) => {
        fetchApi(searchValue, 0, value);
        setStatus(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách nhà tuyển dụng đang chờ duyệt</h1>
                <div className={cx('list')}>
                    <Search
                        type="r"
                        isActive={false}
                        className={cx('search')}
                        title="Tìm kiếm nhà tuyển dụng"
                        onPending={(value) => {
                            setSearchValuePending(value);
                        }}
                        onSearch={(value) => handleSearch(value)}
                    />
                    <table className={cx('recruiters')}>
                        <thead className={cx('table-header')}>
                            <tr>{renderTabPendingleHeader()}</tr>
                        </thead>
                        <tbody>
                            {recruitersPending.map((recruiters) => {
                                return (
                                    <tr key={recruiters.id}>
                                        <td>{recruiters.id}</td>
                                        <td className={cx('table-td')}>{recruiters.email}</td>
                                        <td className={cx('table-td')}>{recruiters.fullName}</td>
                                        <td>{recruiters.phone}</td>
                                        <td onClick={() => handleApprove(recruiters.id)}>
                                            <FontAwesomeIcon icon={faCircleCheck} className={cx('hover')} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {recruitersPending.length === 0 && <p className={cx('message')}>Không có kết quả</p>}
                </div>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPendingPages()}
                </CPagination>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách nhà tuyển dụng</h1>
                <div className={cx('filter')}>
                    <Select
                        defaultValue="Tất cả"
                        size="large"
                        style={{
                            width: '200px',
                            height: '43px',
                            marginRight: '10px',
                        }}
                        onChange={handleChangeStatus}
                        options={[
                            {
                                value: '-1',
                                label: 'Tất cả',
                            },
                            {
                                value: '0',
                                label: 'Hoạt động',
                            },
                            {
                                value: '1',
                                label: 'Bị cấm',
                            },
                        ]}
                    />
                    <Search
                        type="r"
                        isActive={true}
                        className={cx('search-active')}
                        title="Tìm kiếm nhà tuyển dụng"
                        onPending={(value) => {
                            setSearchValue(value);
                        }}
                        onSearch={(value) => handleActiveSearch(value)}
                    />
                </div>
                <table className={cx('recruiters')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {recruiters.map((recruiters) => {
                            return (
                                <tr key={recruiters.id} onClick={() => handleClickUser(recruiters.id)}>
                                    <td>{recruiters.id}</td>
                                    <td className={cx('table-td')}>{recruiters.email}</td>
                                    <td className={cx('table-td')}>{recruiters.fullName}</td>
                                    <td>{recruiters.accountBalance}</td>
                                    <td>{recruiters.isBanned ? 'Cấm' : 'Hoạt động'}</td>
                                    <td>{recruiters.currentService}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {recruiters.length === 0 && <p className={cx('message')}>Không có kết quả</p>}
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default Recruiter;
