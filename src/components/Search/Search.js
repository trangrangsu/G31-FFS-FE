import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import * as adminFreelancerService from '../../services/adminFreelancerServices';
import * as adminRecruiterServices from '../../services/adminRecruiterServices';
import { useDebounce } from '../../hooks';
import { Wrapper as PopperWrapper } from '../../components/Popper';
import UserItem from '../UserItem';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search({ type, title, className, isActive, onSearch, onPending }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            let result = {};
            if (type === 'f') {
                result = await adminFreelancerService.getTop5(debouncedValue);
            } else {
                result = await adminRecruiterServices.getTop5(debouncedValue, isActive);
            }
            console.log(result);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
        onPending(debouncedValue);
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <div>
            <HeadlessTippy
                interactive
                //visible={true}
                placement="bottom-end"
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>User</h4>
                            {searchResult.map((userItem) => (
                                <UserItem data={userItem} key={userItem.id} type={type} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search', { [className]: className })}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder={title}
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
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
            </HeadlessTippy>
        </div>
    );
}
Search.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onSearch: PropTypes.func,
    onPending: PropTypes.func,
};
export default Search;
