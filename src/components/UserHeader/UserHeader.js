import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faRightFromBracket, faAddressCard, faUnlock, faStar } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Badge } from 'antd';

import * as notificationServices from '../../services/notificationServices';
import Image from '../Image';
import Menu from '../Popper/Menu';
import config from '../../config';
import images from '../../assets/images';
import Button from '../../components/Button';
import styles from './UserHeader.module.scss';
import { Notification, Wallet } from '../Icons/Icons';
import * as firebase from '../../firebase/firebase';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faAddressCard} />,
        title: 'Hồ sơ',
        to: {
            pathname: config.routes.freelancerProfile,
            search: '',
        },
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
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance).toFixed(1);
    const accountAvatar = useSelector((state) => state.accountAvatar);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const [image, setImage] = useState(images.defaultAvatar);
    const [unReadNotification, setUnReadNotification] = useState(account.unReadNotification);
    const listInnerRef = useRef();
    const [currPage, setCurrPage] = useState(0);
    const [prevPage, setPrevPage] = useState(-1);
    const [notifications, setNotifications] = useState([]);
    const [lastList, setLastList] = useState(false);
    const [close, setClose] = useState(true);

    if (account.role === 'freelancer') {
        console.log(account.role);
        MENU_ITEMS[0].to.search = `?id=${account.userId}`;
    }
    if (account.role === 'recruiter') {
        console.log(account.role);
        MENU_ITEMS[0].to.pathname = config.routes.recruiterProfile;
        MENU_ITEMS[0].to.search = `?id=${account.userId}`;
    }

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };
    useEffect(() => {
        firebase.downloadFile(account.userId, 'avatar', accountAvatar, setImage);
    }, [accountAvatar]);
    const fetchData = async () => {
        const result = await notificationServices.getNotifications(account.userId, currPage);
        console.log(result);
        if (result.pageIndex === result.totalPages) {
            setLastList(true);
        }
        setPrevPage(currPage);
        setNotifications([...notifications, ...result.results]);
    };
    useEffect(() => {
        if (!lastList && prevPage !== currPage && close === false) {
            fetchData();
        }
    }, [currPage, lastList, prevPage, notifications]);
    const handleViewNotification = () => {
        fetchData();
        setUnReadNotification(0);
        setClose(false);
    };
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log('scroll');
                setCurrPage(currPage + 1);
            }
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link
                    to={account.role === 'freelancer' ? config.routes.searchJob : config.routes.postManagement}
                    className={cx('logo-link')}
                >
                    <img src={images.logo} alt="Lanceddy" />
                </Link>

                <div className={cx('middle-side')}>
                    {account.role === 'freelancer' ? (
                        <>
                            <Button rounded to={config.routes.searchJob} className={cx('btn', 'middle-btn')}>
                                Tìm việc
                            </Button>
                            <Button rounded to={config.routes.jobApply} className={cx('btn', 'middle-btn')}>
                                Quản lý công việc
                            </Button>
                            <Button rounded to={config.routes.statisticFreelancer} className={cx('btn', 'middle-btn')}>
                                Thông kê
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
                            <Button rounded to={config.routes.postJob} className={cx('btn', 'middle-btn')}>
                                Đăng tuyển dụng
                            </Button>
                            <Button rounded to={config.routes.statisticRecruiter} className={cx('btn', 'middle-btn')}>
                                Thông kê
                            </Button>
                        </>
                    )}

                    <Button rounded to={config.routes.userService} className={cx('btn', 'middle-btn')}>
                        Dịch vụ
                    </Button>
                </div>
                <div className={cx('right-side')}>
                    <Badge count={unReadNotification}>
                        <HeadlessTippy
                            interactive
                            trigger="click"
                            placement="bottom-start"
                            render={(attrs) => (
                                <div
                                    className={cx('notification-list')}
                                    tabIndex="-1"
                                    {...attrs}
                                    onScroll={onScroll}
                                    ref={listInnerRef}
                                    style={{ maxHeight: '715px', overflowY: 'auto' }}
                                >
                                    <h2>Thông báo</h2>
                                    {notifications.map((notification) => (
                                        <NotificationItem key={notification.postId} item={notification} />
                                    ))}
                                </div>
                            )}
                            onClickOutside={() => {
                                setClose(true);
                                setNotifications([]);
                                setCurrPage(0);
                                setPrevPage(-1);
                                setLastList(false);
                            }}
                        >
                            <div className={cx('notification')} onClick={handleViewNotification}>
                                <Notification height="25px" width="25px" />
                            </div>
                        </HeadlessTippy>
                    </Badge>
                    <HeadlessTippy
                        interactive
                        trigger="click"
                        offset={[30, 10]}
                        placement="bottom-start"
                        render={(attrs) => (
                            <div className={cx('wallet-popup')} tabIndex="-1" {...attrs}>
                                <div className={cx('wallet-info')}>
                                    <span className={cx('wallet-label')}>Số dư: </span>
                                    <span className={cx('wallet-cash')}>{accountBalance} USD</span>
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

                    {isMemberShip ? (
                        <div className={cx('container-avatar')}>
                            <Menu items={MENU_ITEMS} hideOnClick onChange={handleMenuChange}>
                                <Image className={cx('user-avatar')} src={image} alt="Nguyen Van A" />
                            </Menu>
                            <FontAwesomeIcon className={cx('member-icon')} icon={faStar} />
                        </div>
                    ) : (
                        <Menu items={MENU_ITEMS} hideOnClick onChange={handleMenuChange}>
                            <Image className={cx('user-avatar')} src={image} alt="Nguyen Van A" />
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default UserHeader;
