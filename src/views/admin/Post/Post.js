import { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { CPagination, CPaginationItem } from '@coreui/react';

import * as adminPostServices from '../../../services/adminPostServices';
import Config from '../../../config';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './Post.module.scss';
const cx = classNames.bind(styles);
function Post() {
    const navigate = useNavigate();
    const status = ['Tất cả', 'Đã phê duyệt', 'Không phê duyệt', 'Chờ phê duyệt'];
    const headers = ['ID', 'THỜI GIAN ĐĂNG', 'NGƯỜI ĐĂNG', 'TIÊU ĐỀ'];
    const [posts, setPost] = useState([]);
    const [state, setState] = useState(status[0]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const fetchApi = async (pIndex) => {
        let s = -1;
        if (state === 'Đã phê duyệt') {
            s = 1;
        } else if (state === 'Không phê duyệt') {
            s = 0;
        } else if (state === 'Chờ phê duyệt') {
            s = 2;
        }
        const result = await adminPostServices.getPosts(searchValue, s, pIndex);
        console.log(result);
        setPost(result.posts);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const handleViewDetail = (post) => {
        const to = {
            pathname: Config.routes.viewDetailPostAdmin,
            search: `?id=${post.id}`,
        };
        navigate(to);
    };
    const handlePaging = (pIndex) => {
        fetchApi(pIndex);
    };
    const renderPages = () => {
        if (totalPages < 2) {
            return;
        }
        let paging = [];
        if (pageIndex > 2) {
            paging.push(
                <CPaginationItem aria-label="Previous" key="0" onClick={() => handlePaging(0)}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>,
            );
        }
        for (let i = pageIndex - 1; i < pageIndex; i++) {
            if (i >= 1) {
                paging.push(
                    <CPaginationItem key={i} onClick={() => handlePaging(i - 1)}>
                        {i}
                    </CPaginationItem>,
                );
            }
        }
        paging.push(
            <CPaginationItem active className={cx('active-page')} key={pageIndex}>
                {pageIndex}
            </CPaginationItem>,
        );
        for (let y = pageIndex + 1; y <= pageIndex + 1; y++) {
            if (y <= totalPages) {
                paging.push(
                    <CPaginationItem key={y} onClick={() => handlePaging(y - 1)}>
                        {y}
                    </CPaginationItem>,
                );
            }
        }
        if (pageIndex < totalPages - 1) {
            paging.push(
                <CPaginationItem aria-label="Next" key="9999" onClick={() => handlePaging(totalPages - 1)}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>,
            );
        }
        return paging;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách bài đăng</h1>

                <div className={cx('post-filter')}>
                    <div className={cx('post-list')}>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            {status.map((state, index) => {
                                return (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('post-search')}>
                        <GlobalSearch
                            title="Tìm kiếm bài đăng"
                            onPending={(value) => {
                                setSearchValue(value);
                            }}
                            onSearch={(value) => handlePaging(value)}
                        />
                    </div>
                </div>

                <table className={cx('post')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => {
                            return (
                                <tr key={post.id} onClick={() => handleViewDetail(post)}>
                                    <td>{post.id}</td>
                                    <td>{post.time}</td>
                                    <td>{post.create_by}</td>
                                    <td>{post.job_title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active className={cx('active-page')}>
                        1
                    </CPaginationItem>
                    <CPaginationItem>2</CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </div>
        </div>
    );
}

export default Post;
