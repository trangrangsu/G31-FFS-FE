import React from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';

import Button from '../../../components/Button';
import Search from '../../../components/Search';
import styles from './Career.module.scss';
const cx = classNames.bind(styles);

function Career() {
    const headers = ['ID', 'Tên Ngành Nghề', 'Chỉnh Sửa', 'Xóa'];
    const careers = [
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
                <h1 className={cx('title')}>Danh sách career</h1>
                <div className={cx('action')}>
                    <Button admin>Thêm mới</Button>
                    <Search title="Tìm kiếm ngành nghề" />
                </div>

                <table className={cx('careers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {careers.map((careers) => {
                            return (
                                <tr key={careers.id}>
                                    <td>{careers.id}</td>
                                    <td>{careers.name}</td>
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

export default Career;
