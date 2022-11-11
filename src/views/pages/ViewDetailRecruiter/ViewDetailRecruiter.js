import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import * as searchPostFreelancerServices from '../../../services/searchPostFreelancerServices';
import Feedback from '../../freelancer/Profile/Feedback';
import * as firebase from '../../../firebase/firebase';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import styles from './ViewDetailRecruiter.module.scss';
const cx = classNames.bind(styles);

function ViewDetailFreelancer() {
    const text = 'Phí xem thông tin là 0.5$';
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const imgRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [recruiterId, setRecruiterId] = useState(searchParams.get('id'));
    const [image, setImage] = useState(images.defaultAvatar);
    const [recruiter, setRecruiter] = useState({});
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [career, setCareer] = useState({});
    const [companyName, setCompanyName] = useState('');
    const [companyIntro, setCompanyIntro] = useState('');
    const [buyService, setBuyService] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    const fetchApi = async () => {
        const result = await searchPostFreelancerServices.getProfileFreelancer(recruiterId, account.userId);
        console.log(result);
        setRecruiter(result);
        setFullName(result.fullName);
        setEmail(result.email);
        setPhone(result.phone);
        setAddress(result.address);
        setCity(result.city);
        setCountry(result.country);
        setTaxNumber(result.taxNumber);
        setWebsite(result.website);
        setIsApplied(result.isApplied);
        if (result.career !== null) {
            setCareer(result.career);
        }
        setCompanyName(result.companyName);
        setCompanyIntro(result.companyIntro);
        if (result.avatar !== null) {
            setAvatar(result.avatar);
        }
    };
    const updateAccountBalanceApi = async () => {
        const result = await searchPostFreelancerServices.updateAccountBalance(account.userId, 0.5);
        if (result) {
            setBuyService(true);
            dispatch({ type: 'set', accountBalance: accountBalance - 0.5 });
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        console.log(avatar);
        if (avatar !== '') firebase.downloadFile(recruiterId, 'avatar', avatar, setImage);
    }, [avatar]);
    const handleSubmit = () => {
        updateAccountBalanceApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('person-info')}>
                    <div className={cx('label')}>
                        <p>Thông tin cá nhân</p>
                    </div>
                    <div className={cx('container-info')}>
                        <div className={cx('avatar')}>
                            <div className={cx('avatar-container')}>
                                <div className={cx('avatar-img')}>
                                    <Image src={image} alt="avatar" ref={imgRef} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('person-name')}>
                            <p>{fullName}</p>
                        </div>
                        <div className={cx('column')}>
                            {(isApplied || account.isMemberShip || buyService) && (
                                <>
                                    <div className={cx('email')}>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <p>{email}</p>
                                        </div>
                                    </div>
                                    <div className={cx('phone')}>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faPhone} />
                                            <p>{phone}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            {!isApplied && !account.isMemberShip && !buyService && (
                                <>
                                    <div className={cx('email')}>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <p>*****************</p>
                                        </div>
                                    </div>
                                    <div className={cx('phone')}>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faPhone} />
                                            <p>**********</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={cx('address')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>
                                        {address} - {city} - {country}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {!isApplied && !account.isMemberShip && !buyService && (
                            <div>
                                <Popconfirm
                                    placement="top"
                                    title={text}
                                    onConfirm={handleSubmit}
                                    okText="Xem thông tin"
                                    cancelText="Hủy"
                                >
                                    <Button type="primary" size="large">
                                        Thông tin liên hệ
                                    </Button>
                                </Popconfirm>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('company-info')}>
                    <div className={cx('label')}>
                        <p>Thông tin công ty</p>
                    </div>
                    <div className={cx('container-info')}>
                        <div className={cx('left')}>
                            <div className={cx('info-item2')}>
                                <label>Mã số thuế: </label>
                                <p>{taxNumber}</p>
                            </div>
                            <div className={cx('info-item2')}>
                                <label>Website: </label>
                                {website !== null && <a href={website}>{website}</a>}
                            </div>
                            <div className={cx('info-item2')}>
                                <label>Ngành nghề: </label>
                                <p>{career.name}</p>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            {companyName !== null && <h1 className={cx('company-name')}>{companyName}</h1>}
                            {companyName === null && <p>chưa có thông tin công ty</p>}
                            <p>{companyIntro}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('feedback')}>
                    <Feedback userId={recruiterId} />
                </div>
            </div>
        </div>
    );
}

export default ViewDetailFreelancer;
