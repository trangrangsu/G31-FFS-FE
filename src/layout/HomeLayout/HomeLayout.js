import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import Header from '../../components/HomeHeader';
import Footer from '../../components/HomeFooter';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}
HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HomeLayout;
