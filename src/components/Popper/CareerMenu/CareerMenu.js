import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '../../Popper';
import CareerMenuItem from './CareerMenuItem';
import Header from './Header';
import styles from './CareerMenu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function CareerMenu({ children, careers = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: careers }]);
    console.log(history);
    console.log(careers);
    const current = history[history.length - 1];
    const renderItems = () => {
        console.log(current);
        return current.data.map((item, index) => {
            const isParent = !!item.subCareers;

            return (
                <CareerMenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.subCareers]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            offset={[0, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-start"
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

CareerMenu.propTypes = {
    children: PropTypes.node.isRequired,
    careers: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CareerMenu;
