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
    const [document, setDocument] = useState('');
    const [documentURL, setDocumentURL] = useState('#');
    const [isValidPost, setIsValidPost] = useState(true);

    const fetchApi = async () => {
        const result = await adminPostServices.getDetailPost(searchParams.get('id'));
        console.log(result);
        if (result !== undefined && result !== '' && result !== null) {
            setPost(result);
            setDocument(result.attach);
        } else {
            setIsValidPost(false);
        }
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
            {isValidPost ? (
                <div className={cx('container')}>
                    <div className={cx('detail-title')}>
                        <h1 className={cx('title')}>Th??ng Tin chi ti???t b??i ????ng</h1>
                    </div>
                    <div className={cx('margin-bottom')}>
                        <h1 className={cx('title-header')}>{post.jobTitle}</h1>
                        <div className={cx('content')}>
                            <div className={cx('info')}>
                                <p>
                                    ???? ng??y <span>{post.time}</span> b???i{' '}
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
                                <p>????nh k??m:</p>
                                <Button href={documentURL}>{post.attach}</Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('margin-bottom')}>
                        <h1 className={cx('title-header')}>Y??u C???u</h1>
                        <div className={cx('row1')}>
                            <div className={cx('subCareer')}>
                                <label className={cx('label')}>Chuy??n ng??nh</label>
                                <div>
                                    <p>{post.subCareer}</p>
                                </div>
                            </div>
                            <div className={cx('Skills')}>
                                <label className={cx('label')}>K??? n??ng</label>
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
                            <label className={cx('label')}>Khu v???c</label>
                            <div>
                                <p>{post.area}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('margin-bottom')}>
                        <h1 className={cx('title-header')}>Ng??n s??ch</h1>
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
                                X??c nh???n
                            </Button>
                            <Button deny className={cx('btn-post')} onClick={handleDeny}>
                                T??? ch???i
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className={cx('container')}>
                    <p className={cx('message-Invalid')}>B??i ????ng kh??ng t???n t???i</p>
                </div>
            )}
        </div>
    );
}

export default ViewDetailPost;
