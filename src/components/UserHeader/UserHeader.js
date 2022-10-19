import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faRightFromBracket, faAddressCard, faUnlock } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import Image from '../Image';
import Menu from '../Popper/Menu';
import config from '../../config';
import images from '../../assets/images';
import Button from '../../components/Button';
import styles from './UserHeader.module.scss';
import { Notification, Wallet } from '../Icons/Icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faAddressCard} />,
        title: 'Hồ sơ',
        to: config.routes.freelancerProfile,
        custom: true,
    },
    {
        icon: <FontAwesomeIcon icon={faUnlock} />,
        title: 'Đổi mật khẩu',
        to: config.routes.changePassword,
        custom: true,
    },
    {
        icon: <FontAwesomeIcon icon={faFlag} />,
        title: 'Báo cáo',
        to: config.routes.userReport,
        custom: true,
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Đăng xuất',
        to: config.routes.login,
        separate: true,
        custom: true,
    },
];

function UserHeader() {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const currentUser = true;
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Lanceddy" />
                </Link>

                <div className={cx('middle-side')}>
                    {currentUser ? (
                        <>
                            <Button rounded to={config.routes.searchJob} className={cx('btn', 'middle-btn')}>
                                Tìm việc
                            </Button>
                            <Button rounded to={config.routes.jobApply} className={cx('btn', 'middle-btn')}>
                                Quản lý công việc
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button rounded to={config.routes.postManagement} className={cx('btn', 'middle-btn')}>
                                Quản lý bài đăng
                            </Button>
                            <Button rounded to={config.routes.searchFreelancer} className={cx('btn', 'middle-btn')}>
                                Tìm freelancer
                            </Button>
                            <Button rounded to={config.routes.post} className={cx('btn', 'middle-btn')}>
                                Đăng tuyển dụng
                            </Button>
                        </>
                    )}
                    <Button rounded to={config.routes.statistic} className={cx('btn', 'middle-btn')}>
                        Thông kê
                    </Button>
                    <Button rounded to={config.routes.userService} className={cx('btn', 'middle-btn')}>
                        Dịch vụ
                    </Button>
                </div>
                <div className={cx('right-side')}>
                    <HeadlessTippy
                        interactive
                        trigger="click"
                        offset={[30, 10]}
                        placement="bottom-end"
                        render={(attrs) => <div className={cx('notification-list')} tabIndex="-1" {...attrs}></div>}
                    >
                        <div className={cx('notification')}>
                            <Notification height="25px" width="25px" />
                        </div>
                    </HeadlessTippy>
                    <HeadlessTippy
                        interactive
                        trigger="click"
                        offset={[30, 10]}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className={cx('wallet-popup')} tabIndex="-1" {...attrs}>
                                <div className={cx('wallet-info')}>
                                    <span className={cx('wallet-label')}>Số dư: </span>
                                    <span className={cx('wallet-cash')}>20000 VND</span>
                                </div>
                                <div className={cx('wallet-action')}>
                                    <Button to={config.routes.recharge} text className={cx('wallet-btn')}>
                                        Nạp tiền
                                    </Button>
                                    <Button to={config.routes.rechargeHistory} text className={cx('wallet-btn')}>
                                        Lịch sử nạp tiền
                                    </Button>
                                </div>
                            </div>
                        )}
                    >
                        <div className={cx('wallet')}>
                            <Wallet height="25px" width="25px" />
                        </div>
                    </HeadlessTippy>
                    <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                        <Image className={cx('user-avatar')} src={images.trang} alt="Nguyen Van A" />
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default UserHeader;