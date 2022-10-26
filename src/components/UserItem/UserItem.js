import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import images from '../../assets/images';
import Config from '../../config';
import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

function UserItem({ data, type }) {
    const [path, setPath] = useState(Config.routes.viewDetailFreelancerAdmin);
    useEffect(() => {
        if (type !== 'f') {
            setPath(Config.routes.viewDetailRecruiterAdmin);
        }
    }, []);
    return (
        <Link
            to={{
                pathname: path,
                search: `?id=${data.id}`,
            }}
            className={cx('wrapper')}
        >
            <img className={cx('avatar')} src={images.trang} alt={data.fullName} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.fullName}</span>
                </h4>
                <span className={cx('email')}>{data.email}</span>
            </div>
        </Link>
    );
}
UserItem.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};
export default UserItem;
