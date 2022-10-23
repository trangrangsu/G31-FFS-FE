import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

//import * as searchServices from '../../services/searchService';
import { useDebounce } from '../../hooks';
import images from '../../assets/images';
import { Wrapper as PopperWrapper } from '../../components/Popper';
import UserItem from '../UserItem';
import styles from './SearchSkill.module.scss';
const cx = classNames.bind(styles);

function SearchSkill({ title, className, onClick }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();
    useEffect(() => {
        setSearchResult(['Java', 'SQL', 'C++']);
    }, []);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        // const fetchApi = async () => {
        //     setLoading(true);

        //     const result = await searchServices.search(debouncedValue);

        //     setSearchResult(result);
        //     setLoading(false);
        // };

        // fetchApi();
        setLoading(true);
        console.log('ahihi');
        setLoading(false);
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
                //visible
                placement="bottom-end"
                // visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {[
                                { id: 10, name: 'Java' },
                                { id: 20, name: 'SQL' },
                                { id: 30, name: 'C++' },
                                { id: 40, name: 'Python' },
                                { id: 50, name: 'react' },
                            ].map((skill) => {
                                return (
                                    <p key={skill.id} className={cx('result')} onClick={() => onClick(skill)}>
                                        {skill.name}
                                    </p>
                                );
                            })}
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
                </div>
            </HeadlessTippy>
        </div>
    );
}
SearchSkill.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
export default SearchSkill;
