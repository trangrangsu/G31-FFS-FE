import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Button, Select } from 'antd';

import {
    faPenToSquare,
    faFileLines,
    faUserCheck,
    faMoneyCheckDollar,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const skills = ['Python', 'C++', 'OOP', 'UX/UI'];
function Post() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title-post')}>
                    <p className={cx('greeting-title')}>Đăng Tin Tuyển Dụng</p>
                </div>
                <div className={cx('form-Post')}>
                    <div className={cx('career-post')}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Việc cần tuyển Freelancer</label>
                            <label className={cx('label-subTitle')}>Chọn lĩnh vực cần tuyển</label>
                            <select className={cx('form-select')} aria-label="Default select example">
                                <option selected>
                                    <label className={cx('form-label')}>--Tên Lĩnh Vực--</label>
                                </option>
                                <option value="2">Lập trình web</option>
                                <option value="3">Ứng dụng di động</option>
                                <option value="8">Việc lập trình khác</option>
                            </select>
                            <label className={cx('label-subTitle')}>Đặt tên cụ thể cho công việc tuyển dụng</label>
                            <input
                                type="text"
                                className={cx('form-input')}
                                placeholder="Ví dụ: Thiết kế website quản lí công ty"
                            />
                        </div>
                    </div>
                    <div className={cx('post-detail')}>
                        <FontAwesomeIcon icon={faFileLines} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Thông tin đầy đủ về yêu cầu tuyển dụng</label>
                            <textarea
                                className={cx('form-area')}
                                rows="5"
                                placeholder="Ví dụ:Cần thiết kế website có chức năng bán hàng, quản lí kho...."
                            ></textarea>
                            <label className={cx('label-attach')}>Tài liệu đính kèm</label>
                            <input type="file" className={cx('attach')}></input>
                            <label className={cx('label-subTitle')}>Kỹ năng yêu cầu Freelancer phải có</label>
                            <div className={cx('input-skill')}>
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '60%',
                                    }}
                                    placeholder="Kĩ năng yêu cầu"
                                    onChange={handleChange}
                                    optionLabelProp="label"
                                >
                                    {skills.map((skill) => {
                                        return (
                                            <Option value={skill} label={skill}>
                                                <div className="demo-option-label-item">{skill}</div>
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>

                            <label className={cx('label-subTitle')}>Hạn cuối đăng kí công việc</label>
                            <input
                                type="date"
                                className={cx('form-input', 'deadline')}
                                placeholder="Ví dụ: Thiết kế website quản lí công ty"
                            />
                        </div>
                    </div>
                    <div className={cx('more-req')}>
                        <FontAwesomeIcon icon={faUserCheck} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Yêu cầu khác với Freelancer </label>
                            <label className={cx('label-subTitle')}>Cần tuyển freelancer làm việc tại</label>
                            <select className={cx('form-select')} aria-label="Default select example">
                                <option selected>
                                    <label className={cx('form-label')}>--Nơi cần thuê--</label>
                                </option>
                                <option value="0">Toàn Quốc</option>
                                <option value="24">Hà Nội</option>
                                <option value="31">TP. Hồ Chí Minh</option>
                                <option value="15">Đà Nẵng</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('budget-post')}>
                        <FontAwesomeIcon icon={faMoneyCheckDollar} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}> Ngân sách dự kiến cho công việc này</label>
                            <label className={cx('label-subTitle')}>Hình thức trả lương</label>
                            <select className={cx('form-select', 'payment')} aria-label="Default select example">
                                <option selected>
                                    <label className={cx('form-label')}>--Hình thức thanh toán--</label>
                                </option>
                                <option value="1">Thanh toán theo giờ</option>
                                <option value="2">Thanh toán theo dự án</option>
                            </select>
                            <label className={cx('label-subTitle')}>
                                {' '}
                                Số tiền tối đa có thể trả cho công việc này là:{' '}
                            </label>
                            <input type="number" className={cx('form-input')} placeholder="VNĐ" />
                        </div>
                    </div>
                    <div className={cx('submit-button')}>
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                        <p>
                            Khi đăng việc, tôi xác nhận đồng ý các{' '}
                            <a href="/page/dieu-khoan-su-dung-danh-cho-khach-hang" target="_blank">
                                điều khoản sử dụng
                            </a>{' '}
                            của Lanceddy, và không để lộ bất kỳ thông tin liên lạc cá nhân nào trong phần mô tả nội dung
                            công việc.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
