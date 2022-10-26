import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as adminServiceServices from '../../../services/adminServiceServices';
import DetailService from './DetailService';
import ServicePopUp from './ServicePopUp';
import Button from '../../../components/Button';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './Service.module.scss';
const cx = classNames.bind(styles);
function Service() {
    const headers = ['ID', 'TÊN DỊCH VỤ', 'THỜI GIAN', 'GIÁ TIỀN', 'CHỈNH SỬA', 'XÓA'];
    const users = [
        { id: 3, name: 'Freelancer' },
        { id: 4, name: 'Recruiter' },
    ];
    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [serviceInfo, setServiceInfo] = useState({});
    const [user, setUser] = useState(users[0].id);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);

    const fetchApi = async (pIndex) => {
        const result = await adminServiceServices.getServices(user, searchValue, pIndex);
        console.log(result);
        setServices(result.services);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPage);
    };
    const deleteApi = async (id) => {
        const result = await adminServiceServices.deleteService(id);
        console.log(result);
        fetchApi();
    };
    const addApi = async (service) => {
        const result = await adminServiceServices.addService(service);
        console.log(result);
        fetchApi();
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        fetchApi();
    }, [user]);
    const handlePaging = (pIndex) => {
        fetchApi(pIndex);
    };
    const renderPages = () => {
        console.log(totalPages + ' ' + pageIndex);
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
        setServiceInfo({});
        setShow(true);
    };
    const handUpdate = (serviceInfo) => {
        setServiceInfo(serviceInfo);
        setShow(true);
    };
    const handDelete = (serviceInfo) => {
        deleteApi(serviceInfo.id);
        console.log('delete');
    };
    const handleViewDetail = (service) => {
        setServiceInfo(service);
        setShowDetail(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Dịch vụ</h1>

                <div className={cx('subcareer-filter')}>
                    <Button admin className={cx('button-popup')} onClick={handleShow}>
                        Thêm mới
                    </Button>
                    <div className={cx('service-list')}>
                        <select
                            value={user}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setUser(e.target.value);
                            }}
                        >
                            {users.map((user, index) => {
                                return (
                                    <option key={index} value={user.id}>
                                        {user.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('subCareer-search')}>
                        <GlobalSearch
                            title="Tìm kiếm dịch vụ"
                            onPending={(value) => {
                                setSearchValue(value);
                            }}
                            onSearch={(value) => handlePaging(value)}
                        />
                    </div>
                    {show && (
                        <ServicePopUp
                            user={user}
                            service={serviceInfo}
                            callback={(service) => {
                                setShow(false);
                                addApi(service);
                            }}
                        />
                    )}
                    {showDetail && (
                        <DetailService
                            serviceName={serviceInfo.name}
                            callback={() => {
                                setShowDetail(false);
                            }}
                        />
                    )}
                </div>

                <table className={cx('subCareers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {services.map((service) => {
                            return (
                                <tr key={service.id}>
                                    <td onClick={() => handleViewDetail(service)}>{service.id}</td>
                                    <td onClick={() => handleViewDetail(service)}>{service.serviceName}</td>
                                    <td onClick={() => handleViewDetail(service)}>{service.duration}</td>
                                    <td onClick={() => handleViewDetail(service)}>{service.price}</td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faPenClip}
                                            onClick={() => handUpdate(service)}
                                            className={cx('hover')}
                                        />
                                    </td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            onClick={() => handDelete(service)}
                                            className={cx('hover')}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default Service;
