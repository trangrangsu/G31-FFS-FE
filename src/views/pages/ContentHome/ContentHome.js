import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Carousel } from 'antd';
import config from '../../../config';
import images from '../../../assets/images';
import './Slider.scss';
import styles from './ContentHome.module.scss';
const cx = classNames.bind(styles);
const contentStyle = {
    height: '650px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};
function ContentHome() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    useEffect(() => {
        if (userId !== null) {
            let to = {};
            switch (userRole) {
                case 'freelancer':
                    to = {
                        pathname: config.routes.searchJob,
                    };
                    break;
                case 'recruiter':
                    to = {
                        pathname: config.routes.postManagement,
                    };
                    break;
                case 'admin':
                    to = {
                        pathname: config.routes.dashboard,
                    };
                    break;
                case 'staff':
                    to = {
                        pathname: config.routes.freelancer,
                    };
                    break;
                default:
            }
            navigate(to);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('guest-intro')}>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={images.back3} alt="" />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={images.back4} alt="" />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={images.back5} alt="" />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img src={images.back6} alt="" />
                        </h3>
                    </div>
                </Carousel>
            </div>
            <div className={cx('distance')}></div>
            <div className={cx('top-job')}>
                <h2 className={cx('top-job-title')}>C??ng vi???c ???????c thu?? nhi???u nh???t</h2>
                <div className={cx('top-job-list')}>
                    <div className={cx('top-job-row')}>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.design} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Thi???t k??? website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.translate} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>D???ch thu???t</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.website} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>L???p tr??nh website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.music} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>L??m video clip</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('top-job-row')}>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.seo} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>T???i ??u h??a c??ng c??? t??m ki???m seo</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.build} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Vi???t n???i dung website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.logos} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Thi???t k??? logo</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.app} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>???ng d???ng di ?????ng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('distance')}></div>
            <div className={cx('advantages')}>
                <h2 className={cx('advantages-title')}>T???i Sao N??n Tuy???n D???ng T???i Lanceddy?</h2>
                <p>T??ng hi???u qu??? tuy???n d???ng - Ti???t ki???m ng??n s??ch</p>
                <div className={cx('advantages-row')}>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.cv} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>H??ng ng??n h??? s?? ???ng vi??n ch???t l?????ng, c?? chuy??n m??n</p>
                        </div>
                    </div>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.iot} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>K???t n???i nhanh ch??ng</p>
                        </div>
                    </div>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.choose} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Tuy???n d???ng ch??nh x??c freelancer b???n c???n</p>
                        </div>
                    </div>
                </div>
            </div>{' '}
            <span className="sliderSpan1" id="sliderSpan1"></span>
            <span className="sliderSpan2" id="sliderSpan2"></span>
            <span className="sliderSpan3" id="sliderSpan3"></span>
            <span className="sliderSpan4" id="sliderSpan4"></span>
            <span className="sliderSpan5" id="sliderSpan5"></span>
            <div className={cx('distance')}></div>
            <div className={cx('about-us')}>
                <h2 className={cx('about-us-title')}>Th??nh vi??n d??? ??n</h2>
                <div className={cx('about-us-container')}>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.cong} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>N?? ch???y ... tr??n m??y c???a t??i</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Bi???n V??n C??ng</h3>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.manh} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>??i m???t ng??y ????ng h???c m???t s??ng kh??n</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguy???n V??n M???nh</h3>
                            <p>Fontend Developer</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.trang} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>It happened! So it happened.</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguy???n B?? Trang</h3>
                            <p>Leader</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.quyet} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>H???c h???t s???c, ch??i h???t m??nh</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguy???n B???c Quy???t</h3>
                            <p>Fontend Developer</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.tuyen} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>Th??nh qu??? c???a im l???ng l?? h??a b??nh</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguy???n H???u Tuy??n</h3>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'slideContainer'}>
                <div className="imageSlider">
                    <div className="slidesDiv">
                        <div className="img img1">
                            <div className={cx('about-us-img')}>
                                <img src={images.cong} alt="cong" />
                            </div>
                            <div className={cx('about-us-maxim')}>
                                <p>N?? ch???y ... tr??n m??y c???a t??i</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Bi???n V??n C??ng</h3>
                                <p>Backend Developer</p>
                            </div>
                        </div>
                        <a href="#sliderSpan1" className="button button1"></a>
                    </div>
                    <div className="slidesDiv">
                        <div className="img img2">
                            <div className={cx('about-us-img')}>
                                <img src={images.manh} alt="cong" />
                            </div>
                            <div className={cx('about-us-maxim')}>
                                <p>??i m???t ng??y ????ng h???c m???t s??ng kh??n</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguy???n V??n M???nh</h3>
                                <p>Fontend Developer</p>
                            </div>
                        </div>
                        <a href="#sliderSpan2" className="button button2"></a>
                    </div>
                    <div className="slidesDiv">
                        <div className="img img3">
                            <div className={cx('about-us-img')}>
                                <img src={images.trang} alt="cong" />
                            </div>
                            <div className={cx('about-us-maxim')}>
                                <p>It happened! So it happened.</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguy???n B?? Trang</h3>
                                <p>Leader</p>
                            </div>
                        </div>
                        <a href="#sliderSpan3" className="button button3"></a>
                    </div>
                    <div className="slidesDiv">
                        <div className="img img4">
                            <div className={cx('about-us-img')}>
                                <img src={images.quyet} alt="cong" />
                            </div>
                            <div className={cx('about-us-maxim')}>
                                <p>H???c h???t s???c, ch??i h???t m??nh</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguy???n B???c Quy???t</h3>
                                <p>Fontend Developer</p>
                            </div>
                        </div>
                        <a href="#sliderSpan4" className="button button4"></a>
                    </div>
                    <div className="slidesDiv">
                        <div className="img img5">
                            <div className={cx('about-us-img')}>
                                <img src={images.tuyen} alt="cong" />
                            </div>
                            <div className={cx('about-us-maxim')}>
                                <p>Th??nh qu??? c???a im l???ng l?? h??a b??nh</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguy???n H???u Tuy??n</h3>
                                <p>Backend Developer</p>
                            </div>
                        </div>
                        <a href="#sliderSpan5" className="button button5"></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentHome;
