import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from '../../config';
import images from '../../assets/images';
import Button from '../../components/Button';
import styles from './HomeHeader.module.scss';

const cx = classNames.bind(styles);

function HomeHeader() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Lanceddy" />
                </Link>
                <div className={cx('authentication')}>
                    <Button text rounded to={config.routes.register} className={cx('btn')}>
                        Đăng ký
                    </Button>
                    <Button text rounded to={config.routes.login} className={cx('btn')}>
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;