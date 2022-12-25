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
                <h2 className={cx('top-job-title')}>Công việc được thuê nhiều nhất</h2>
                <div className={cx('top-job-list')}>
                    <div className={cx('top-job-row')}>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.design} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Thiết kế website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.translate} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Dịch thuật</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.website} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Lập trình website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.music} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Làm video clip</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('top-job-row')}>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.seo} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Tối ưu hóa công cụ tìm kiếm seo</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.build} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Viết nội dung website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.logos} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Thiết kế logo</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.app} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Ứng dụng di động</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('distance')}></div>
            <div className={cx('advantages')}>
                <h2 className={cx('advantages-title')}>Tại Sao Nên Tuyển Dụng Tại Lanceddy?</h2>
                <p>Tăng hiệu quả tuyển dụng - Tiết kiệm ngân sách</p>
                <div className={cx('advantages-row')}>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.cv} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Hàng ngàn hồ sơ ứng viên chất lượng, có chuyên môn</p>
                        </div>
                    </div>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.iot} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Kết nối nhanh chóng</p>
                        </div>
                    </div>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.choose} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Tuyển dụng chính xác freelancer bạn cần</p>
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
                <h2 className={cx('about-us-title')}>Thành viên dự án</h2>
                <div className={cx('about-us-container')}>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.cong} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>Nó chạy ... trên máy của tôi</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Biện Văn Công</h3>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.manh} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>Đi một ngày đàng học một sàng khôn</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguyễn Văn Mạnh</h3>
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
                            <h3>Nguyễn Bá Trang</h3>
                            <p>Leader</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.quyet} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>Học hết sức, chơi hết mình</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguyễn Bắc Quyết</h3>
                            <p>Fontend Developer</p>
                        </div>
                    </div>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.tuyen} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>Thành quả của im lặng là hòa bình</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguyễn Hữu Tuyên</h3>
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
                                <p>Nó chạy ... trên máy của tôi</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Biện Văn Công</h3>
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
                                <p>Đi một ngày đàng học một sàng khôn</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguyễn Văn Mạnh</h3>
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
                                <h3>Nguyễn Bá Trang</h3>
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
                                <p>Học hết sức, chơi hết mình</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguyễn Bắc Quyết</h3>
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
                                <p>Thành quả của im lặng là hòa bình</p>
                            </div>
                            <div className={cx('about-us-infor')}>
                                <h3>Nguyễn Hữu Tuyên</h3>
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
