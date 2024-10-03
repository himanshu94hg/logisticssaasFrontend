import React, { useState } from 'react';
import './UserRoleManage.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEnvelope, faEnvelopeOpen, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const UserRoleManage = () => {
    const [ds, setDs] = useState(null);
    const [copiedText, setCopiedText] = useState('');
    const [AddUser, setAddUser] = useState(false);
    const [User, setUser] = useState([
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            lastLogin: '2024-09-29 10:15 AM',
            modules: 'Module 1, Module 2',
            buyerAccess: true,
            seller: { status: true }
        },
        {
            fullName: 'Jane Doe',
            email: 'jane@example.com',
            lastLogin: '2024-09-28 12:45 PM',
            modules: 'Module 3',
            buyerAccess: false,
            seller: { status: false }
        }
    ]);
    const [newUser, setNewUser] = useState({ fullName: '', email: '', modules: '', buyerAccess: '' });

    const handleAddUser = () => {
        setAddUser(!AddUser);
    };

    const toggleStatus = (index) => {
        setUser(prevAccounts =>
            prevAccounts.map((account, i) =>
                i === index
                    ? { ...account, seller: { ...account.seller, status: !account.seller.status } }
                    : account
            )
        );
    };

    const handleCopy = (text, index) => {
        setDs(index);
        setCopiedText(text);
        setTimeout(() => {
            setCopiedText('');
            setDs(null);
        }, 1500);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveUser = () => {
        setUser([...User, { ...newUser, lastLogin: 'Never', seller: { status: false } }]);
        setNewUser({ fullName: '', email: '', modules: '', buyerAccess: '' });
        setAddUser(false);
    };

    const handleSendEmail = (fullName, email, password) => {
        const subject = `New User Registration: ${fullName}`;
        const body = `Hello,\n\nPlease find the user details below:\n\nUser Name: ${fullName}\nEmail: ${email}\nPassword: ${password}\n\nThank you.`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink
    }

    return (
        <section className='manage-sub-accounts'>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='mt-3 mb-2'>Manage User Roles</h4>
                <button onClick={handleAddUser} className='btn main-button'>Add User</button>
            </div>

            <div className='table-container'>
                <table className="w-100">
                    <thead>
                        <tr className='table-row box-shadow'>
                            <th>User Details</th>
                            <th>Last Login</th>
                            <th>Module(s)</th>
                            <th>Buyer Details Access</th>
                            <th style={{ width: '10%' }}>Status</th>
                            <th>Action</th>
                        </tr>
                        <tr className="blank-row"><td></td></tr>
                    </thead>
                    <tbody>
                        {User.map((account, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <tr className="blank-row"><td></td></tr>}
                                <tr className='table-row box-shadow'>
                                    <td>{account.fullName}</td>
                                    <td>{account.lastLogin}</td>
                                    <td>{account.modules}</td>
                                    <td>{account.buyerAccess ? 'Allowed' : 'Not Allowed'}</td>
                                    <td>
                                        <Form.Check
                                            type="switch"
                                            label={account.seller?.status ? "Active" : "Inactive"}
                                            checked={account.seller?.status}
                                            onChange={() => toggleStatus(index)}
                                        />
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center gap-2'>
                                            <button title='Send Mail to New User' className='btn edit-btn' onClick={() => handleSendEmail(account.fullName, account.email, account.password)}>
                                                <FontAwesomeIcon icon={faEnvelopeOpen} />
                                            </button>
                                            <button title='Edit User' onClick={handleAddUser} className='btn edit-btn'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Adding User */}
            <Modal className='confirmation-modal add-user-pop' show={AddUser} onHide={handleAddUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group'>
                            <label>Full Name</label>
                            <input
                                className='form-control input-field'
                                type="text"
                                placeholder="Enter full name"
                                name="fullName"
                                value={newUser.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Email ID</label>
                            <input
                                className='form-control input-field'
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Modules to Access</label>
                            <select
                                className='form-control select-field'
                                name="modules"
                                value={newUser.modules}
                                onChange={handleInputChange}
                            >
                                <option value="">Select modules</option>
                                <option value="Module 1">Module 1</option>
                                <option value="Module 2">Module 2</option>
                                <option value="Module 3">Module 3</option>
                            </select>
                        </div>
                        <div className='form-group mt-3'>
                            <label>Buyer Detail Access</label>
                            <div>
                                <input
                                    type="radio"
                                    name="buyerAccess"
                                    value="true"
                                    checked={newUser.buyerAccess === 'true'}
                                    onChange={handleInputChange}
                                />
                                <label className='ms-2'>Allowed</label>
                                <br />
                                <input
                                    type="radio"
                                    name="buyerAccess"
                                    value="false"
                                    checked={newUser.buyerAccess === 'false'}
                                    onChange={handleInputChange}
                                />
                                <label className='ms-2'>Not Allowed</label>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2 justify-content-end w-100'>
                        <button className="btn cancel-button" onClick={handleAddUser}>
                            Close
                        </button>
                        <button className="btn main-button" onClick={handleSaveUser}>
                            Save Changes
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

        </section>
    );
}

export default UserRoleManage;
