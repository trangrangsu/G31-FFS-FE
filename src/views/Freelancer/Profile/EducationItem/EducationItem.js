import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import styles from './EducationItem.module.scss';
const cx = classNames.bind(styles);
function EducationItem({ education, onEdit, onDelete }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}>
                <p>{education.university}</p>
                <div>
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEdit(education)} className={cx('left')} />
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => onDelete(education.id)} className={cx('right')} />
                </div>
            </div>
            <p className={cx('bold')}>{education.major}</p>
            <p>{education.level}</p>
            <p>
                {education.from} - {education.to}
            </p>
        </div>
    );
}
EducationItem.propTypes = {
    education: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default EducationItem;
