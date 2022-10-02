import classNames from 'classnames/bind';
import styles from './Recruiter.module.scss';
const cx = classNames.bind(styles);

const data = [
    {
        id: '1',
        company: 'Viettel',
        career: 'BA',
        companyIntro: 'Thu Thiem - Ha Noi',
        website: 'abc.com',
        phone: '0965749321',
        textNumber: '01224234',
        address: 'Coding so good',
        email: 'abc@gmail.com',
        userServiceId: '3',
        viewDetail: 'view detail',
    },
    {
        id: '2',
        company: 'Viettel',
        career: 'BA',
        companyIntro: 'Thu Thiem - Ha Noi',
        website: 'abc.com',
        phone: '0965749321',
        textNumber: '01224234',
        address: 'Coding so good',
        email: 'abc@gmail.com',
        userServiceId: '3',
        viewDetail: 'view detail',
    },
    {
        id: '3',
        company: 'Viettel',
        career: 'BA',
        companyIntro: 'Thu Thiem - Ha Noi',
        website: 'abc.com',
        phone: '0965749321',
        textNumber: '01224234',
        address: 'Coding so good',
        email: 'abc@gmail.com',
        userServiceId: '3',
        viewDetail: 'view detail',
    },
];

function TableRecruiter() {
    return (
        <>
            <h2>Recruiter List</h2>
            <div className={cx('Frees')}>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Company</th>
                        <th>Career</th>
                        <th>Company Intro</th>
                        <th>Website</th>
                        <th>Phone</th>
                        <th>Text Number</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>User Service Id</th>
                        <th>View Detail</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key} className={cx('Names')}>
                                <td>{val.id}</td>
                                <td>{val.company}</td>
                                <td>{val.career}</td>
                                <td>{val.companyIntro}</td>
                                <td>{val.website}</td>
                                <td>{val.phone}</td>
                                <td>{val.textNumber}</td>
                                <td>{val.address}</td>
                                <td>{val.email}</td>
                                <td>{val.userServiceId}</td>
                                <td>
                                    <a href="abc">{val.viewDetail}</a>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </>
    );
}

export default TableRecruiter;
