import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './WorkExperiment.module.scss';
const cx = classNames.bind(styles);
function WorkExperiment({ workExp, onEdit, onDelete }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}>
                <p>{workExp.companyName}</p>
            </div>
            <p className={cx('bold')}>{workExp.position}</p>
            <p>{workExp.description}</p>
            <p>
                {workExp.monthFrom} - {workExp.yearFrom} đến {workExp.monthTo} - {workExp.yearTo}
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
