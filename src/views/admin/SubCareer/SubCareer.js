import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SubCareerPopUp from './SubCareerPopUp';
import Button from '../../../components/Button';
import Search from '../../../components/Search';
import styles from './SubCareer.module.scss';
const cx = classNames.bind(styles);

function SubCareer() {
    const headers = ['ID', 'TÊN NGÀNH NGHỀ', 'CHỈNH SỬA', 'XÓA'];
    const subCareers = [
        {
            id: 1,
            name: 'Kỹ thuật phần mềm',
        },
        {
            id: 2,
            name: 'Khoa học máy tính',
        },
        {
            id: 3,
            name: 'An toàn thông tin',
        },
        {
            id: 4,
            name: 'Trí tuệ nhân tạo',
        },
        {
            id: 5,
            name: 'Blockchain',
        },
        {
            id: 6,
            name: 'Tester',
        },
    ];
    const listCareers = [
        {
            id: 1,
            name: 'Công nghệ thông tin',
        },
        {
            id: 2,
            name: 'Bất Động Sản',
        },
        {
            id: 3,
            name: 'Marketing',
        },
        {
            id: 4,
            name: 'Bán Hàng',
        },
        {
            id: 5,
            name: 'Thiết Kế',
        },
        {
            id: 6,
            name: 'Tư Vấn',
        },
        {
            id: 7,
            name: 'Xây dựng',
        },
    ];

    const [show, setShow] = useState(false);
    const [subCareerInfo, setSubCareerInfo] = useState({});
    const [career, setCareer] = useState(listCareers[0].name);
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const handleShow = () => {
        setSubCareerInfo({});
        setShow(true);
    };
    const handUpdate = (subCareerInfo) => {
        setSubCareerInfo(subCareerInfo);
        setShow(true);
    };
    const handDelete = (subCareerInfo) => {
        alert('delete');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách SubCareer</h1>

                <div className={cx('subcareer-filter')}>
                    <Button admin className={cx('button-popup')} onClick={handleShow}>
                        Thêm mới
                    </Button>
                    <div className={cx('sub-career-list')}>
                        <select value={career} onChange={(e) => setCareer(e.target.value)}>
                            {listCareers.map((career, index) => {
                                return (
                                    <option key={index} value={career.id}>
                                        {career.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('subCareer-search')}>
                        <Search title="Tìm kiếm ngành nghề chi tiết" />
                    </div>
                    {show && (
                        <SubCareerPopUp
                            career={career}
                            subCareer={subCareerInfo}
                            callback={() => {
                                setShow(false);
                            }}
                        />
                    )}
                </div>

                <table className={cx('subCareers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {subCareers.map((subCareer) => {
                            return (
                                <tr key={subCareer.id}>
                                    <td>{subCareer.id}</td>
                                    <td>{subCareer.name}</td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon icon={faPenClip} onClick={() => handUpdate(subCareer)} />
                                    </td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handDelete(subCareer)} />
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

export default SubCareer;
