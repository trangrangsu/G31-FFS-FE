import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as adminServiceServices from '../../../services/adminServiceServices';
import DetailService from './DetailService';
import ServicePopUp from './ServicePopUp';
import Button from '../../../components/Button';
import Search from '../../../components/Search';
import styles from './Service.module.scss';
const cx = classNames.bind(styles);
function Service() {
    const headers = ['ID', 'TÊN DỊCH VỤ', 'THỜI GIAN', 'GIÁ TIỀN', 'CHỈNH SỬA', 'XÓA'];
    const users = [
        { id: 1, name: 'Freelancer' },
        { id: 2, name: 'Recruiter' },
    ];
    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [serviceInfo, setServiceInfo] = useState({});
    const [user, setUser] = useState(users[0].name);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminServiceServices.getServices('', 0);
            console.log(result);
            setServices(result.services);
        };
        fetchApi();
    }, []);

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
        alert('delete');
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
                        <select value={user} onChange={(e) => setUser(e.target.value)}>
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
                        <Search title="Tìm kiếm dịch vụ" />
                    </div>
                    {show && (
                        <ServicePopUp
                            user={user}
                            service={serviceInfo}
                            callback={() => {
                                setShow(false);
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
                                        <FontAwesomeIcon icon={faPenClip} onClick={() => handUpdate(service)} />
                                    </td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handDelete(service)} />
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

export default Service;
