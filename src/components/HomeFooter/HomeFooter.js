import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareFacebook, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HomeFooter.module.scss';
import images from '../../assets/images';
const cx = classNames.bind(styles);
function HomeFooter() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="logo" />
                    </div>
                    <div className={cx('social')}>
                        <a href="https://www.facebook.com">
                            <FontAwesomeIcon icon={faSquareFacebook} />
                        </a>
                        <a href="https://www.facebook.com">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://www.facebook.com">
                            <FontAwesomeIcon icon={faSquareTwitter} />
                        </a>
                    </div>
                    <div className={cx('contact')}>
                        <div className={cx('phone')}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+338626261</span>
                        </div>
                        <div className={cx('email')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>lanceddy@fpt.edu.vn</span>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('intro')}>
                        <p>Giới thiệu</p>
                        <ul>
                            <li>Nghề nghiệp</li>
                            <li>Báo chí & Tin tức</li>
                            <li>Quan hệ đối tác</li>
                            <li>Chính sách bảo mật</li>
                            <li>Điều khoản dịch vụ</li>
                            <li>Khiếu nại sở hữu trí tuệ</li>
                        </ul>
                    </div>
                    <div className={cx('support')}>
                        <p>Hỗ trợ</p>
                        <ul>
                            <li>Trợ giúp & hỗ trợ</li>
                            <li>Niềm tin & An toàn</li>
                            <li>Tìm việc trên lanceddy</li>
                            <li>Tìm freelancer trên lanceddy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('bottom')}>
                <p>Copyright © 2022 Lanceddy Team Co., Ltd. All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default HomeFooter;
