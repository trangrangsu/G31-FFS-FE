import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { faUserPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

import BanPopUp from './BanPopUp';
import images from '../../../assets/images';
import * as firebase from '../../../firebase/firebase';
import Image from '../../../components/Image';
import * as adminFreelancerService from '../../../services/adminFreelancerServices';
import Button from '../../../components/Button';
import styles from './ViewDetailFreelancer.module.scss';
const cx = classNames.bind(styles);
function ViewDetailFreelancer() {
    const [banFlag, setBanFlag] = useState(false);
    const imgRef = useRef();
    const [freelancer, setFreelancer] = useState({
        educations: [],
        workExperiences: [],
        skills: [],
    });
    const [image, setImage] = useState(images.defaultAvatar);
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const fetchApi = async () => {
        const result = await adminFreelancerService.getFreelancer(searchParams.get('id'));
        console.log(result);
        downloadFile(result.id, 'avatar');
        setFreelancer(result);
        setBanFlag(result.isBanned);
    };
    useEffect(() => {
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
                    <h1 className={cx('title')}>Thông Tin chi tiết của: {freelancer.fullName}</h1>
                </div>

                <div className={cx('freelancer-info')}>
                    <div className={cx('left-info')}>
                        <div className={cx('img-info')}>
                            <Image className={cx('avatar-info')} src={image} alt="Girl in a jacket" ref={imgRef} />
                        </div>
                        <div className={cx('left-detail')}>
                            <div className={cx('fullname')}>{freelancer.fullName}</div>
                            <div className={cx('sub-career')}>{freelancer.subCareer}</div>
                            <div>
                                Đánh giá: {freelancer.star}{' '}
                                <FontAwesomeIcon icon={faStar} className={cx('icon-user')} />
                            </div>
                            <div>Chi phí: {freelancer.costPerHour}</div>
                            <div>CV:{freelancer.cv}</div>
                        </div>
                    </div>
                    <div className={cx('right-info')}>
                        <div className={cx('right-detail')}>
                            <div>Giới tính: {freelancer.gender}</div>
                            <div>Ngày Sinh: {freelancer.birthdate}</div>
                            <div>Số diện thoại: {freelancer.phone}</div>
                            <div>Địa chỉ: {freelancer.address}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('description')}>
                    <p>{freelancer.description}</p>
                </div>
                <div className={cx('education-content')}>
                    <div className={cx('education-title')}>
                        <p>Học Vấn</p>
                    </div>
                    <div className={cx('education')}>
                        {freelancer.educations.map((education) => {
                            return (
                                <div key={education.id} className={cx('education-detail')}>
                                    <div className={cx('education-uni')}>{education.university}</div>
                                    <div className={cx('education-level')}>{education.level}</div>
                                    <div className={cx('education-time')}>
                                        {education.from}-{education.to}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('work-exp-content')}>
                    <div className={cx('work-exp-title')}>
                        <p>Kinh nghiệm làm việc</p>
                    </div>
                    <div className={cx('work-exp')}>
                        {freelancer.workExperiences.map((work_exp) => {
                            return (
                                <div key={work_exp.id} className={cx('work-exp-detail')}>
                                    <div className={cx('work-exp-name')}>{work_exp.companyName}</div>
                                    <div className={cx('work-exp-position')}>{work_exp.position}</div>
                                    <div className={cx('work-exp-time')}>
                                        {work_exp.monthFrom}/{work_exp.yearFrom}-{work_exp.monthTo}/{work_exp.yearTo}
                                    </div>
                                    <div className={cx('work-exp-description')}>{work_exp.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('work-exp-content')}>
                    <div className={cx('work-exp-title')}>
                        <p>Kỹ năng</p>
                    </div>
                    <div className={cx('skills')}>
                        {freelancer.skills.map((skill) => {
                            return (
                                <div key={skill.id} className={cx('work-exp-detail')}>
                                    <div className={cx('skill')}>
                                        <p>{skill.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Button admin className={cx(!banFlag ? 'btn-warning' : 'btn-info')} onClick={handleShowBanPopup}>
                    {!banFlag ? 'Khóa tài khoản' : 'Mở khóa'}
                </Button>
            </div>
            {show && (
                <BanPopUp
                    id={freelancer.id}
                    callback={(isBan) => {
                        setBanFlag(isBan);
                        setShow(false);
                    }}
                />
            )}
        </div>
    );
}

export default ViewDetailFreelancer;
