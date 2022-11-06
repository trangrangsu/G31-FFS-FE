import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPenToSquare, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';

import CompanyInfoPopup from './CompanyInfoPopup';
import BasicPopup from './BasicPopup';
import Feedback from '../../freelancer/Profile/Feedback';
import * as firebase from '../../../firebase/firebase';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

const Profile = () => {
    const imgRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [recruiterId, setFreelancerId] = useState(searchParams.get('id'));
    const [image, setImage] = useState(images.defaultAvatar);
    const [recruiter, setRecruiter] = useState({});
    const [showBasicInfo, setShowBasicInfo] = useState(false);
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);
    function previewFile() {
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            imgRef.current.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            imgRef.current.src = '';
        }
    }
    const handleShowBasicInfo = () => {
        setShowBasicInfo(true);
    };
    const handleCallBack = (recruiter) => {
        setShowBasicInfo(false);
        console.log(recruiter);
    };
    const handleCallCompanyInfo = (companyInfo) => {
        setShowCompanyInfo(false);
        console.log(companyInfo);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('person-info')}>
                    <div className={cx('label')}>
                        <p>Thông tin cá nhân</p>
                        <FontAwesomeIcon icon={faPenToSquare} onClick={handleShowBasicInfo} />
                    </div>
                    <div className={cx('container-info')}>
                        <div className={cx('avatar')}>
                            <div className={cx('avatar-container')}>
                                <div className={cx('avatar-img')}>
                                    <Image src={image} alt="avatar" ref={imgRef} />
                                </div>
                                <div className={cx('avatar-upload')}>
                                    <label htmlFor="myfile1">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </label>
                                    <input
                                        type="file"
                                        id="myfile1"
                                        name="myfile"
                                        onChange={(e) => {
                                            console.log(e.target.files[0].name);
                                            //editByFieldApi('avatar', e.target.files[0].name);
                                            firebase.upLoadFile(recruiterId, 'avatar', e.target.files[0]);
                                            previewFile();
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('person-name')}>
                            <p>Nguyeenx Ba Trang</p>
                        </div>
                        <div className={cx('column')}>
                            <div className={cx('email')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p>trangnb@</p>
                                </div>
                            </div>
                            <div className={cx('phone')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p>0987654321</p>
                                </div>
                            </div>
                            <div className={cx('address')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>ha noi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('company-info')}>
                    <div className={cx('label')}>
                        <p>Thông tin công ty</p>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => {
                                setShowCompanyInfo(true);
                            }}
                        />
                    </div>
                    <div className={cx('container-info')}>
                        <div className={cx('left')}>
                            <div className={cx('info-item2')}>
                                <label>Mã số thuế: </label>
                                <p>122-333-333</p>
                            </div>
                            <div className={cx('info-item2')}>
                                <label>Website: </label>
                                <p>trangnb</p>
                            </div>
                            <div className={cx('info-item2')}>
                                <label>Ngành nghề: </label>
                                <p>ha noi</p>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <h1 className={cx('company-name')}>trang</h1>
                            <p>I'm am</p>
                        </div>
                    </div>
                </div>
                <div className={cx('feedback')}>
                    <Feedback userId={recruiterId} />
                </div>
            </div>
            {showBasicInfo && (
                <BasicPopup recruiter={recruiter} callback={handleCallBack} onclose={() => setShowBasicInfo(false)} />
            )}
            {showCompanyInfo && (
                <CompanyInfoPopup
                    companyInfo={recruiter}
                    callback={handleCallCompanyInfo}
                    onclose={() => setShowCompanyInfo(false)}
                />
            )}
        </div>
    );
};

export default Profile;
