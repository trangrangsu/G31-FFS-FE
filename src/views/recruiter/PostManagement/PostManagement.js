import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Input, Select, Pagination } from 'antd';
import { useSelector } from 'react-redux';

import Image from '../../../components/Image';
import images from '../../../assets/images';
import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import PostItem from './PostItem';
import styles from './PostManagement.module.scss';

const { Search } = Input;
const cx = classNames.bind(styles);
const PostManagement = () => {
    const account = useSelector((state) => state.account);
    const [status, setStatus] = useState(-1);
    const [keyWord, setKeyWord] = useState('');
    const [posts, setPosts] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    const getAllJobPostedApi = async (status, pageIndex) => {
        const result = await recruiterPostManagementServices.getAllJobPosted(
            keyWord,
            account.userId,
            pageIndex,
            status,
        );
        console.log(result);
        if (typeof result === 'object') {
            setPosts(result.results);
            setTotalResults(result.totalResults);
        }
    };

    useEffect(() => {
        getAllJobPostedApi(status, 0);
    }, []);

    const onSearch = (value) => {
        getAllJobPostedApi(status, 0);
    };
    const handleChange = (value) => {
        setStatus(value);
        getAllJobPostedApi(value, 0);
    };
    const onChangePage = (page, pageSize) => {
        getAllJobPostedApi(status, page - 1);
    };
    const handleChangeKeyWord = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            return;
        }
        if (!value.startsWith(' ')) {
            setKeyWord(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('head')}>
                    <Image src={images.postManagement} alt="avatar" className={cx('page-title')} />
                    <div className={cx('search')}>
                        <div>
                            <Select
                                defaultValue="-1"
                                style={{
                                    width: 160,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: '-1',
                                        label: 'T???t c???',
                                    },
                                    {
                                        value: '2',
                                        label: '??ang ch???',
                                    },
                                    {
                                        value: '1',
                                        label: '???? ch???p nh???n',
                                    },
                                    {
                                        value: '0',
                                        label: 'Kh??ng ch???p nh???n',
                                    },
                                ]}
                            />
                        </div>
                        <div className={cx('search-input')}>
                            <Search
                                style={{ width: '500px' }}
                                placeholder="nh???p t??? kh??a"
                                value={keyWord}
                                onChange={handleChangeKeyWord}
                                onSearch={onSearch}
                                enterButton
                            />
                        </div>
                    </div>
                </div>
                {posts.map((post) => (
                    <PostItem post={post} key={post.jobId} />
                ))}
                {posts.length === 0 && <p className={cx('messageResults')}>Kh??ng c?? b??i ????ng</p>}
                {totalResults > 10 && (
                    <div className={cx('paging')}>
                        <Pagination defaultCurrent="1" pageSize="10" total={totalResults} onChange={onChangePage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostManagement;
