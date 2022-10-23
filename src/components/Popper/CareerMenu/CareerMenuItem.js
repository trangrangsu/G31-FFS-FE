import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '../../Button';
import styles from './CareerMenu.module.scss';

const cx = classNames.bind(styles);

function CareerMenuItem({ data, onClick }) {
    const classes = cx('career-item');
    return (
        <Button className={classes} onClick={onClick}>
            {data.name}
        </Button>
    );
}

CareerMenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default CareerMenuItem;
