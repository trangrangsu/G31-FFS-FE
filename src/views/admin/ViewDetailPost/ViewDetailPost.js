import classNames from 'classnames/bind';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as firebase from '../../../firebase/firebase';
import * as adminPostServices from '../../../services/adminPostServices';
import Config from '../../../config';
import Button from '../../../components/Button';
import styles from './ViewDetailPost.module.scss';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ViewDetailPost() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [post, setPost] = useState({ createBy: '', listSkills: [] });
    const account = useSelector((state) => state.account);
    const [documentURL, setDocumentURL] = useState('#');
    //const [isApproved, setIsApproved] = useState();
    const fetchApi = async () => {
        const result = await adminPostServices.getDetailPost(searchParams.get('id'));
        console.log(result);
        setPost(result);
        setDocumentURL(result.attach);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        if (document !== '' && post.createBy.id !== undefined)
            firebase.downloadFile(post.createBy.id, searchParams.get('id'), document, setDocumentURL);
    }, [document]);
    const updateApi = async (data) => {
        const result = await adminPostServices.updatePost(data);
        console.log(result);
        setPost(result);
    };
    const handleApprove = () => {
        const data = {
            id: searchParams.get('id'),
            approveBy: account.userId,
            status: '1',
        };
        updateApi(data);
        navigateManage();
    };
    const handleDeny = () => {
        const data = {
            id: searchParams.get('id'),
            approveBy: account.userId,
            status: '0',
        };
        updateApi(data);
        navigateManage();
    };
    const navigateManage = () => {
        const to = {
            pathname: Config.routes.post,
        };
        navigate(to);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail-title')}>
                    <h1 className={cx('title')}>Thông Tin chi tiết bài đăng</h1>
                </div>
                <div className={cx('margin-bottom')}>
                    <h1 className={cx('title-header')}>{post.jobTitle}</h1>
                    <div className={cx('content')}>
                        <div className={cx('info')}>
                            <p>
                                Đã ngày <span>{post.time}</span> bởi{' '}
                                <Button
                                    to={{
                                        pathname: Config.routes.viewDetailFreelancerAdmin,
                                        search: `?id=${post.createBy.id}`,
                                    }}
                                >
                                    {post.createBy.name}
                                </Button>
                            </p>
                        </div>
                        <div className={cx('description')}>
                            <p>{post.description}</p>
                        </div>
                        <div className={cx('attach')}>
                            <p>Đính kèm:</p>
                            <Button href={documentURL}>{post.attach}</Button>
                        </div>
                    </div>
                </div>
                <div className={cx('margin-bottom')}>
                    <h1 className={cx('title-header')}>Yêu Cầu</h1>
                    <div className={cx('row1')}>
                        <div className={cx('subCareer')}>
                            <label className={cx('label')}>Chuyên ngành</label>
                            <div>
                                <p>{post.subCareer}</p>
                            </div>
                        </div>
                        <div className={cx('Skills')}>
                            <label className={cx('label')}>Kỹ năng</label>
                            <div className={cx('container-skill')}>
                                {post.listSkills.map((skill) => (
                                    <div key={skill.id}>
                                        <p>{skill.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('row2')}>
                        <label className={cx('label')}>Khu vực</label>
                        <div>
                            <p>{post.area}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('margin-bottom')}>
                    <h1 className={cx('title-header')}>Ngân sách</h1>
                    <div className={cx('padding')}>
                        <div className={cx('top')}>
                            <FontAwesomeIcon icon={faSackDollar} />
                            <p>{post.budget} VND</p>
                        </div>
                        <p className={cx('bottom')}>{post.paymentType}</p>
                    </div>
                </div>
                {post.isApproved === 2 && (
                    <div>
                        <Button approve className={cx('btn-post')} onClick={handleApprove}>
                            Xác nhận
                        </Button>
                        <Button deny className={cx('btn-post')} onClick={handleDeny}>
                            Từ chối
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewDetailPost;
