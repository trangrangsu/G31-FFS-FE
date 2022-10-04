import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Button from '../../../components/Button';
import { faPenToSquare, faFileLines, faUserCheck, faMoneyCheckDollar, faUpload } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Post() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p className={cx('greeting-title')}>Đăng Tin Tuyển Dụng</p>
                <div className={cx('form-Post')}>
                    <div className={cx('career-post')}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Việc cần tuyển Freelancer</label>
                            <label className={cx('label-subTitle')}>Chọn lĩnh vực cần tuyển</label>
                            <select className={cx('form-select')} aria-label="Default select example">
                                <option selected><label for="exampleFormControlTextarea1" className={cx('form-label')}>--Tên Lĩnh Vực--</label></option>
                                <optgroup label="IT và lập trình">
                                    <option value="2">Lập trình web</option>
                                    <option value="3">Ứng dụng di động</option>
                                    <option value="8">Việc lập trình khác</option>
                                    <option value="9">Lập trình phần mềm</option>
                                    <option value="10">Tối ưu cho công cụ tìm kiếm - SEO</option>
                                    <option value="11">Tư vấn, thiết kế hệ thống mạng</option>
                                    <option value="40">QA Tester</option>
                                    <option value="42">Quản lý dự án</option>
                                    <option value="71">Lập trình nhúng</option>
                                    <option value="72">AI - Trí tuệ nhân tạo, Machine Learning</option> </optgroup>
                                <optgroup label="Marketing &amp; Bán hàng">
                                    <option value="26">Quảng cáo google adwords – SEM</option>
                                    <option value="27">Cộng tác viên bán hàng</option>
                                    <option value="28">Tư vấn bán hàng &amp; Giới thiệu sản phẩm</option>
                                    <option value="29">Nghiên cứu &amp; khảo sát thị trường</option>
                                    <option value="30">Việc KD và marketing khác</option>
                                    <option value="33">Tổ chức sự kiện</option>
                                    <option value="50">Tư vấn, lập kế hoạch &amp; triển khai marketing online</option>
                                    <option value="51">Quảng cáo facebook</option>
                                    <option value="52">Email marketing</option>
                                    <option value="53">Forum seeding</option>
                                    <option value="83">Tiếp thị liên kết</option> </optgroup>
                                <optgroup label="Lĩnh vực khác">
                                    <option value="38">Chụp ảnh</option>
                                    <option value="39">Tuyển dụng</option> </optgroup>
                                <optgroup label="Thiết kế">
                                    <option value="7">Thiết kế Logo</option>
                                    <option value="13">Thiết kế đồ họa</option>
                                    <option value="14">Thiết kế giao diện Website</option>
                                    <option value="15">Banner quảng cáo</option>
                                    <option value="16">Nhãn hiệu và bao bì</option>
                                    <option value="17">Làm video clip</option>
                                    <option value="18">Ảnh và chỉnh sửa ảnh</option>
                                    <option value="20">Các việc thiết kế khác</option>
                                    <option value="43">Thiết kế bộ nhận diện thương hiệu</option>
                                    <option value="44">Thiết kế flash &amp; HTML5</option>
                                    <option value="45">Thiết kế giao diện ứng dụng di động</option>
                                    <option value="46">Thiết kế brochure</option>
                                    <option value="47">Thiết kế infographic</option> </optgroup>
                                <optgroup label="Kế toán, Thuế &amp; Luật">
                                    <option value="34">Kế toán</option>
                                    <option value="35">Tư vấn luật</option>
                                    <option value="59">Hồ sơ pháp lý</option> </optgroup>
                                <optgroup label="Viết lách &amp; dịch thuật">
                                    <option value="6">Viết báo &amp; tạp chí</option>
                                    <option value="21">Quản lý blog &amp; fanpage</option>
                                    <option value="22">Dịch thuật</option>
                                    <option value="23">Viết sách</option>
                                    <option value="24">Viết bài PR &amp; quảng cáo sáng tạo</option>
                                    <option value="48">Copywriting</option>
                                    <option value="49">Viết bài SEO, nội dung cho website</option>
                                    <option value="61">Biên tập &amp; chỉnh sửa nội dung</option>
                                    <option value="73">Viết     bài review đánh giá sản phẩm</option> </optgroup>
                                <optgroup label="Kiến trúc và xây dựng">
                                    <option value="19">Thiết kế nội thất nhà và chung cư</option>
                                    <option value="64">Thiết kế ngoại thất</option>
                                    <option value="65">Thiết kế xây dựng nhà</option>
                                    <option value="66">Dựng phối cảnh 3D</option> </optgroup>
                                <optgroup label="Video">
                                    <option value="68">Video hoạt hình</option>
                                    <option value="69">TVC giới thiệu sản phẩm, công ty</option>
                                    <option value="70">Video review</option> </optgroup>
                                <optgroup label="Đào tạo &amp; Khoá học">
                                    <option value="76">Ngoại ngữ</option>
                                    <option value="77">Đào tạo kỹ năng mềm</option>
                                    <option value="78">Gia sư</option> </optgroup>
                                <optgroup label="Tư vấn doanh nghiệp &amp; Coaching">
                                    <option value="80">Cải tiến quy trình doanh nghiệp</option>
                                    <option value="81">Tư vấn chiến lược kinh doanh</option>
                                    <option value="82">Coaching</option> </optgroup>
                            </select>
                            <label className={cx('label-subTitle')}>Đặt tên cụ thể cho công việc tuyển dụng</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder='Ví dụ: Thiết kế website quản lí công ty' />
                        </div>
                    </div>
                    <div className={cx('post-detail')}>
                        <FontAwesomeIcon icon={faFileLines} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Thông tin đầy đủ về yêu cầu tuyển dụng</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Ví dụ:Cần thiết kế website có chức năng bán hàng, quản lí kho....'></textarea>
                            <label className={cx('label-attach')}>Tài liệu đính kèm</label>
                            <input type="file" className={cx('attach')} id="myfile" name="myfile"></input>
                            <label className={cx('label-subTitle')}>Kỹ năng yêu cầu Freelancer phải có</label>
                            <input type="text" className={cx('form-control')} id="exampleInputPassword1" placeholder='Ví dụ: Thiết kế website quản lí công ty' />
                            <label className={cx('label-subTitle')}>Hạn cuối đăng kí công việc</label>
                            <input type="date" className={cx('form-control', 'deadline')} id="exampleInputPassword1" placeholder='Ví dụ: Thiết kế website quản lí công ty' />
                        </div>
                    </div>
                    <div className={cx('more-req')}>
                        <FontAwesomeIcon icon={faUserCheck} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Yêu cầu khác với Freelancer </label>
                            <label className={cx('label-subTitle')}>Cần tuyển freelancer làm việc tại</label>
                            <select className={cx('form-select')} aria-label="Default select example">
                                <option selected><label for="exampleFormControlTextarea1" className={cx('form-label')}>--Nơi cần thuê--</label></option>
                                <option value="0">Toàn Quốc</option>
                                <option value="24">Hà Nội</option>
                                <option value="31">TP. Hồ Chí Minh</option>
                                <option value="15">Đà Nẵng</option>
                                <option value="1">An Giang</option>
                                <option value="2">Bà Rịa - Vũng Tàu</option>
                                <option value="5">Bắc Giang</option>
                                <option value="4">Bắc Kạn</option>
                                <option value="3">Bạc Liêu</option>
                                <option value="6">Bắc Ninh</option>
                                <option value="7">Bến Tre</option>
                                <option value="8">Bình Dương</option>
                                <option value="9">Bình Định</option>
                                <option value="10">Bình Phước</option>
                                <option value="11">Bình Thuận</option>
                                <option value="12">Cà Mau</option>
                                <option value="14">Cần Thơ</option>
                                <option value="13">Cao Bằng</option>
                                <option value="16">Đắk Lắk</option>
                                <option value="17">Đắk Nông</option>
                                <option value="20">Điện Biên</option>
                                <option value="18">Đồng Nai</option>
                                <option value="19">Đồng Tháp</option>
                                <option value="21">Gia Lai</option>
                                <option value="22">Hà Giang</option>
                                <option value="23">Hà Nam</option>
                                <option value="25">Hà Tĩnh</option>
                                <option value="26">Hải Dương</option>
                                <option value="27">Hải Phòng</option>
                                <option value="29">Hậu Giang</option>
                                <option value="28">Hòa Bình</option>
                                <option value="30">Hưng Yên</option>
                                <option value="32">Khánh Hòa</option>
                                <option value="33">Kiên Giang</option>
                                <option value="34">Kon Tum</option>
                                <option value="35">Lai Châu</option>
                                <option value="38">Lâm Đồng</option>
                                <option value="37">Lạng Sơn</option>
                                <option value="36">Lào Cai</option>
                                <option value="39">Long An</option>
                                <option value="40">Nam Định</option>
                                <option value="41">Nghệ An</option>
                                <option value="42">Ninh Bình</option>
                                <option value="43">Ninh Thuận</option>
                                <option value="44">Phú Thọ</option>
                                <option value="45">Phú Yên</option>
                                <option value="46">Quảng Bình</option>
                                <option value="47">Quảng Nam</option>
                                <option value="48">Quảng Ngãi</option>
                                <option value="49">Quảng Ninh</option>
                                <option value="50">Quảng Trị</option>
                                <option value="51">Sóc Trăng</option>
                                <option value="52">Sơn La</option>
                                <option value="53">Tây Ninh</option>
                                <option value="54">Thái Bình</option>
                                <option value="55">Thái Nguyên</option>
                                <option value="56">Thanh Hóa</option>
                                <option value="57">Thừa Thiên - Huế</option>
                                <option value="58">Tiền Giang</option>
                                <option value="59">Trà Vinh</option>
                                <option value="60">Tuyên Quang</option>
                                <option value="61">Vĩnh Long</option>
                                <option value="62">Vĩnh Phúc</option>
                                <option value="63">Yên Bái</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('budget-post')}>
                        <FontAwesomeIcon icon={faMoneyCheckDollar} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}> Ngân sách dự kiến cho công việc này</label>
                            <label className={cx('label-subTitle')}>Hình thức trả lương</label>
                            <select className={cx('form-select', 'payment')} aria-label="Default select example">
                                <option selected><label for="exampleFormControlTextarea1" className={cx('form-label')}>--Hình thức thanh toán--</label></option>
                                <option value="1">Thanh toán theo giờ</option>
                                <option value="2">Thanh toán theo dự án</option>
                            </select>
                            <label className={cx('label-subTitle')}> Số tiền tối đa có thể trả cho công việc này là:    </label>
                            <input type="number" className={cx('form-control')} id="exampleInputPassword1" placeholder='VNĐ' />
                        </div>
                    </div>
                    <div className={cx('submit-button')}>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <p>Khi đăng việc, tôi xác nhận đồng ý các <a href="/page/dieu-khoan-su-dung-danh-cho-khach-hang" target="_blank">điều khoản sử dụng</a> của Lanceddy, và không để lộ bất kỳ thông tin liên lạc cá nhân nào trong phần mô tả nội dung công việc.</p>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default Post;
