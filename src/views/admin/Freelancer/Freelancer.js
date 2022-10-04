import classNames from 'classnames/bind';
import styles from './Freelancer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

const cx = classNames.bind(styles);

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            freelancer: [
                {
                    id: 1,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Bac Quyet',
                    accountbalance: '20000',
                    isbanned: 'True',
                    action: '',
                },
                {
                    id: 2,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Huu Tuyen',
                    accountbalance: '20000',
                    isbanned: 'False',
                    action: '',
                },
                {
                    id: 3,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Van Manh',
                    accountbalance: '20000',
                    isbanned: 'True',
                    action: '',
                },
                {
                    id: 4,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Van Nam',
                    accountbalance: '20000',
                    isbanned: 'False',
                    action: '',
                },
                {
                    id: 5,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Bien Van Cong',
                    accountbalance: '20000',
                    isbanned: 'False',
                    action: '',
                },
                {
                    id: 6,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Ba Trang',
                    accountbalance: '20000',
                    isbanned: 'False',
                    action: '',
                },
                {
                    id: 7,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Bac Quyet',
                    accountbalance: '20000',
                    isbanned: 'False',
                    action: '',
                },
                {
                    id: 8,
                    email: 'nguyenbacquyet@gmail.com',
                    password: 1234567,
                    fullname: 'Nguyen Bac Quyet',
                    accountbalance: '20000',
                    isbanned: 'False',
                    action: '',
                },
            ],
        };
    }

    renderTableHeader() {
        let header = Object.keys(this.state.freelancer[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>;
        });
    }

    renderTableData() {
        return this.state.freelancer.map((freelancers, index) => {
            const { id, email, password, fullname, accountbalance, isbanned, action } = freelancers; //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{email}</td>
                    <td>{password}</td>
                    <td>{fullname}</td>
                    <td>{accountbalance}</td>
                    <td>{isbanned}</td>
                    <td>
                        {action}
                        <FontAwesomeIcon icon={faCalendarWeek} />
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <h1 className={cx('title')}>Freelancer List</h1>
                <table className={cx('freelancers')}>
                    <thead>{this.renderTableHeader()}</thead>
                    <tbody>{this.renderTableData()}</tbody>
                </table>
            </div>
        );
    }
}

export default Table;
