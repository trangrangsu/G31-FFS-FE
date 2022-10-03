import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { faMagnifyingGlass, faUpload } from '@fortawesome/free-solid-svg-icons';

import images from '../../../assets/images';
import styles from './Update.module.scss';
const cx = classNames.bind(styles);

function Update() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('greeting')}>
                    <p className={cx('greeting-title')}>Chào mừng bạn đến với lanceddy!</p>
                    <p className={cx('greeting-content')}>
                        Vui lòng tạo hồ sơ để tham gia tìm việc freelance trên lanceddy. Nhà tuyển dụng sẽ nhìn vào hồ
                        sơ để đưa ra quyết định khi bạn ứng cử vào công việc của họ. Vì vậy hãy dành chút thời gian để
                        điền đầy đủ thông tin trong form bên dưới
                    </p>
                </div>
                <div className={cx('profile-content')}>
                    <div className={cx('profile-basic')}>
                        <p className={cx('personal-title')}>GIỚI THIỆU BẢN THÂN</p>
                        <div className={cx('avatar')}>
                            <div className={cx('avatar-img')}>
                                <img src={images.defaultAvatar} alt="" />
                            </div>
                            <div className={cx('avatar-upload')}>
                                <a href="#">
                                    <FontAwesomeIcon icon={faUpload} />
                                </a>
                            </div>
                            <p className={cx('avatar-instruction')}>
                                Vui lòng tải lên hình đại diện thể hiện rõ khuôn mặt của bạn
                            </p>
                        </div>
                        <div className={cx('personal-info')}>
                            <div className={cx('full-name')}>
                                <MDBInput label="Họ và tên *" id="form1" type="text" className={cx('custom')} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('profile-complex')}>
                        <div className={cx('profile-education')}></div>
                        <div className={cx('profile-experience')}></div>
                        <div className={cx('profile-skill')}></div>
                    </div>
                    <div className={cx('submit')}></div>
                </div>
            </div>
        </div>
    );
}

export default Update;
