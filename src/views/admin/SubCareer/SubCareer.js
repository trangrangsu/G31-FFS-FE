import React from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SubCareer.module.scss';
const cx = classNames.bind(styles);

function SubCareer() {
    const headers = ['ID', 'Tên Ngành Nghề', 'Chỉnh Sửa', 'Xóa'];
    const subCareers = [
        {
            id: 1,
            name: 'Công Nghệ Thông tin',
        },
        {
            id: 2,
            name: 'Bất Động Sản',
        },
        {
            id: 3,
            name: 'Bán Hàng',
        },
        {
            id: 4,
            name: 'Thiết Kế',
        },
        {
            id: 5,
            name: 'Tư Vấn',
        },
        {
            id: 6,
            name: 'Xây dựng',
        },
    ];
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách SubCareer</h1>
                <div className={cx('subcareer-list')}>
                    <select className={cx('career-list')} aria-label="Default select example">
                        <option selected>
                            <label for="exampleFormControlTextarea1" className={cx('form-label')}>
                                --Chọn ngành nghề-
                            </label>
                        </option>
                        <option value="0">CNTT</option>
                        <option value="24">Bất Động Sản</option>
                        <option value="31">Tư vấn bán hàng</option>
                    </select>
                    <div className={cx('subcareer-search')}>
                        <span className="icon">
                            {' '}
                            <i>
                                <FontAwesomeIcon icon={faSearch} />
                            </i>
                        </span>
                        <input type="search" id="search" placeholder="Search..." />
                    </div>
                </div>

                <table className={cx('subCareers')}>
                    <thead className={cx('table-header')}>{renderTableHeader()}</thead>
                    <tbody>
                        {subCareers.map((subCareers) => {
                            return (
                                <tr key={subCareers.id}>
                                    <td>{subCareers.id}</td>
                                    <td>{subCareers.name}</td>
                                    <td>
                                        <button>Chỉnh sửa</button>
                                    </td>
                                    <td>
                                        <button>Xóa</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active>1</CPaginationItem>
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

export default SubCareer;
