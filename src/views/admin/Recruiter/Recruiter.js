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
    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminRecruiterServices.getRecruiters('', 0);
            console.log(result);
            setRecruiters(result.recruiters);
        };
        fetchApi();
    }, []);
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
                <Search className={cx('search')} title="Tìm kiếm nhà tuyển dụng" />
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

export default Recruiter;
