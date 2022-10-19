import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import Header from '../../components/HomeHeader';
import UserHeader from '../../components/UserHeader';
import Footer from '../../components/HomeFooter';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    const currentUser = {
        account_id: 'lf12345678',
        role_id: 3,
    };
    return (
        <div className={cx('wrapper')}>
            <UserHeader />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}
HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HomeLayout;
