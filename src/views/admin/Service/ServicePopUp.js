import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormCheck, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CFormInput } from '@coreui/react';

import CustomButton from '../../../components/Button';
import styles from './Service.module.scss';
const cx = classNames.bind(styles);

function ServicePopUp({ user, service, callback }) {
    const users = [
        { id: 1, name: 'Freelancer' },
        { id: 2, name: 'Recruiter' },
    ];
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
        {
            id: '5',
            name: 'Được gửi yêu cầu tham gia chào giá dự án bí mật',
        },
        {
            id: '6',
            name: 'Được gửi chào giá không giới hạn với tất cả lĩnh vực',
        },
        {
            id: '7',
            name: 'Nhắn tin trao đổi với khách hàng',
        },
    ];
    const bought = ['1', '2', '3'];
    const [show, setShow] = useState(true);
    const [userCurrent, setUserCurrent] = useState(user);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới một dịch vụ');

    const handleClose = () => {
        setShow(false);
        callback();
    };
    useEffect(() => {
        if (service.id) {
            setName(service.name);
            setDuration(service.duration);
            setPrice(service.price);
            setTitleButton('Cập nhật');
            setTitlePopup('Chỉnh sửa dịch vụ');
        }
    }, []);
    const handleAdd = () => {
        const service = {
            name,
        };
        handleClose();
        console.log(service);
    };
    return (
        <div className={cx('service-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('user-box')}>
                            <label className={cx('label')}>Vai trò</label>
                            <div className={cx('service-list-popup')}>
                                <select value={userCurrent} onChange={(e) => setUserCurrent(e.target.value)}>
                                    {users.map((user, index) => {
                                        return (
                                            <option key={index} value={user.id}>
                                                {user.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={cx('input')}>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Tên dịch vụ</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Thời gian</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Giá</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('benefit-container')}>
                            <label className={cx('label')}>Quyền lợi</label>
                            <div className={cx('benefits')}>
                                {benefits.map((benefit) => {
                                    return (
                                        <div className={cx('row-benefit')} key={benefit.id}>
                                            <CFormCheck
                                                id={benefit.id}
                                                defaultChecked={bought.includes(benefit.id) ? 'defaultChecked' : ''}
                                            />
                                            <CAccordion>
                                                <CAccordionItem itemKey={benefit.id}>
                                                    <CAccordionHeader>
                                                        {benefit.name.substring(0, 20) + '...'}
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
                    <CustomButton admin className={cx('btn-add')} onClick={handleAdd}>
                        {titleButton}
                    </CustomButton>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ServicePopUp;
