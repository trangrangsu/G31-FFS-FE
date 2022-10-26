import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import styles from './WorkExperiment.module.scss';
const cx = classNames.bind(styles);
function WorkExperiment({ workExp, onEdit, onDelete }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}>
                <p>{workExp.companyName}</p>
                <div>
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEdit(workExp)} className={cx('left')} />
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => onDelete(workExp.id)} className={cx('right')} />
                </div>
            </div>
            <p className={cx('bold')}>{workExp.position}</p>
            <p>{workExp.description}</p>
            <p>
                {workExp.from} - {workExp.to}
            </p>
        </div>
    );
}
WorkExperiment.propTypes = {
    workExp: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default WorkExperiment;
