import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select, Cascader, Pagination } from 'antd';

import * as careerServices from '../../../services/careerServices';
import * as recruiterCreatePostServices from '../../../services/recruiterCreatePostServices';
import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import FreelancerItem from '../FreelancerItem';
import styles from './PostApplyManagement.module.scss';

const { Search } = Input;
const { Option } = Select;

const cx = classNames.bind(styles);
function FreelancerList({ postId }) {
    const cities = useSelector((state) => state.city);
    const account = useSelector((state) => state.account);
    const [keyWord, setKeyWord] = useState('');
    const [city, setCity] = useState('');
    const [subCareerId, setSubCareerId] = useState(-1);
    const [skill, setSkill] = useState([-1]);
    const [skills, setSkills] = useState([]);
    const [careers, setCareers] = useState([{ id: 1, name: 'cntt', subCareers: { data: [{ id: 1, name: 'cntt' }] } }]);
    const [active, setActive] = useState(2);
    const [totalResults, setTotalResults] = useState(0);

    const [listFreelancer, setListFreelancer] = useState([]);

    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        setCareers(result);
    };
    const getSkillApi = async () => {
        const result = await recruiterCreatePostServices.getSkills();
        setSkills(result);
    };
    const getFreelancerApplied = async (keyWord, pageIndex, status, city, subCareerId, skill) => {
        const result = await recruiterPostManagementServices.getFreelancerApplied(
            keyWord,
            city,
            subCareerId,
            skill,
            pageIndex,
            postId,
            account.userId,
            status,
        );
        if (typeof result === 'object') {
            setListFreelancer(result.results);
            setTotalResults(result.totalResults);
        }
    };

    useEffect(() => {
        getCareeersApi();
        getSkillApi();
        getFreelancerApplied('', 0, active, '', -1, [-1]);
    }, []);
    useEffect(() => {
        getFreelancerApplied('', 0, active, '', -1, [-1]);
        setCity('');
        setKeyWord('');
        setSubCareerId(-1);
        setSkill([-1]);
    }, [active]);

    const onChangeArea = (value) => {
        if (value === undefined) {
            setCity('');
        } else setCity(value);
    };
    const onSearchFreelancer = (value) => {
        getFreelancerApplied(value, 0, active, city, subCareerId, skill);
    };
    const handleChangeKeyWord = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            return;
        }
        if (!value.startsWith(' ')) {
            setKeyWord(value);
        }
    };
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
    const handleChange = (value) => {
        if (value.length === 0) {
            setSkill(-1);
        } else setSkill(value);
    };
    const onChangeCareer = (value) => {
        if (value === undefined) {
            setSubCareerId(-1);
        } else setSubCareerId(value[1]);
    };
    const displayRender = (labels) => labels[labels.length - 1];
    const onChangePage = (page, pageSize) => {
        getFreelancerApplied(keyWord, page - 1, active, city, subCareerId, skill);
    };
    const handleDelete = (freelancerId) => {
        const index = listFreelancer.findIndex((freelancer) => freelancer.id === freelancerId);
        setListFreelancer((pre) => {
            pre.splice(index, 1);
            return [...pre];
        });
    };
    return (
        <>
            <div className={cx('list-freelancer')}>
                <div className={cx('list-head')}>
                    <div className={cx(active === 2 ? 'active' : '')} onClick={() => setActive(2)}>
                        <p>Ứng tuyển</p>
                    </div>
                    <div className={cx(active === 1 ? 'active' : '')} onClick={() => setActive(1)}>
                        <p>Chấp thuận</p>
                    </div>
                    <div className={cx(active === 0 ? 'active' : '')} onClick={() => setActive(0)}>
                        <p>Từ chối</p>
                    </div>
                </div>
                <div className={cx('search-area')}>
                    <div className={cx('row')}>
                        <div className={cx('area')}>
                            <Select
                                showSearch
                                allowClear
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
                                value={keyWord}
                                onChange={handleChangeKeyWord}
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
                    {active === 2 && (
                        <div className={cx('total-number-freelancer')}>
                            <div className={cx('txt1')}>{totalResults} freelancer</div>
                            <div className={cx('txt2')}>sẵn sàng</div>
                        </div>
                    )}
                </div>
                {listFreelancer.map((freelancer) => {
                    return (
                        <FreelancerItem
                            key={freelancer.id}
                            postId={postId}
                            freelancer={freelancer}
                            onDelete={(freelancerId) => handleDelete(freelancerId)}
                            type={active}
                        />
                    );
                })}
                {listFreelancer.length === 0 && <p className={cx('messageResults')}>Không có ứng viên</p>}
            </div>
            {totalResults > 10 && (
                <div className={cx('paging')}>
                    <Pagination defaultCurrent="1" pageSize="10" total={totalResults} onChange={onChangePage} />
                </div>
            )}
        </>
    );
}

export default FreelancerList;
