import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { CFormCheck } from '@coreui/react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { StyledEngineProvider } from '@mui/material/styles';

import images from '../../../assets/images';
import styles from './Update.module.scss';
const cx = classNames.bind(styles);

function Update() {
    const [value, setValue] = useState(dayjs('2022-04-07'));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('greeting')}>
                    <p className={cx('greeting-title')}>Chào mừng bạn đến với lanceddy!</p>
                    <p className={cx('greeting-content')}>
                        Vui lòng tạo hồ sơ để tham gia tìm việc freelance trên lanceddy. Nhà tuyển dụng sẽ nhìn vào hồ
                        sơ để đưa ra quyết định khi bạn ứng cử vào công việc của họ. Vì vậy hãy dành chút thời gian để
                        điền đầy đủ thông tin trong form bên dưới
                    </p>
                </div>
                <div className={cx('profile-content')}>
                    <div className={cx('profile-basic')}>
                        <p className={cx('personal-title')}>GIỚI THIỆU BẢN THÂN</p>
                        <div className={cx('avatar')}>
                            <div className={cx('avatar-container')}>
                                <div className={cx('avatar-img')}>
                                    <img src={images.defaultAvatar} alt="" />
                                </div>
                                <div className={cx('avatar-upload')}>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faUpload} />
                                    </a>
                                </div>
                            </div>
                            <p className={cx('avatar-instruction')}>
                                Vui lòng tải lên hình đại diện thể hiện rõ khuôn mặt của bạn
                            </p>
                        </div>
                        <div className={cx('personal-info')}>
                            <div className={cx('row')}>
                                <div className={cx('full-name')}>
                                    <MDBInput label="Họ và tên *" id="form1" type="text" className={cx('custom')} />
                                </div>
                                <div className={cx('sex-form')}>
                                    <label className={cx('label')}>Giới tính</label>
                                    <div className={cx('content')}>
                                        <CFormCheck
                                            type="radio"
                                            name="sex"
                                            id="man"
                                            label="nam"
                                            className={cx('man')}
                                            defaultChecked
                                        />
                                        <CFormCheck
                                            type="radio"
                                            name="sex"
                                            id="woman"
                                            label="nữ"
                                            className={cx('woman')}
                                        />
                                        <CFormCheck
                                            type="radio"
                                            name="sex"
                                            id="other"
                                            label="khác"
                                            className={cx('other')}
                                        />
                                    </div>
                                    <div className={cx('left-top')}></div>
                                    <div className={cx('right-top')}></div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <StyledEngineProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={1}>
                                            <DesktopDatePicker
                                                className={cx('date-picker')}
                                                label="Ngày sinh"
                                                value={value}
                                                minDate={dayjs('2017-01-01')}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </StyledEngineProvider>
                            </div>
                        </div>
                    </div>
                    <div className={cx('profile-complex')}>
                        <div className={cx('profile-education')}></div>
                        <div className={cx('profile-experience')}></div>
                        <div className={cx('profile-skill')}></div>
                    </div>
                    <div className={cx('submit')}></div>
                </div>
            </div>
        </div>
    );
}

export default Update;
