import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import images from '../../../assets/images';
import styles from './ContentHome.module.scss';
const cx = classNames.bind(styles);
function ContentHome() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('guest-intro')}>
                <div className={cx('guest-left-intro')}>
                    <div className={cx('guest_imgContainer')}>
                        <img src={images.man} alt="" />
                    </div>
                </div>
                <div className={cx('guest-right-intro')}>
                    <div className={cx('guest-wrapper')}>
                        <h2>Xin chào, chúng tôi là</h2>
                        <h1>Lanceddy Team</h1>
                    </div>
                </div>
            </div>
            <div className={cx('distance')}></div>
            <div className={cx('top-job')}>
                <h2 className={cx('top-job-title')}>Công việc được thuê nhiều nhất</h2>
                <div className={cx('top-job-list')}>
                    <div className={cx('top-job-row')}>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Thiết kế website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Dịch thuật</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Lập trình website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Làm video clip</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('top-job-row')}>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Tối ưu hóa công cụ tìm kiếm seo</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Viết nội dung website</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
                            </div>
                            <div className={cx('item-title')}>
                                <p>Thiết kế logo</p>
                            </div>
                        </div>
                        <div className={cx('top-job-item')}>
                            <div className={cx('item-show')}>
                                <img src={images.designWebsiteImg} alt="" />
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
                            <img src={images.designWebsiteImg} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Hàng ngàn hồ sơ ứng viên chất lượng, có chuyên môn</p>
                        </div>
                    </div>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.designWebsiteImg} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Kết nối nhanh chóng</p>
                        </div>
                    </div>
                    <div className={cx('advantages-item')}>
                        <div className={cx('advantages-item-show')}>
                            <img src={images.designWebsiteImg} alt="" />
                        </div>
                        <div className={cx('advantages-item-title')}>
                            <p>Tuyển dụng chính xác freelancer bạn cần</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('distance')}></div>
            <div className={cx('services')}>
                <h2 className={cx('services-title')}>DỊCH VỤ NỔI BẬT LANCEDDY</h2>
                <Button className={cx('btn')}>Xem thêm</Button>
            </div>
            <div className={cx('about-us')}>
                <h2 className={cx('about-us-title')}>Thành viên dự án</h2>
                <div className={cx('about-us-container')}>
                    <div className={cx('about-us-card')}>
                        <div className={cx('about-us-img')}>
                            <img src={images.cong} alt="cong" />
                        </div>
                        <div className={cx('about-us-maxim')}>
                            <p>Phương châm sống</p>
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
                            <p>Phương châm sống</p>
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
                            <p>Phương châm sống</p>
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
                            <p>Phương châm sống</p>
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
                            <p>Phương châm sống</p>
                        </div>
                        <div className={cx('about-us-infor')}>
                            <h3>Nguyễn Hữu Tuyên</h3>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentHome;
