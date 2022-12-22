import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Select, Menu, Input, Pagination } from 'antd';
import { useSelector } from 'react-redux';

import * as searchPostFreelancerServices from '../../../services/searchPostFreelancerServices';
import * as careerServices from '../../../services/careerServices';
import PostItem from './PostItem';
import TopItem from './TopItem';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import styles from './SearchJob.module.scss';

const cx = classNames.bind(styles);
const { Search } = Input;
const { Option } = Select;

const SearchJob = () => {
    const account = useSelector((state) => state.account);
    const cities = useSelector((state) => state.city);
    const [careers, setCareers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [topPosts, setTopPosts] = useState([]);
    const [area, setArea] = useState('');
    const [keyword, setKeyword] = useState('');
    const [subCareerId, setSubCareerId] = useState(-1);
    const [paymentType, setPaymentType] = useState(-1);
    const [totalResults, setTotalResults] = useState(5);
    const [selectedKeys, setSelectedKeys] = useState(['0']);

    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        setCareers(result);
    };
    const getAllTopJobApi = async () => {
        const result = await searchPostFreelancerServices.getAllTopJob();
        setTopPosts(result);
    };
    const getPostsApi = async (area, keyword, subCareerId, paymentType, pageIndex) => {
        const result = await searchPostFreelancerServices.getPosts(
            account.userId,
            area,
            keyword,
            subCareerId,
            paymentType,
            pageIndex,
        );
        console.log(result);
        setPosts(result.results);
        setTotalResults(result.totalResults);
    };
    useEffect(() => {
        getCareeersApi();
        getAllTopJobApi();
        getPostsApi(area, keyword, -1, paymentType, 0);
    }, []);
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

    const onClickMenu = (e) => {
        if (e.key == selectedKeys) {
            setSelectedKeys(['0']);
            getPostsApi(area, keyword, -1, paymentType, 0);
            setSubCareerId(-1);
        } else {
            setSelectedKeys([e.key]);
            setSubCareerId(e.key);
            getPostsApi(area, keyword, e.key, paymentType, 0);
        }
        console.log(e.key == selectedKeys);
    };
    const onSearch = (value) => {
        getPostsApi(area, value, subCareerId, paymentType, 0);
    };
    const handleChangeArea = (value) => {
        setArea(value);
        getPostsApi(value, keyword, subCareerId, paymentType, 0);
    };
    const handleChangeBudget = (value) => {
        setPaymentType(value);
        getPostsApi(area, keyword, subCareerId, value, 0);
    };
    const onChange = (page, pageSize) => {
        getPostsApi(area, keyword, subCareerId, paymentType, page - 1);
    };
    const handleChangeKeyWord = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setKeyword(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Image src={images.featuredPost} alt="avatar" className={cx('featured-post')} />
                {topPosts.length !== 0 && (
                    <div className={cx('Top-post')}>
                        {topPosts.map((post) => (
                            <TopItem key={post.id} post={post} />
                        ))}
                    </div>
                )}
                <div className={cx('displayFlex')}>
                    <div className={cx('left')}>
                        <div className={cx('left-component')}>
                            <Menu
                                selectedKeys={selectedKeys}
                                onClick={onClickMenu}
                                mode="inline"
                                theme="light"
                                items={renderItemsMenu(careers)}
                            />
                        </div>
                        <div className={cx('left-banner')}>
                            <Image src={images.bannerSearchFreelancer} alt="banner" />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('right-component')}>
                            <div className={cx('combobox-filter')}>
                                <Select
                                    className={cx('select-location')}
                                    defaultValue="Vị trí"
                                    onChange={handleChangeArea}
                                >
                                    <Option value="">Vị trí</Option>
                                    {cities.map((city, index) => (
                                        <Option key={index} value={city}>
                                            {city}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    className={cx('select-budget')}
                                    defaultValue="Ngân sách"
                                    onChange={handleChangeBudget}
                                >
                                    <Option value="-1">Loại Ngân sách</Option>
                                    <Option value="1">Theo giờ</Option>
                                    <Option value="2">Theo dự án</Option>
                                </Select>
                                <div className={cx('search-input')}>
                                    <Search
                                        value={keyword}
                                        placeholder="nhập từ khóa"
                                        onChange={handleChangeKeyWord}
                                        onSearch={onSearch}
                                        enterButton
                                    />
                                </div>
                            </div>
                            <div className={cx('container-post')}>
                                <div className={cx('list-post-title')}>Danh sách bài đăng</div>
                                <div className={cx('post')}>
                                    {posts.map((post, index) => (
                                        <PostItem key={index} post={post} userId={account.userId} />
                                    ))}
                                    {totalResults === 0 && (
                                        <p className={cx('message-result')}>Không có bài đăng phù hợp</p>
                                    )}
                                </div>
                                {totalResults > 10 && (
                                    <Pagination
                                        defaultCurrent="1"
                                        pageSize="10"
                                        total={totalResults}
                                        onChange={onChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchJob;
