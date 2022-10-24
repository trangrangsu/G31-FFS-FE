import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';

import { faUserPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';
import * as adminRecruiterServices from '../../../services/adminRecruiterServices';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

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
    const [recruiter, setRecruiter] = useState({ career: { name: '' } });
    const [image, setImage] = useState(images.defaultAvatar);
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminRecruiterServices.getRecruiter(searchParams.get('id'));
            console.log(result);
            downloadFile(result.id, 'avatar');
            setRecruiter(result);
        };
        fetchApi();
    }, []);
    const downloadFile = async (userId, type) => {
        const ImageService = ref(firebase.storage, `${userId}/${type}`);
        await listAll(ImageService)
            .then((res) => {
                res.items.forEach(async (itemRef) => {
                    await getDownloadURL(ref(firebase.storage, itemRef._location.path_)).then((url) => {
                        console.log(url);
                        imgRef.current.src = url;
                    });
                });
            })
            .catch((error) => {
                console.log('Lỗi');
            });
    };
    const handleShowBanPopup = () => {
        setShow(true);
    };
    return (
        <div className={cx('wrapper')}>
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
                            <div className={cx('companyname')}>{recruiter.companyName}</div>
                            <div className={cx('career')}>{recruiter.career.name}</div>
                            <div>
                                Đánh giá: {recruiter.star} <FontAwesomeIcon icon={faStar} className={cx('icon-user')} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-info')}>
                        <div className={cx('right-detail')}>
                            <div>Phone: {recruiter.phone}</div>
                            <div>Email: {recruiter.email}</div>
                            <div>Tax-Number: {recruiter.taxNumber}</div>
                            <div>Website: {recruiter.website}</div>
                        </div>
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
                        <p>Mô tả công ty</p>
                    </div>
                    <div className={cx('description')}>{recruiter.companyIntro}</div>
                </div>
                <Button admin className={cx(!banFlag ? 'btn-warning' : 'btn-info')} onClick={handleShowBanPopup}>
                    {!banFlag ? 'Khóa tài khoản' : 'Mở khóa'}
                </Button>
            </div>
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
