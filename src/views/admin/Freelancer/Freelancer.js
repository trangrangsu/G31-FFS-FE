import React from 'react';
import classNames from 'classnames/bind';
import Search from '../../../components/Search';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

import Config from '../../../config';
import styles from './Freelancer.module.scss';
const cx = classNames.bind(styles);

function Freelancer() {
    const navigate = useNavigate();
    const headers = ['ID', 'Email', 'Họ và tên', 'Số dư tài khoản', 'Trạng thái tài khoản'];
    const freelancers = [
        {
            id: 1,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            accountbalance: '20000',
            isbanned: 'True',
        },
        {
            id: 2,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Huu Tuyen',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 3,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Van Manh',
            accountbalance: '20000',
            isbanned: 'True',
        },
        {
            id: 4,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Van Nam',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 5,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Bien Van Cong',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 6,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Ba Trang',
            accountbalance: '20000',
            isbanned: 'False',
        },
    ];
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const renderTableData = () => {
        return freelancers.map((freelancer) => {
            return (
                <tr onClick={() => handleClickUser(freelancer.id)} key={freelancer.id}>
                    <td>{freelancer.id}</td>
                    <td>{freelancer.email}</td>
                    <td>{freelancer.fullname}</td>
                    <td>{freelancer.accountbalance}</td>
                    <td>{freelancer.isbanned}</td>
                </tr>
            );
        });
    };
    const handleClickUser = (id) => {
        const to = {
            pathname: Config.routes.viewDetailFreelancerAdmin,
            search: `?id=${id}`,
        };
        navigate(to);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Freelancer</h1>
                <Search className={cx('search')} title="Tìm kiếm Freelancer" />
                <table className={cx('freelancers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem>1</CPaginationItem>
                    <CPaginationItem active className={cx('active-page')}>
                        2
                    </CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </div>
        </div>
    );
}

export default Freelancer;
