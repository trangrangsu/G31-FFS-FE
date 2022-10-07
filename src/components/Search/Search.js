import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Search({ title }) {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <div className={cx('search')}>
            <input ref={inputRef} value={searchValue} placeholder={title} spellCheck={false} onChange={handleChange} />
            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default Search;
