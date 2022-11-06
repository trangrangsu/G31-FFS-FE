import { useState } from 'react';
import classNames from 'classnames/bind';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { message } from 'antd';

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

    const addReportApi = async (data) => {
        const result = await adminReportServices.addReport(data);
        console.log(result);
        if (result) {
            message.success('Báo cáo thành công');
        }
    };
    const handleClick = () => {
        const data = {
            content: value,
            title: title,
            createdBy: account.userId,
        };
        console.log(data);
        addReportApi(data);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <h1>Đóng góp ý kiến</h1>
                    <div className={cx('form')}>
                        <div>
                            <label className={cx('label')}>Tiêu đề</label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className={cx('margin-top')}>
                            <label className={cx('label')}>Nội dung</label>
                            <TextArea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 5,
                                }}
                            />
                        </div>
                    </div>
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
