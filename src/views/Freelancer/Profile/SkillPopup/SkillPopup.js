import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import SearchSkill from '../../../../components/SearchSkill';
import Button from '../../../../components/Button';
import styles from './SkillPopup.module.scss';
const cx = classNames.bind(styles);
function SkillPopup({ userID, callback, onclose }) {
    //const [visible,setVisible] = useState(true)
    const [show, setShow] = useState(true);
    const [skills, setSkills] = useState([]);

    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {
        console.log(userID);
    }, []);
    const handleAdd = () => {
        setShow(false);
        callback(skills);
    };
    const handleAddSkill = (skill) => {
        setSkills((prev) => {
            const index = prev.findIndex((s) => s.id === skill.id);
            if (index > -1) return [...prev];
            else return [...prev, skill];
        });
    };
    const handleDeleteSkill = (skill) => {
        setSkills((prev) => {
            return prev.filter((s) => s.id !== skill.id);
        });
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm kỹ năng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <div className={cx('space')}>
                        {skills.map((skill) => (
                            <div className={cx('skill')} key={skill.id}>
                                <p>{skill.name}</p>
                                <FontAwesomeIcon icon={faCircleMinus} onClick={() => handleDeleteSkill(skill)} />
                            </div>
                        ))}
                    </div>
                    <SearchSkill title="Nhập kỹ năng tại đây" userID={userID} onClick={handleAddSkill} />
                </div>
                <div className={cx('row')}>
                    <Button
                        primary
                        disabled={skills.length === 0 ? true : false}
                        onClick={handleAdd}
                        className={cx('save-btn')}
                    >
                        Thêm mới
                    </Button>
                    <Button primary onClick={handleClose} className={cx('save-btn')}>
                        Hủy
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
SkillPopup.propTypes = {
    userID: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    onclose: PropTypes.func.isRequired,
};
export default SkillPopup;
