import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Config from '../../config';
import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

function UserItem({ data }) {
    return (
        <Link
            to={{
                pathname: Config.routes.viewDetailFreelancerAdmin,
                search: `?id=${data.id}`,
            }}
            className={cx('wrapper')}
        >
            <img className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                </h4>
                <span className={cx('email')}>{data.email}</span>
            </div>
        </Link>
    );
}
UserItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default UserItem;
