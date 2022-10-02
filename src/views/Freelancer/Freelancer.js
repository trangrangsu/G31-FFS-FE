import classNames from 'classnames/bind';
import styles from './Freelancer.module.scss';
const cx = classNames.bind(styles);

const data = [
    {
        id: '1',
        fullName: 'Nguyen Van Manh',
        avatar: 'png',
        birthDate: '11/01/2000',
        gender: 'Male',
        phone: '0965749321',
        address: 'Ba Vi - Ha Noi',
        skils: 'Coding so good',
        workExperienceID: '12',
        costPerHour: '10.000đ',
        description: 'Has a 3 years learning in many company big',
        cv: 'CV1',
        viewDetail: 'view detail',
    },
    {
        id: '2',
        fullName: 'Nguyen Van Nam',
        avatar: 'png',
        birthDate: '11/01/2000',
        gender: 'Male',
        phone: '0965749321',
        address: 'Ba Vi - Ha Noi',
        skils: 'Coding so good',
        workExperienceID: '12',
        costPerHour: '10.000đ',
        description: 'Has a 3 years learning in many company big',
        cv: 'CV1',
        viewDetail: 'view detail',
    },
    {
        id: '3',
        fullName: 'Nguyen Van Sang',
        avatar: 'png',
        birthDate: '11/01/2000',
        gender: 'Male',
        phone: '0965749321',
        address: 'Ba Vi - Ha Noi',
        skils: 'Coding so good',
        workExperienceID: '12',
        costPerHour: '10.000đ',
        description: 'Has a 3 years learning in many company big',
        cv: 'CV1',
        viewDetail: 'view detail',
    },
];

function TableFreelancer() {
    return (
        <>
            <h2>Freelancer List</h2>
            <div className={cx('Free')}>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Avatar</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Skills</th>
                        <th>Work Experience ID</th>
                        <th>Cost Per Hour</th>
                        <th>Description</th>
                        <th>CV</th>
                        <th>View Detail</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key} className={cx('Name')}>
                                <td>{val.id}</td>
                                <td>{val.fullName}</td>
                                <td>{val.avatar}</td>
                                <td>{val.birthDate}</td>
                                <td>{val.gender}</td>
                                <td>{val.phone}</td>
                                <td>{val.address}</td>
                                <td>{val.skils}</td>
                                <td>{val.workExperienceID}</td>
                                <td>{val.costPerHour}</td>
                                <td>{val.description}</td>
                                <td>{val.cv}</td>
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

export default TableFreelancer;
