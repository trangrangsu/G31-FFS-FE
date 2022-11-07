import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Cascader, Select, Input, Button, message, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { faPenToSquare, faFileLines, faUserCheck, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

import * as careerServices from '../../../services/careerServices';
import * as recruiterCreatePostServices from '../../../services/recruiterCreatePostServices';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;
const { TextArea } = Input;

function Post() {
    const cities = useSelector((state) => state.city);
    const account = useSelector((state) => state.account);
    const [careers, setCareers] = useState([{ id: 1, name: 'cntt', subCareers: { data: [{ id: 1, name: 'cntt' }] } }]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [typePayment, setTypePayment] = useState('1');
    const [amount, setAmount] = useState(0);
    const [subCareer, setSubCareer] = useState(1);
    const [attach, setAttach] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillPost, setSkillPost] = useState('');

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setAttach(info.file.name);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        setCareers(result);
    };
    const getSkillApi = async () => {
        const result = await recruiterCreatePostServices.getSkills();
        console.log(result);
        setSkills(result);
    };
    const createPostApi = async (post) => {
        const result = await recruiterCreatePostServices.createPost(post);
        if (result) {
            message.success('Đăng bài thành công');
        } else {
            message.error('Đăng bài thất bại');
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
        setSubCareer(value[1]);
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
    const handleSubmit = () => {
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
                            </div>
                            <label className={cx('label-subTitle')}>Đặt tên cụ thể cho công việc tuyển dụng</label>
                            <Input
                                size="large"
                                value={title}
                                placeholder="Ví dụ: Thiết kế website quản lí công ty"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('post-detail')}>
                        <FontAwesomeIcon icon={faFileLines} className={cx('icon-post')} />
                        <div className={cx('right-post')}>
                            <label className={cx('label-title')}>Thông tin đầy đủ về yêu cầu tuyển dụng</label>
                            <TextArea
                                placeholder="Diễn tả công việc"
                                value={description}
                                autoSize={{
                                    minRows: 6,
                                    maxRows: 10,
                                }}
                                allowClear
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className={cx('upload')}>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>tải tài liệu</Button>
                                </Upload>
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
                        </div>
                    </div>
                    <div className={cx('submit-button')}>
                        <Button type="primary" size="large" onClick={handleSubmit}>
                            Đăng
                        </Button>
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
