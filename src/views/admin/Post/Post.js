import { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { CPagination, CPaginationItem } from '@coreui/react';

import Config from '../../../config';
import Search from '../../../components/Search';
import styles from './Post.module.scss';
const cx = classNames.bind(styles);
function Post() {
    const navigate = useNavigate();
    const status = ['Tất cả', 'Đã phê duyệt', 'Không phê duyệt', 'Chờ phê duyệt'];
    const headers = ['ID', 'THỜI GIAN ĐĂNG', 'NGƯỜI ĐĂNG', 'TIÊU ĐỀ'];
    const posts = [
        {
            id: 1,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 2,
        },
        {
            id: 2,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 2,
        },
        {
            id: 3,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 2,
        },
        {
            id: 4,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 2,
        },
        {
            id: 5,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 1,
        },
        {
            id: 6,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 1,
        },
        {
            id: 7,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 1,
        },
        {
            id: 8,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 0,
        },
        {
            id: 9,
            time: '20-10-2022',
            create_by: 'Công ty A',
            job_title: 'Tuyển kỹ sư Nhật Bản',
            isApproved: 0,
        },
    ];
    const [state, setState] = useState(status[0]);

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
                        <Search title="Tìm kiếm bài đăng" />
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
