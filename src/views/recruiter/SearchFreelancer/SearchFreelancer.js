import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Input, Radio, Space, Menu, Select, Pagination } from 'antd';

import * as careerServices from '../../../services/careerServices';
import styles from './SearchFreelancer.module.scss';
import Button from '../../../components/Button';
import FreelancerItem from '../FreelancerItem';

const { Option } = Select;
const cx = classNames.bind(styles);
const { Search } = Input;
const SearchFreelancer = () => {
    const person = [{ person1: '30' }];
    const cities = useSelector((state) => state.city);
    const [showFilter, setShowFilter] = useState(false);
    const [valuePrice, setValuePrice] = useState(1);
    const [subCareerId, setSubCareerId] = useState(-1);
    const [city, setCity] = useState('Hà nội');
    const [careers, setCareers] = useState([]);

    const skills = [
        {
            id: 1,
            name: 'Java',
        },
        {
            id: 2,
            name: 'C#',
        },
        {
            id: 3,
            name: 'Python',
        },
        {
            id: 4,
            name: 'English',
        },
        {
            id: 5,
            name: 'China',
        },
        {
            id: 6,
            name: 'Photoshop',
        },
    ];

    const freelancers = [
        {
            id: 1,
            avatar: '',
            userName: 'CongBV',
            subCareer: 'Lập trình viên mobie',
            area: 'Hòa Lạc',
            description: 'tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.',
            costPerHour: '60,000',
            skills: [
                { id: 1, name: 'Python' },
                { id: 2, name: 'C++' },
                { id: 3, name: 'OOP' },
                { id: 4, name: 'UX/UI' },
            ],
            avgStartPoint: 4.5,
            totalFeedBack: 10,
        },
        {
            id: 2,
            avatar: '',
            userName: 'ManhNV',
            subCareer: 'Lập trình viên website',
            area: 'Bắc Giang',
            description: 'tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.',
            costPerHour: '60,000',
            skills: [
                { id: 1, name: 'Python' },
                { id: 2, name: 'C++' },
                { id: 3, name: 'OOP' },
                { id: 4, name: 'UX/UI' },
            ],
            avgStartPoint: 5.0,
            totalFeedBack: 45,
        },
        {
            id: 3,
            avatar: '',
            userName: 'TuyenNH',
            subCareer: 'Designer',
            area: 'Hà Nội',
            description: 'tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.',
            costPerHour: '60,000',
            skills: [
                { id: 1, name: 'Python' },
                { id: 2, name: 'C++' },
                { id: 3, name: 'OOP' },
                { id: 4, name: 'UX/UI' },
            ],
            avgStartPoint: 5.0,
            totalFeedBack: 20,
        },
        {
            id: 4,
            avatar: '',
            userName: 'TrangNB',
            subCareer: 'Thiết kế website font-end',
            area: 'Bắc Ninh',
            skills: [
                { id: 1, name: 'Python' },
                { id: 2, name: 'C++' },
                { id: 3, name: 'OOP' },
                { id: 4, name: 'UX/UI' },
            ],
            avgStartPoint: 4.5,
            totalFeedBack: 30,
        },
    ];
    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        setCareers(result);
    };

    useEffect(() => {
        //getCareeersApi();
        //getPostsApi(area, keyword, -1, paymentType, 0);
    }, []);

    const onSearchFreelancer = (value) => console.log(value);
    const onChangePrice = (e) => {
        setValuePrice(e.target.value);
    };
    const renderItemsMenu = (careers) => {
        return careers.map((career) => {
            const item = {};
            item.key = career.id + career.name;
            item.label = career.name;
            item.children = career.subCareers.data.map((subCareer) => {
                const subItem = {};
                subItem.key = subCareer.id;
                subItem.label = subCareer.name;
                return subItem;
            });
            return item;
        });
    };
    const onSelect = (e) => {
        setSubCareerId(e.key);
        //getPostsApi(area, keyword, e.key, paymentType, 0);
    };
    const onChangeArea = (value) => {
        console.log(`selected ${value}`);
        setCity(value);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>Tìm và tuyển ứng viên</h1>
                    <Button className={cx('btn-post')}>Đăng tuyển</Button>
                </div>
                <div className={cx('search')}>
                    <div className={cx('filter')}>
                        <div className={cx('filter-search')}>
                            <Search
                                placeholder="nhập từ khóa"
                                className={cx('input-keyword')}
                                onSearch={onSearchFreelancer}
                                enterButton
                            />
                            <Button
                                className={cx('button-first')}
                                leftIcon={<FontAwesomeIcon icon={faFilter} className={cx('faFilter')} />}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                Lọc
                            </Button>
                        </div>
                        {showFilter && (
                            <>
                                <div className={cx('choose-item')}>
                                    <div className={cx('date')}>
                                        <h5>Chi phí/Giờ</h5>
                                        <Radio.Group onChange={onChangePrice} value={valuePrice}>
                                            <Space direction="vertical">
                                                <Radio value={1}>Tất cả mức chi phí/giờ</Radio>
                                                <Radio value={2}>Dưới 100k vnd</Radio>
                                                <Radio value={3}>100k - 200k vnd</Radio>
                                                <Radio value={4}>200k - 500k vnd</Radio>
                                                <Radio value={5}>Trên 500k vnd</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                    <div className={cx('career')}>
                                        <div className={cx('career-first')}>
                                            <h5>Lĩnh vực</h5>
                                            <Menu
                                                onSelect={onSelect}
                                                mode="inline"
                                                theme="light"
                                                items={renderItemsMenu(careers)}
                                            />
                                        </div>
                                        <div className={cx('address')}>
                                            <h5>Địa điểm</h5>
                                            <Select
                                                showSearch
                                                placeholder="chọn khu vực"
                                                optionFilterProp="children"
                                                onChange={onChangeArea}
                                                style={{ width: '200px' }}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={cities.map((city) => {
                                                    return { value: city, label: city };
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('skills')}>
                                        <h5>Kỹ năng</h5>
                                        <Select
                                            mode="multiple"
                                            style={{
                                                width: '80%',
                                            }}
                                            placeholder="chọn kỹ năng"
                                            onChange={handleChange}
                                            optionLabelProp="label"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {skills.map((skill) => (
                                                <Option key={skill.id} value={skill.id} label={skill.name}>
                                                    <div>{skill.name}</div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className={cx('button-close')}>
                                    <Button className={cx('btn-closes')} onClick={() => setShowFilter(!showFilter)}>
                                        Đóng
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    {person.map((persons) => {
                        return (
                            <div className={cx('infor-person')}>
                                <p>
                                    Có<b> {persons.person1} </b>
                                    người ứng tuyển phù hợp
                                </p>
                            </div>
                        );
                    })}
                    <div className={cx('infor-freelancer')}>
                        {freelancers.map((freelancer) => (
                            <FreelancerItem key={freelancer.id} freelancer={freelancer} type="view" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFreelancer;
