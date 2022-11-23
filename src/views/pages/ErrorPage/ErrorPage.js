import classNames from 'classnames/bind';

import styles from './ErrorPage.module.scss';
const cx = classNames.bind(styles);
const ErrorPage = () => {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('top')}>Không có quyền truy cập</p>
        </div>
    );
};

export default ErrorPage;
