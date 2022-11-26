import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';

import { faUserPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';
import * as adminRecruiterServices from '../../../services/adminRecruiterServices';
import * as adminFreelancerService from '../../../services/adminFreelancerServices';

import { Star } from '../../../components/Icons';
import Image from '../../../components/Image';
import * as firebase from '../../../firebase/firebase';
import BanPopUp from './BanPopUp';
import images from '../../../assets/images';
import Button from '../../../components/Button';
import styles from './ViewDetailRecruiter.module.scss';
const cx = classNames.bind(styles);
function ViewDetailRecruiter() {
    const [banFlag, setBanFlag] = useState(false);
    const imgRef = useRef();
    const [avatar, setAvatar] = useState('');
    const [recruiter, setRecruiter] = useState({ career: { name: '' } });
    const [image, setImage] = useState(images.defaultAvatar);
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isValidRecruiter, setIsValidRecruiter] = useState(true);

    const unBanApi = async (userId) => {
        const result = await adminFreelancerService.unBan(userId);
        console.log(result);
    };
    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminRecruiterServices.getRecruiter(searchParams.get('id'));
            console.log(result);
            if (result !== undefined && result !== '' && result !== null) {
                setRecruiter(result);
                setBanFlag(result.isBanned);
                if (result.avatar !== null) {
                    setAvatar(result.avatar);
                }
            } else {
                setIsValidRecruiter(false);
            }
        };
        fetchApi();
    }, []);
    useEffect(() => {
        if (avatar !== '') firebase.downloadFile(recruiter.id, 'avatar', avatar, setImage);
    }, [avatar]);

    const handleShowBanPopup = () => {
        setShow(true);
    };
    const handleUnban = () => {
        unBanApi(searchParams.get('id'));
        setBanFlag(false);
    };
    return (
        <div className={cx('wrapper')}>
            {isValidRecruiter ? (
                <div className={cx('container')}>
                    <div className={cx('detail-title')}>
                        <FontAwesomeIcon icon={faUserPen} className={cx('icon-user')} />
                        <h1 className={cx('title')}>Thông Tin chi tiết của: {recruiter.companyName}</h1>
                    </div>

                    <div className={cx('recruiter-info')}>
                        <div className={cx('left-info')}>
                            <div className={cx('img-info')}>
                                <Image className={cx('avatar-info')} src={image} alt="Girl in a jacket" ref={imgRef} />
                            </div>
                            <div className={cx('left-detail')}>
                                <div className={cx('companyname')}>{recruiter.fullName}</div>
                                <div>
                                    <label>Đánh giá:</label>
                                    {recruiter.star === 0 ? (
                                        <p>Chưa có đánh giá</p>
                                    ) : (
                                        <p>
                                            {recruiter.star} <Star />
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('right-info')}>
                            <div className={cx('right-detail')}>
                                <div>Phone: {recruiter.phone}</div>
                                <div>Email: {recruiter.email}</div>
                            </div>
                        </div>
                        <div className={cx('action')}>
                            {!banFlag && (
                                <Button admin className={cx('btn-warning')} onClick={handleShowBanPopup}>
                                    {'Khóa tài khoản'}
                                </Button>
                            )}
                            {banFlag && (
                                <Button admin className={cx('btn-info')} onClick={handleUnban}>
                                    {'Mở khóa'}
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={cx('address-content')}>
                        <div className={cx('address-title')}>
                            <p>Địa chỉ</p>
                        </div>
                        <div className={cx('address')}>{recruiter.address}</div>
                    </div>
                    <div className={cx('description-content')}>
                        <div className={cx('description-title')}>
                            <p>{recruiter.companyName}</p>
                        </div>
                        <div className={cx('padding')}>
                            <div className={cx('description')}>{recruiter.companyIntro}</div>
                            <div className={cx('background-color')}>
                                <label className={cx('label')}>Ngành nghề:</label>
                                <p>{recruiter.career.name}</p>
                            </div>
                            <div className={cx('background-color')}>
                                <label className={cx('label')}>Tax-Number:</label> <p>{recruiter.taxNumber}</p>
                            </div>
                            <div className={cx('background-color')}>
                                <label className={cx('label')}>Website:</label>{' '}
                                <Button text href={recruiter.website} className={cx('document')}>
                                    {recruiter.website}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <p className={cx('message-Invalid')}>Nhà tuyển dụng không tồn tại</p>
                </div>
            )}
            {show && (
                <BanPopUp
                    id={recruiter.id}
                    callback={(isBan) => {
                        setBanFlag(isBan);
                        setShow(false);
                    }}
                />
            )}
        </div>
    );
}

export default ViewDetailRecruiter;
