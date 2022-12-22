import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';

import * as adminSubCareerServices from '../../../services/adminSubCareerServices';
import * as adminCareerServices from '../../../services/adminCareerServices';
import SubCareerPopUp from './SubCareerPopUp';
import Button from '../../../components/Button';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './SubCareer.module.scss';
const cx = classNames.bind(styles);

function SubCareer() {
    const headers = ['ID', 'TÊN NGÀNH NGHỀ', 'CHỈNH SỬA'];
    const [subCareers, setSubCareers] = useState([]);
    const [listCareers, setListCareers] = useState([]);

    const [show, setShow] = useState(false);
    const [subCareerInfo, setSubCareerInfo] = useState({});
    const [career, setCareer] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const getCareerApi = async () => {
        const result2 = await adminCareerServices.getAllCareers();
        console.log(result2);
        setListCareers(result2);
        setCareer(result2[0].id);
        getSubCareerApi(result2[0].id);
    };
    const getSubCareerApi = async (career, pIndex) => {
        const result1 = await adminSubCareerServices.getSubCareers(career, searchValue, pIndex);
        console.log(result1);
        setSubCareers(result1.results);
        setPageIndex(result1.pageIndex);
        setTotalPages(result1.totalPages);
    };
    const addSubCareerApi = async (careerId, name) => {
        const result1 = await adminSubCareerServices.addSubCareer(careerId, name);
        console.log(result1);
        if (result1.response) {
            message.error({
                content: result1.response.data,
                style: {
                    marginTop: '50px',
                },
            });
        } else {
            message.success({
                content: result1,
                style: {
                    marginTop: '50px',
                },
            });
        }
        getSubCareerApi();
    };
    const updateSubCareerApi = async (careerId, id, name) => {
        const result1 = await adminSubCareerServices.updateSubCareer(careerId, id, name);
        console.log(result1);
        if (result1.response) {
            message.error({
                content: result1.response.data,
                style: {
                    marginTop: '50px',
                },
            });
        } else {
            message.success({
                content: result1,
                style: {
                    marginTop: '50px',
                },
            });
        }
        getSubCareerApi();
    };
    const deleteSubCareerApi = async (id) => {
        const result1 = await adminSubCareerServices.deleteSubCareer(id);
        console.log(result1);
        getSubCareerApi();
    };
    useEffect(() => {
        getCareerApi();
    }, []);
    useEffect(() => {
        getSubCareerApi(career);
    }, [career]);
    useEffect(() => {
        if (searchValue === '') {
            getSubCareerApi(career);
        }
    }, [searchValue]);
    const handlePaging = (pIndex) => {
        getSubCareerApi(career, pIndex);
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
        setSubCareerInfo({});
        setShow(true);
    };
    const handUpdate = (subCareerInfo) => {
        setSubCareerInfo(subCareerInfo);
        setShow(true);
    };
    const handDelete = (subCareerInfo) => {
        deleteSubCareerApi(subCareerInfo.id);
    };
    const handleAction = (subCareer) => {
        if (!subCareer.id) {
            addSubCareerApi(subCareer.careerId, subCareer.name);
        } else {
            updateSubCareerApi(subCareer.careerId, subCareer.id, subCareer.name);
        }
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
                        <GlobalSearch
                            title="Tìm kiếm ngành nghề chi tiết"
                            onPending={(value) => {
                                setSearchValue(value);
                            }}
                            onSearch={(value) => handlePaging(value)}
                        />
                    </div>
                    {show && (
                        <SubCareerPopUp
                            career={career}
                            subCareer={subCareerInfo}
                            callback={() => {
                                setShow(false);
                            }}
                            onAction={(subCareer) => {
                                handleAction(subCareer);
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
                                        <FontAwesomeIcon
                                            icon={faPenClip}
                                            onClick={() => handUpdate(subCareer)}
                                            className={cx('hover')}
                                        />
                                    </td>
                                    {/* <td>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            onClick={() => handDelete(subCareer)}
                                            className={cx('hover')}
                                        />
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {subCareers.length === 0 && <p className={cx('message')}>Không có kết quả</p>}
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default SubCareer;
