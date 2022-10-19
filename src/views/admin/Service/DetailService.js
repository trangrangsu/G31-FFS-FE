import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormCheck, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react';

import styles from './Service.module.scss';
const cx = classNames.bind(styles);

function DetailService({ serviceName, callback }) {
    const benefits = [
        {
            id: '1',
            name: 'Hiển thì hồ sơ cá nhân công khai trên Lanceddy',
        },
        {
            id: '2',
            name: 'Được xem tất cả công việc',
        },
        {
            id: '3',
            name: 'Được nhận thông báo việc hàng ngày',
        },
        {
            id: '4',
            name: 'Gợi ý khách hàng mời tham gia chào giá dự án',
        },
    ];
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        callback();
    };
    useEffect(() => {}, []);
    return (
        <div className={cx('service-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Các quyền lợi của dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <p className={cx('name-title')}>Tên dịch vụ: {serviceName}</p>
                        <div className={cx('benefit-container')}>
                            <div className={cx('benefits')}>
                                {benefits.map((benefit) => {
                                    return (
                                        <div className={cx('row-benefit')} key={benefit.id}>
                                            {/* <CFormCheck id={benefit.id} defaultChecked /> */}
                                            <CAccordion>
                                                <CAccordionItem itemKey={benefit.id}>
                                                    <CAccordionHeader>
                                                        {benefit.name.substring(0, 30) + '...'}
                                                    </CAccordionHeader>
                                                    <CAccordionBody>{benefit.name}</CAccordionBody>
                                                </CAccordionItem>
                                            </CAccordion>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DetailService;
