import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Search from '../../../components/Search';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';

import * as adminFreelancerService from '../../../services/adminFreelancerServices';
import Config from '../../../config';
import styles from './Freelancer.module.scss';
const cx = classNames.bind(styles);

function Freelancer() {
    const navigate = useNavigate();
    const headers = ['ID', 'Email', 'Họ và tên', 'Số dư tài khoản', 'Trạng thái tài khoản', 'Membership'];
    const [freelancers, setFreelancers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const [status, setStatus] = useState('-1');
    const fetchApi = async (searchValue, pIndex, status) => {
        const result = await adminFreelancerService.getFreelancers(searchValue, pIndex, status);
        console.log(result);
        setFreelancers(result.results);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    useEffect(() => {
        fetchApi(searchValue, 0, status);
    }, []);
    const handlePaging = (pIndex) => {
        fetchApi(searchValue, pIndex, status);
    };
    const handleSearch = (value) => {
        fetchApi(value, 0, status);
    };
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const renderTableData = () => {
        return freelancers.map((freelancer) => {
            return (
                <tr onClick={() => handleClickUser(freelancer.id)} key={freelancer.id} className={cx('hover')}>
                    <td>{freelancer.id}</td>
                    <td className={cx('table-td')}>{freelancer.email}</td>
                    <td className={cx('table-td')}>{freelancer.fullName}</td>
                    <td>{freelancer.accountBalance} $</td>
                    <td>{freelancer.isBanned ? 'Cấm' : 'Hoạt động'}</td>
                    <td>{freelancer.currentService}</td>
                </tr>
            );
        });
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
    const handleClickUser = (id) => {
        const to = {
            pathname: Config.routes.viewDetailFreelancerAdmin,
            search: `?id=${id}`,
        };
        navigate(to);
    };
    const handleChangeStatus = (value) => {
        fetchApi(searchValue, 0, value);
        setStatus(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Freelancer</h1>
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
                        type="f"
                        className={cx('search')}
                        title="Tìm kiếm Freelancer"
                        onPending={(value) => {
                            setSearchValue(value);
                        }}
                        onSearch={(value) => handleSearch(value)}
                    />
                </div>
                <table className={cx('freelancers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
                {freelancers.length === 0 && <p className={cx('message')}>Không có kết quả</p>}
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default Freelancer;
