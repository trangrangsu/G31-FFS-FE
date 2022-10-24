import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useDebounce } from '../../hooks';
import styles from './GlobalSearch.module.scss';
const cx = classNames.bind(styles);

function GlobalSearch({ title, className, onSearch, onPending }) {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        // if (!debouncedValue.trim()) {
        //     return;
        // }
        onPending(debouncedValue);
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <div>
            <div className={cx('search', { [className]: className })}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder={title}
                    spellCheck={false}
                    onChange={handleChange}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button
                    className={cx('search-btn')}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                        return onSearch(searchValue);
                    }}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
}
GlobalSearch.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onSearch: PropTypes.func,
    onPending: PropTypes.func,
};
export default GlobalSearch;
