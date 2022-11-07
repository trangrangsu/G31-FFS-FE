import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select, Cascader, Pagination } from 'antd';

import FreelancerItem from '../FreelancerItem';
import Button from '../../../components/Button';

import styles from './PostApplyManagement.module.scss';

const cx = classNames.bind(styles);
const { Search } = Input;
const { Option } = Select;

const numberFreelancerAvaialble = 30;
const listFreelancer = [
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
        description: 'tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.tôi là lập trình viên.',
        costPerHour: '60,000',
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
function PostApplyManagement() {
    const cities = useSelector((state) => state.city);
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
    const [active, setActive] = useState(1);
    const [city, setCity] = useState('');
    const [subCareerId, setSubCareerId] = useState(-1);
    const [careers, setCareers] = useState([{ id: 1, name: 'cntt', subCareers: { data: [{ id: 1, name: 'cntt' }] } }]);

    const onChangeArea = (value) => {
        console.log(`selected ${value}`);
        setCity(value);
    };
    const onSearchFreelancer = (value) => console.log(value);
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
    const onSelect = (e) => {
        setSubCareerId(e.key);
        //getPostsApi(area, keyword, e.key, paymentType, 0);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onChangeCareer = (value) => {
        console.log(value);
    };
    const displayRender = (labels) => labels[labels.length - 1];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('nav-item1')}>Chi tiết bài đăng</div>
                <div className={cx('nav-item2')}>Quản lý ứng viên</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('list-freelancer')}>
                    <div className={cx('list-head')}>
                        <Button className={cx('head-item', active === 1 ? 'active' : '')} onClick={() => setActive(1)}>
                            Ứng tuyển
                        </Button>
                        <Button className={cx('head-item', active === 2 ? 'active' : '')} onClick={() => setActive(2)}>
                            Chấp thuận
                        </Button>
                        <Button className={cx('head-item', active === 3 ? 'active' : '')} onClick={() => setActive(3)}>
                            Từ chối
                        </Button>
                    </div>
                    <div className={cx('search-area')}>
                        <div className={cx('row')}>
                            <div className={cx('area')}>
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
                            <div className={cx('input')}>
                                <Search
                                    placeholder="nhập từ khóa"
                                    className={cx('input-keyword')}
                                    onSearch={onSearchFreelancer}
                                    enterButton
                                />
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('career')}>
                                <Cascader
                                    placeholder="chọn chuyên ngành"
                                    style={{ width: '200px' }}
                                    options={renderItemsMenu(careers)}
                                    expandTrigger="hover"
                                    displayRender={displayRender}
                                    onChange={onChangeCareer}
                                />
                            </div>
                            <div className={cx('skill')}>
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
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

                        <div className={cx('total-number-freelancer')}>
                            <div className={cx('txt1')}>{numberFreelancerAvaialble} freelancer</div>
                            <div className={cx('txt2')}>sẵn sàng</div>
                        </div>
                    </div>
                    {listFreelancer.map((freelancer) => {
                        return (
                            <FreelancerItem
                                key={freelancer.id}
                                freelancer={freelancer}
                                type={active === 1 ? 'apply' : 'view'}
                            />
                        );
                    })}
                </div>
                <div className={cx('paging')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
    );
}

export default PostApplyManagement;
