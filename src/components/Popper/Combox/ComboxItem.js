import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '../../Button';
import styles from './Combox.module.scss';

const cx = classNames.bind(styles);

function ComboxItem({ data, onClick }) {
    const classes = cx('career-item');
    return (
        <Button className={classes} onClick={onClick}>
            {data}
        </Button>
    );
}

ComboxItem.propTypes = {
    data: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ComboxItem;
