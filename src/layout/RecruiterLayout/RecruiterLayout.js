import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './RecruiterLayout.module.scss';
import UserHeader from '../../components/UserHeader';
import Footer from '../../components/HomeFooter';

const cx = classNames.bind(styles);

function RecruiterLayout({ children }) {
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
RecruiterLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RecruiterLayout;
