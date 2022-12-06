import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import * as firebase from '../../firebase/firebase';
import images from '../../assets/images';
import Config from '../../config';
import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

function UserItem({ data, type }) {
    const [path, setPath] = useState(Config.routes.viewDetailFreelancerAdmin);
    const [image, setImage] = useState(images.defaultAvatar);
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        if (data.avatar !== null) {
            setAvatar(data.avatar);
        }
        if (type !== 'f') {
            setPath(Config.routes.viewDetailRecruiterAdmin);
        }
    }, []);
    useEffect(() => {
        if (avatar !== '') firebase.downloadFile(data.id, 'avatar', avatar, setImage);
    }, [avatar]);
    return (
        <Link
            to={{
                pathname: path,
                search: `?id=${data.id}`,
            }}
            className={cx('wrapper')}
        >
            <img className={cx('avatar')} src={image} alt={data.fullName} />
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
