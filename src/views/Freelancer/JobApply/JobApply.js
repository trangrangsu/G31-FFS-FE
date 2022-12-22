import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Select, Pagination } from 'antd';

import Image from '../../../components/Image';
import images from '../../../assets/images';
import * as freelancerJobManagementServices from '../../../services/freelancerJobManagementServices';
import PostItem from './PostItem';
import styles from './JobApply.module.scss';
const cx = classNames.bind(styles);

const JobApply = () => {
    const account = useSelector((state) => state.account);
    const [active, setActive] = useState(true);
    const [status, setStatus] = useState(-1);
    const [posts, setPosts] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [type, setType] = useState('apply');

    const getAllJobRequestApi = async (status, pageIndex) => {
        const result = await freelancerJobManagementServices.getAllJobRequest(account.userId, status, pageIndex);
        console.log(result);
        if (typeof result === 'object') {
            setPosts(result.results);
            setTotalResults(result.totalResults);
        }
    };
    const getAllJobSavedApi = async (pageIndex) => {
        const result = await freelancerJobManagementServices.getAllJobSaved(account.userId, pageIndex);
        console.log(result);
        if (typeof result === 'object') {
            setPosts(result.results);
            setTotalResults(result.totalResults);
        }
    };
    useEffect(() => {
        getAllJobRequestApi(status, 0);
    }, []);
    const handleChange = (value) => {
        setStatus(value);
        getAllJobRequestApi(value, 0);
    };
    const handleApplied = () => {
        setActive(true);
        setType('apply');
        getAllJobRequestApi(status, 0);
    };
    const handleSaved = () => {
        setActive(false);
        setStatus(-1);
        setType('save');
        getAllJobSavedApi(0);
    };
    const onChangePage = (page, pageSize) => {
        getAllJobRequestApi(status, page - 1);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('head')}>
                    <Image src={images.jobManagement} alt="avatar" className={cx('image-tile')} />
                    <div className={cx('mini-nav')}>
                        <div className={cx('nav-item2', active ? 'active' : '')} onClick={handleApplied}>
                            Đã ứng tuyển
                        </div>
                        <div className={cx('nav-item2', active ? '' : 'active')} onClick={handleSaved}>
                            Đã lưu
                        </div>
                    </div>
                </div>
                <div className={cx('list-post')}>
                    {active && (
                        <div className={cx('filter')}>
                            <Select
                                defaultValue="-1"
                                style={{
                                    width: 160,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: '-1',
                                        label: 'Tất cả',
                                    },
                                    {
                                        value: '2',
                                        label: 'Đang chờ',
                                    },
                                    {
                                        value: '1',
                                        label: 'Đã chấp nhận',
                                    },
                                    {
                                        value: '0',
                                        label: 'Không chấp nhận',
                                    },
                                ]}
                            />
                        </div>
                    )}
                    {posts.map((post) => (
                        <PostItem key={post.postID} post={post} type={type} userId={account.userId} />
                    ))}
                    {posts.length === 0 && <p className={cx('message')}>Không có bài đăng</p>}
                </div>
                {totalResults > 10 && (
                    <div className={cx('paging')}>
                        <Pagination defaultCurrent="1" pageSize="10" total={totalResults} onChange={onChangePage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApply;
