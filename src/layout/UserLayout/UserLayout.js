import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './UserLayout.module.scss';
import UserHeader from '../../components/UserHeader';
import Footer from '../../components/HomeFooter';

const cx = classNames.bind(styles);

function UserLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <UserHeader />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}
UserLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserLayout;
