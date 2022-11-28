import { useState } from 'react';
import classNames from 'classnames/bind';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { message, Alert } from 'antd';

import * as adminReportServices from '../../../services/adminReportServices';
import images from '../../../assets/images';
import Button from '../../../components/Button';
import styles from './UserReport.module.scss';
const { TextArea } = Input;
const cx = classNames.bind(styles);
const UserReport = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const account = useSelector((state) => state.account);
    const [messageTitle, setMessageTitle] = useState('');

    const addReportApi = async (data) => {
        const result = await adminReportServices.addReport(data);
        console.log(result);
        if (result) {
            message.success({
                content: 'Hoàn tất gửi báo cáo. Cảm ơn đóng góp của bạn.',
                style: {
                    marginTop: '60px',
                },
            });
            setMessageTitle('');
            setTitle('');
            setValue('');
        } else {
            message.error({
                content: 'Báo cáo thất bại',
                style: {
                    marginTop: '60px',
                },
            });
        }
    };
    const handleClick = () => {
        if (title === '' || value === '') {
            setMessageTitle('Vui lòng không để trống tiêu đề và nội dung');
        } else {
            const data = {
                content: value,
                title: title,
                createdBy: account.userId,
            };
            console.log(data);
            addReportApi(data);
        }
    };
    const handleChangeTitle = (e) => {
        const value = e.target.value;
        if (value.length > 30) {
            return;
        }
        if (!value.startsWith(' ')) {
            setTitle(value);
        }
    };
    const handleChangeContent = (e) => {
        const value = e.target.value;
        if (value.length > 300) {
            return;
        }
        if (!value.startsWith(' ')) {
            setValue(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <h1>Đóng góp ý kiến</h1>
                    <div className={cx('form')}>
                        <div>
                            <label className={cx('label')}>Tiêu đề</label>
                            <Input value={title} onChange={handleChangeTitle} />
                        </div>
                        <div className={cx('margin-top')}>
                            <label className={cx('label')}>Nội dung</label>
                            <TextArea
                                value={value}
                                onChange={handleChangeContent}
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 5,
                                }}
                            />
                        </div>
                    </div>
                    {messageTitle !== '' && (
                        <Alert className={cx('messageError')} message={messageTitle} type="error" />
                    )}
                    <div className={cx('bottom')}>
                        <Button className={cx('btn-report')} onClick={handleClick}>
                            Báo cáo
                        </Button>
                    </div>
                </div>
                <div className={cx('right')}>
                    <img src={images.toad} alt="reset passwork" />
                    <p>
                        Chúng tôi luôn quan tâm đến trải nghiệm khách hàng. Vì vậy, nếu có vấn đề làm mà bạn chưa hài
                        lòng hay bận tâm hãy báo cáo cho chúng tôi. Chúng tôi sẽ cố gắng giải quyết để mang đến trải
                        nghiệm tốt nhất cho khách hàng
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserReport;
