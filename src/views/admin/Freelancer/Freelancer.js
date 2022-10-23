import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Search from '../../../components/Search';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

import * as adminFreelancerService from '../../../services/adminFreelancerServices';
import Config from '../../../config';
import styles from './Freelancer.module.scss';
const cx = classNames.bind(styles);

function Freelancer() {
    const navigate = useNavigate();
    const headers = ['ID', 'Email', 'Họ và tên', 'Số dư tài khoản', 'Trạng thái tài khoản'];
    const [freelancers, setFreelancers] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminFreelancerService.getFreelancers('', 0);
            console.log(result);
            setFreelancers(result.freelancers);
        };
        fetchApi();
    }, []);

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
                    <td>{freelancer.fullName}</td>
                    <td>{freelancer.accountBalance}</td>
                    <td>{freelancer.isBanned ? 'Cấm' : 'Hoạt động'}</td>
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
