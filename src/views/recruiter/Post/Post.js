import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { Cascader, Select, Input, Button, message, InputNumber, Popconfirm, Alert, notification } from 'antd';
import { faPenToSquare, faFileLines, faUserCheck, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

import * as firebase from '../../../firebase/firebase';
import * as careerServices from '../../../services/careerServices';
import * as recruiterCreatePostServices from '../../../services/recruiterCreatePostServices';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;
const { TextArea } = Input;
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Thông báo',
        description: 'Tài khoản không còn đủ số dư. Vui lòng nạp thêm tiền',
    });
};
function Post() {
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.city);
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const text = 'Phí đăng bài là ' + account.feePostJob + '$';
    const [careers, setCareers] = useState([{ id: 1, name: 'cntt', subCareers: { data: [{ id: 1, name: 'cntt' }] } }]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [typePayment, setTypePayment] = useState('1');
    const [amount, setAmount] = useState(20000);
    const [subCareer, setSubCareer] = useState(-1);
    const [attach, setAttach] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillPost, setSkillPost] = useState([]);
    const [file, setFile] = useState({});
    const [messageTitle, setMessageTitle] = useState('');
    const [messageSubCareer, setMessageSubCareer] = useState('');
    const [messageDescription, setMessageDescription] = useState('');
    const [messageSkill, setMessageSkill] = useState('');
    const [messageArea, setMessageArea] = useState('');
    const [messageBudget, setMessageBudget] = useState('');

    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        setCareers(result);
    };
    const getSkillApi = async () => {
        const result = await recruiterCreatePostServices.getSkills();
        //console.log(result);
        setSkills(result);
    };
    const createPostApi = async (post) => {
        const result = await recruiterCreatePostServices.createPost(post);
        if (typeof result === 'number') {
            firebase.upLoadFile(account.userId, result, file);
            message.success('Đăng bài thành công');
        } else {
            message.error('Đăng bài thất bại');
        }
        if (!isMemberShip) {
            dispatch({ type: 'set', accountBalance: accountBalance - account.feePostJob });
        }
    };

    useEffect(() => {
        getCareeersApi();
        getSkillApi();
    }, []);

    const renderItemsMenu = (careers) => {
        return careers.map((career) => {
            const item = {};
            item.value = career.id + career.name;
            item.label = career.name;
            item.children = career.subCareers.data.map((subCareer) => {
                const subItem = {};
                subItem.value = subCareer.id;
                subItem.label = subCareer.name;
                return subItem;
            });
            return item;
        });
    };
    const displayRender = (labels) => labels[labels.length - 1];
    const onChangeCareer = (value) => {
        if (value === undefined) {
            setSubCareer(-1);
        } else {
            setSubCareer(value[1]);
        }
    };
    const onChangeArea = (value) => {
        setCity(value);
    };
    const handleChangeTypePayment = (value) => {
        setTypePayment(value);
        if (value === '1') {
            setAmount(20000);
        }
    };
    const checkWallet = () => {
        if (accountBalance - account.feePostJob > 0) {
            handleSubmit();
        } else {
            openNotificationWithIcon('warning');
        }
    };
    const handleSubmit = () => {
        let count = 0;
        if (subCareer === -1) {
            count++;
            setMessageSubCareer('Chuyên ngành chưa được chọn');
        } else {
            setMessageSubCareer('');
        }
        if (title.length < 20) {
            count++;
            setMessageTitle('Tiêu đề dài hơn 20 kí tự');
        } else {
            setMessageTitle('');
        }
        if (description.length < 50) {
            count++;
            setMessageDescription('Mô tả dài hơn 50 kí tự');
        } else {
            setMessageDescription('');
        }
        if (skillPost.length === 0) {
            count++;
            setMessageSkill('Kĩ năng chưa được chọn');
        } else if (skillPost.length > 10) {
            count++;
            setMessageSkill('Chọn tối đa 10 kỹ năng');
        } else {
            setMessageSkill('');
        }
        if (city === '') {
            count++;
            setMessageArea('Khu vực chưa được chọn');
        } else {
            setMessageArea('');
        }
        if (amount < 20000) {
            count++;
            setMessageBudget('Số tiền tối thiểu là 20.000 vnđ');
        } else {
            setMessageBudget('');
        }
        if (count !== 0) return;
        const post = {};
        post.recruiterId = account.userId;
        post.jobTitle = title;
        post.subCareerId = subCareer;
        post.description = description;
        post.attach = attach;
        post.paymentType = typePayment;
        post.budget = amount;
        post.area = city;
        post.skillIds = skillPost;
        createPostApi(post);
        console.log(post);
    };
    const handleChangeTitle = (e) => {
        const value = e.target.value;
        if (value.length > 200) {
            return;
        }
        if (!value.startsWith(' ')) {
            setTitle(value);
        }
    };
    const handleChangeDescription = (e) => {
        const value = e.target.value;
        if (value.length > 1000) {
            return;
        }
        if (!value.startsWith(' ')) {
            setDescription(value);
        }
    };
    const handleChangeSkill = (value) => {
        setSkillPost(value);
    };

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
                            <div>
                                <Cascader
                                    size="large"
                                    placeholder="chọn chuyên ngành"
                                    style={{ width: '400px' }}
                                    options={renderItemsMenu(careers)}
                                    expandTrigger="hover"
                                    displayRender={displayRender}
                                    onChange={onChangeCareer}
                                />
                                {messageSubCareer !== '' && (
                                    <Alert className={cx('messageError')} message={messageSubCareer} type="error" />
                                )}
                            </div>
                            <label className={cx('label-subTitle')}>Đặt tên cụ thể cho công việc tuyển dụng</label>
                            <Input
                                size="large"
                                value={title}
                                placeholder="Ví dụ: Thiết kế website quản lí công ty"
                                onChange={handleChangeTitle}
                            />
                            {messageTitle !== '' && (
                                <Alert className={cx('messageError')} message={messageTitle} type="error" />
                            )}
                        </div>
                    </div>
                    <div className={cx('post-detail')}>
                        <FontAwesomeIcon icon={faFileLines} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Thông tin đầy đủ về yêu cầu tuyển dụng</label>
                            <TextArea
                                placeholder="Mô tả công việc"
                                value={description}
                                autoSize={{
                                    minRows: 6,
                                    maxRows: 10,
                                }}
                                allowClear
                                onChange={handleChangeDescription}
                            />
                            {messageDescription !== '' && (
                                <Alert className={cx('messageError')} message={messageDescription} type="error" />
                            )}
                            <div className={cx('upload')}>
                                <label htmlFor="myfile">Tải tài liệu</label>
                                <input
                                    type="file"
                                    id="myfile"
                                    name="myfile"
                                    onChange={(e) => {
                                        setAttach(e.target.files[0].name);
                                        setFile(e.target.files[0]);
                                    }}
                                ></input>
                            </div>
                            <label className={cx('label-subTitle')}>Kỹ năng yêu cầu Freelancer phải có</label>
                            <div className={cx('input-skill')}>
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '60%',
                                    }}
                                    placeholder="Kĩ năng yêu cầu"
                                    onChange={handleChangeSkill}
                                    optionLabelProp="label"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {skills.map((skill) => {
                                        return (
                                            <Option key={skill.id} value={skill.id} label={skill.name}>
                                                <div className="demo-option-label-item">{skill.name}</div>
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                            {messageSkill !== '' && (
                                <Alert className={cx('messageError')} message={messageSkill} type="error" />
                            )}
                        </div>
                    </div>
                    <div className={cx('more-req')}>
                        <FontAwesomeIcon icon={faUserCheck} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Yêu cầu khác với Freelancer </label>
                            <label className={cx('label-subTitle')}>Cần tuyển freelancer làm việc tại</label>
                            <div>
                                <Select
                                    showSearch
                                    placeholder="chọn khu vực"
                                    optionFilterProp="children"
                                    onChange={onChangeArea}
                                    style={{ width: '400px' }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={cities.map((city) => {
                                        return { value: city, label: city };
                                    })}
                                />
                            </div>
                            {messageArea !== '' && (
                                <Alert className={cx('messageError')} message={messageArea} type="error" />
                            )}
                        </div>
                    </div>
                    <div className={cx('budget-post')}>
                        <FontAwesomeIcon icon={faMoneyCheckDollar} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}> Ngân sách dự kiến cho công việc này</label>
                            <label className={cx('label-subTitle')}>Hình thức trả lương</label>
                            <div>
                                <Select
                                    defaultValue={typePayment}
                                    style={{
                                        width: '400px',
                                    }}
                                    onChange={handleChangeTypePayment}
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Thanh toán theo giờ',
                                        },
                                        {
                                            value: '2',
                                            label: 'Thanh toán theo dự án',
                                        },
                                    ]}
                                />
                            </div>
                            <label className={cx('label-subTitle')}>
                                Số tiền tối đa có thể trả cho công việc này là
                            </label>
                            <div>
                                <InputNumber
                                    style={{
                                        width: '300px',
                                    }}
                                    value={amount}
                                    formatter={(value) => `${value} VND`}
                                    parser={(value) => value.replace(' VND', '')}
                                    onChange={(e) => setAmount(e)}
                                />
                            </div>
                            {messageBudget !== '' && (
                                <Alert className={cx('messageError')} message={messageBudget} type="error" />
                            )}
                        </div>
                    </div>
                    <div className={cx('submit-button')}>
                        {isMemberShip ? (
                            <Button type="primary" size="large" onClick={handleSubmit}>
                                Đăng
                            </Button>
                        ) : (
                            <Popconfirm
                                placement="top"
                                title={text}
                                onConfirm={checkWallet}
                                okText="Đăng"
                                cancelText="Hủy"
                            >
                                <Button type="primary" size="large">
                                    Đăng
                                </Button>
                            </Popconfirm>
                        )}
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
