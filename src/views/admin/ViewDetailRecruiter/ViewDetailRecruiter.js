import classNames from 'classnames/bind';
import React from 'react';

import { faUserPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import styles from './ViewDetailRecruiter.module.scss';
const cx = classNames.bind(styles);
function ViewDetailRecruiter() {
    const banFlag = false;
    const recruiter = {
        id: 1,
        email: 'lanceddy@gmail.com',
        career: 'Technology',
        phone: '0337177679',
        companyName: 'Lanceddy',
        address: 'Trụ Sở HN:tầng 3, tòa nhà Gold Season, 47 Nguyễn tuân, P. Thanh Xuân. Q Thanh Xuân, Hà Nội',
        tax_num: 'J141326763',
        website: 'lanceddy.com.vn',
        avatar: 'https://i.pravatar.cc/300',
        description:
            'Top CV mong muốn trở thành công ty cung cấp các giải pháp phần mềm và dịch vụ công nghệ thông tin toàn cầu, luôn luôn sáng tạo các giá trị vì khách hàng, đem lại cuộc sống hạnh phúc cho toàn thể các thành viên, đóng góp cho cộng đồng.Kết nối đúng người đúng việc là một bài toán rất khó ở Việt Nam, là thách thức của bất kỳ nền tảng tuyển dụng nào. Với năng lực lõi là công nghệ, đặc biệt là trí tuệ nhân tạo (AI), sứ mệnh của TopCV đặt ra cho mình là thay đổi thị trường tuyển dụng - nhân sự ngày một hiệu quả hơn.Mỗi ngày, chúng tôi kết nối hàng nghìn ứng viên tiềm năng với các doanh nghiệp phù hợp, đồng hành cùng hơn 110.000 doanh nghiệp tuyển dụng hiệu quả, từ các tập đoàn đa quốc gia đến các công ty khởi nghiệp trẻ',
        star: '5',
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail-title')}>
                    <FontAwesomeIcon icon={faUserPen} className={cx('icon-user')} />
                    <h1 className={cx('title')}>Thông Tin chi tiết của: {recruiter.companyName}</h1>
                </div>

                <div className={cx('recruiter-info')}>
                    <div className={cx('left-info')}>
                        <div className={cx('img-info')}>
                            <img
                                className={cx('avatar-info')}
                                src={recruiter.avatar}
                                alt="Girl in a jacket"
                                width="500"
                                height="600"
                            />
                        </div>
                        <div className={cx('left-detail')}>
                            <div className={cx('companyname')}>{recruiter.companyName}</div>
                            <div className={cx('career')}>{recruiter.career}</div>
                            <div>
                                Đánh giá: {recruiter.star} <FontAwesomeIcon icon={faStar} className={cx('icon-user')} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-info')}>
                        <div className={cx('right-detail')}>
                            <div>Phone: {recruiter.phone}</div>
                            <div>Email: {recruiter.email}</div>
                            <div>Tax-Number: {recruiter.tax_num}</div>
                            <div>Website: {recruiter.website}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('address-content')}>
                    <div className={cx('address-title')}>
                        <p>Địa chỉ</p>
                    </div>
                    <div className={cx('address')}>{recruiter.address}</div>
                </div>
                <div className={cx('description-content')}>
                    <div className={cx('description-title')}>
                        <p>Mô tả công ty</p>
                    </div>
                    <div className={cx('description')}>{recruiter.description}</div>
                </div>
                <Button admin className={cx('btn-warning')}>
                    {!banFlag ? 'Khóa tài khoản' : 'Mở khóa'}
                </Button>
            </div>
        </div>
    );
}

export default ViewDetailRecruiter;
