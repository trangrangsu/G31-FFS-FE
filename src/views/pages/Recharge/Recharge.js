import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CFormInput } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Result } from 'antd';

import * as transactionServices from '../../../services/transactionServices';
import Button from '../../../components/Button';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import styles from './Recharge.module.scss';
const cx = classNames.bind(styles);
const Recharge = () => {
    const currentAccount = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const dispatch = useDispatch();
    const [valueRecharge, setValue] = useState('');
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(false);
    const [showBtn, setShowbtn] = useState(false);

    const fetchApi = async (data) => {
        const result = await transactionServices.rechargeMoney(data);
        console.log(result);
        setPaidFor(true);
        dispatch({ type: 'set', accountBalance: accountBalance + parseFloat(valueRecharge) });
    };
    const handlePaymentMethod = () => {
        setShowbtn(true);
    };
    const handleApprove = (orderId) => {
        const data = {
            userId: currentAccount.userId,
            amount: valueRecharge,
            paymentCode: orderId,
        };
        console.log(data);
        fetchApi(data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('row')}>
                        <p>
                            <b>Đơn vị tiền tệ:</b> USD - US Dollar
                        </p>
                    </div>
                    <div className={cx('row')}>
                        <label className={cx('label')}>Nhập số tiền bạn muốn nạp *</label>
                        <CFormInput
                            type="text"
                            value={valueRecharge}
                            spellCheck={false}
                            className={cx('input')}
                            onChange={(e) => {
                                setValue(e.target.value);
                                setShowbtn(false);
                            }}
                        />
                    </div>

                    {!showBtn && (
                        <Button primary className={cx('btn')} onClick={handlePaymentMethod}>
                            Chọn hình thức thanh toán
                        </Button>
                    )}
                    {showBtn && (
                        <PayPalScriptProvider>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                description: 'service',
                                                amount: {
                                                    value: valueRecharge,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={async (data, action) => {
                                    handleApprove(data.orderID);
                                }}
                                onCancel={() => {}}
                                onError={(err) => {
                                    setError(true);
                                    console.log('PayPal Checkout onError', err);
                                }}
                            />
                        </PayPalScriptProvider>
                    )}
                    <div className={cx('row')}>
                        {paidFor && <Result status="success" title={'Nạp thành công ' + valueRecharge + '$'} />}
                        {error && <Result status="error" title={'Nạp thất bại'} />}
                        {/* {paidFor && <p className={cx('mess-approve')}>Nạp thành công</p>}
                        {error && <p className={cx('mess-error')}>Nạp thất bại</p>} */}
                    </div>
                </div>
                <div className={cx('right')}>
                    <Image src={images.paypal} alt="paypal" className={cx('img')} />
                    <ul className={cx('list')}>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Thanh toán nhanh chóng và tiện lợi</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Chuyển tiền hoàn toàn miễn phí</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Tài khoản sẽ được cập nhật trong vòng 1 phút</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Recharge;
