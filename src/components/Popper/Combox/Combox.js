import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { CFormInput } from '@coreui/react';

import { Wrapper as PopperWrapper } from '../../Popper';
import ComboxItem from './ComboxItem';
import styles from './Combox.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Combox({ children, array = [], hideOnClick = false, onChange = defaultFn }) {
    const [value, setValue] = useState(array);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        if (searchValue !== '') {
            const arr = array.filter((valueArr) => {
                return valueArr.includes(searchValue);
            });
            setValue(arr);
        } else {
            setValue(array);
        }
    }, [searchValue]);

    const renderItems = (arr) => {
        return arr.map((item, index) => {
            return (
                <ComboxItem
                    key={index}
                    data={item}
                    onClick={() => {
                        onChange(item);
                    }}
                />
            );
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('input-popper')}>
                    <CFormInput
                        type="text"
                        value={searchValue}
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className={cx('menu-body')}>{renderItems(value)}</div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy interactive hideOnClick={hideOnClick} placement="bottom-start" render={renderResult}>
            {children}
        </Tippy>
    );
}

Combox.propTypes = {
    children: PropTypes.node.isRequired,
    array: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Combox;
