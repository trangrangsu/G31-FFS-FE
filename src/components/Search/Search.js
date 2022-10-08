import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Search({ title, className, onSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <div className={cx('search', { [className]: className })}>
            <input ref={inputRef} value={searchValue} placeholder={title} spellCheck={false} onChange={handleChange} />
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
    );
}
Search.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onSearch: PropTypes.func,
};
export default Search;
