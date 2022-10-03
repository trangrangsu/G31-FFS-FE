import classNames from 'classnames/bind';

import styles from './Update.module.scss';
const cx = classNames.bind(styles);

function Update() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('greeting')}>
                    <p>Chào mừng bạn đến với lanceddy!</p>
                    <p>
                        Vui lòng tạo hồ sơ để tham gia tìm việc freelance trên lanceddy. Nhà tuyển dụng sẽ nhìn vào hồ
                        sơ để đưa ra quyết định khi bạn ứng cử vào công việc của họ. Vì vậy hãy dành chút thời gian để
                        điền đầy đủ thông tin trong form bên dưới
                    </p>
                </div>
                <div className={cx('profile-content')}>
                    <div className={cx('profile-basic')}></div>
                    <div className={cx('profile-complex')}>
                        <div className={cx('profile-education')}></div>
                        <div className={cx('profile-experience')}></div>
                        <div className={cx('profile-skill')}></div>
                        <div className={cx('submit')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
