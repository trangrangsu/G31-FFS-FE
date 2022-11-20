import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as adminCareerServices from '../../../services/adminCareerServices';
import CustomButton from '../../../components/Button';
import GlobalSearch from '../../../components/GlobalSearch';
import CareerPopUp from './CareerPopUp.js';
import styles from './Career.module.scss';
const cx = classNames.bind(styles);

function Career() {
    const headers = ['ID', 'Tên Ngành Nghề', 'Chỉnh Sửa', 'Xóa'];
    const [careers, setCareer] = useState([]);
    const [updatePage, setUpdatePage] = useState(0);
    const [show, setShow] = useState(false);
    const [careerInfo, setCareerInfo] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const fetchApi = async (searchValue, pIndex) => {
        const result = await adminCareerServices.getCareers(searchValue, pIndex);
        console.log(result);
        setCareer(result.results);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    useEffect(() => {
        fetchApi(searchValue, 0);
    }, []);

    const handlePaging = (pIndex) => {
        fetchApi(searchValue, pIndex);
    };
    const handleSearch = (value) => {
        fetchApi(value, 0);
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
    const handleShow = () => {
        setCareerInfo({});
        setShow(true);
    };
    const handUpdate = (careerInfo) => {
        setCareerInfo(careerInfo);
        setShow(true);
    };
    const handDelete = (careerInfo) => {
        const deleteCareerFetchApi = async (id) => {
            const result = await adminCareerServices.deleteCareer(id);
            console.log(result);
            fetchApi(searchValue, 0);
        };
        deleteCareerFetchApi(careerInfo.id);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách career</h1>
                <div className={cx('action')}>
                    <CustomButton admin className={'button-popup'} variant="primary" onClick={handleShow}>
                        Thêm mới
                    </CustomButton>
                    <GlobalSearch
                        className={cx('search')}
                        title="Tìm kiếm ngành nghề"
                        onPending={(value) => {
                            setSearchValue(value);
                        }}
                        onSearch={(value) => handleSearch(value)}
                    />
                    {show && (
                        <CareerPopUp
                            career={careerInfo}
                            callback={() => {
                                setShow(false);
                                setTimeout(() => {
                                    fetchApi(searchValue, 0);
                                }, 200);
                            }}
                        />
                    )}
                </div>

                <table className={cx('careers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {careers.map((career) => {
                            return (
                                <tr key={career.id}>
                                    <td>{career.id}</td>
                                    <td>{career.name}</td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faPenClip}
                                            onClick={() => handUpdate(career)}
                                            className={cx('hover')}
                                        />
                                    </td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            onClick={() => handDelete(career)}
                                            className={cx('hover')}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {careers.length === 0 && <p className={cx('message')}>Không có kết quả</p>}
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default Career;
