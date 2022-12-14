import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Input, Radio, Space, Select, Pagination, Cascader } from 'antd';

import Image from '../../../components/Image';
import images from '../../../assets/images';
import * as recruiterCreatePostServices from '../../../services/recruiterCreatePostServices';
import * as careerServices from '../../../services/careerServices';
import * as recruiterSearchServices from '../../../services/recruiterSearchServices';
import styles from './SearchFreelancer.module.scss';
import Button from '../../../components/Button';
import FreelancerItem from '../FreelancerItem';

const cx = classNames.bind(styles);
const { Option } = Select;
const { Search } = Input;

const SearchFreelancer = () => {
    const cities = useSelector((state) => state.city);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const [showFilter, setShowFilter] = useState(false);
    const [valuePrice, setValuePrice] = useState(1);
    const [subCareer, setSubCareer] = useState(-1);
    const [subCareerPath, setSubCareerPath] = useState(-1);
    const [freelancers, setFreelancers] = useState([]);
    const [city, setCity] = useState('');
    const [careers, setCareers] = useState([{ id: 1, name: 'cntt', subCareers: { data: [{ id: 1, name: 'cntt' }] } }]);
    const [skill, setSkill] = useState(-1);
    const [skills, setSkills] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [keyWord, setKeyWord] = useState('');

    const getSkillApi = async () => {
        const result = await recruiterCreatePostServices.getSkills();
        setSkills(result);
    };

    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        setCareers(result);
    };
    const searchFreelancerApi = async (keyWord, pageIndex) => {
        const result = await recruiterSearchServices.searchFreelancer(
            keyWord,
            valuePrice,
            city,
            subCareer,
            skill,
            isMemberShip,
            pageIndex,
        );
        setFreelancers(result.results);
        setTotalResults(result.totalResults);
    };

    useEffect(() => {
        getCareeersApi();
        getSkillApi();
        searchFreelancerApi(keyWord, 0);
    }, []);

    const onSearchFreelancer = (value) => {
        searchFreelancerApi(value, 0);
    };
    const onChangePrice = (e) => {
        setValuePrice(e.target.value);
    };
    const renderItemsMenu = (careers) => {
        return careers.map((career) => {
            const item = {};
            item.value = career.name + career.id;
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
            setSubCareerPath(-1);
        } else {
            setSubCareer(value[1]);
            setSubCareerPath(value);
        }
    };
    const onChangeArea = (value) => {
        if (value === undefined) {
            setCity('');
        } else setCity(value);
    };
    const handleChange = (value) => {
        if (value.length === 0) {
            setSkill(-1);
        } else setSkill(value);
    };
    const onChangePage = (page, pageSize) => {
        searchFreelancerApi(keyWord, page - 1);
    };
    const handleChangeKeyWord = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setKeyWord(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <Image src={images.findFreelancer} alt="avatar" className={cx('page-title')} />
                </div>
                <div className={cx('search')}>
                    <div className={cx('filter')}>
                        <div className={cx('filter-search')}>
                            <Search
                                value={keyWord}
                                onChange={handleChangeKeyWord}
                                placeholder="nh???p t??? kh??a"
                                className={cx('input-keyword')}
                                onSearch={onSearchFreelancer}
                                enterButton
                            />
                            <Button
                                className={cx('button-first')}
                                leftIcon={<FontAwesomeIcon icon={faFilter} className={cx('faFilter')} />}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                L???c
                            </Button>
                        </div>
                        {showFilter && (
                            <>
                                <div className={cx('choose-item')}>
                                    <div className={cx('date')}>
                                        <h5>Chi ph??/Gi???</h5>
                                        <Radio.Group
                                            onChange={onChangePrice}
                                            value={valuePrice}
                                            defaultValue={valuePrice}
                                        >
                                            <Space direction="vertical">
                                                <Radio value={1}>T???t c??? m???c chi ph??/gi???</Radio>
                                                <Radio value={2}>D?????i 100k vnd</Radio>
                                                <Radio value={3}>100k - 200k vnd</Radio>
                                                <Radio value={4}>200k - 500k vnd</Radio>
                                                <Radio value={5}>Tr??n 500k vnd</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                    <div className={cx('career')}>
                                        <div className={cx('career-first')}>
                                            <h5>L??nh v???c</h5>
                                            <div>
                                                <Cascader
                                                    placeholder="ch???n chuy??n ng??nh"
                                                    style={{ width: '200px' }}
                                                    options={renderItemsMenu(careers)}
                                                    defaultValue={subCareerPath !== -1 && subCareerPath}
                                                    expandTrigger="hover"
                                                    displayRender={displayRender}
                                                    onChange={onChangeCareer}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('address')}>
                                            <h5>?????a ??i???m</h5>
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="ch???n khu v???c"
                                                optionFilterProp="children"
                                                onChange={onChangeArea}
                                                defaultValue={city}
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
                                        <h5>K??? n??ng</h5>
                                        <Select
                                            mode="multiple"
                                            style={{
                                                width: '80%',
                                            }}
                                            defaultValue={skill !== -1 ? skill : undefined}
                                            placeholder="ch???n k??? n??ng"
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
                                        ????ng
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={cx('infor-freelancer')}>
                        {freelancers.map((freelancer, index) => (
                            <FreelancerItem key={index} freelancer={freelancer} type="view" />
                        ))}
                    </div>
                    {totalResults === 0 && <p className={cx('messageResults')}>Kh??ng c?? freelancer ph?? h???p y??u c???u</p>}
                    {totalResults > 10 && (
                        <div className={cx('paging')}>
                            <Pagination defaultCurrent="1" pageSize="10" total={totalResults} onChange={onChangePage} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFreelancer;
