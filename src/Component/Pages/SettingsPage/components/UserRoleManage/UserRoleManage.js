import axios from 'axios';
import './UserRoleManage.css';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { faEnvelopeOpen, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const UserRoleManage = () => {
    const [empId, setEmpId] = useState("")
    const [show, setShow] = useState(false)
    const [reset, setReset] = useState(null)
    const [errors, setErrors] = useState('')
    const [modules, setModules] = useState([])
    let authToken = Cookies.get("access_token")
    const [editData, setEditData] = useState({})
    const [editShow, setEditShow] = useState(false)
    const [toggleData, setToggleData] = useState({})
    const [updateData, setUpdateData] = useState({})
    const [deleteShow, setDeleteShow] = useState(false)
    const [employeeUser, setEmployeeUser] = useState([])
    const [PwdCopy, setPwdCopy] = useState("Copy Password")
    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
    const [formData, setFormData] = useState({
        employee: {
            name: "",
            seller_id: null,
            mobile: "",
            password: "",
            email: ""
        },
        employee_rights: []
    })
    const handleAddUser = () => {
        setShow(!show);
    };
    const handleEditUser = async (id, value) => {
        setEditShow(!editShow)
        if (value === "edit") {
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/get-employee-detail/?id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (response?.status === 200) {
                    setUpdateData({
                        id: response?.data?.id,
                        name: response?.data?.name,
                        mobile: response?.data?.mobile,
                        password: response?.data?.password,
                        email: response?.data?.email,
                        employee_rights: response?.data?.employee_rights?.map((right) => ({
                            value: right.route_id,
                            label: right.route_name
                        }))
                    })
                }
            } catch (error) {
                customErrorFunction(error);
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            employee: {
                ...formData.employee,
                [name]: value
            },
            employee_rights: {
                ...formData.employee_rights,
                [name]: value
            }
        }))
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleRights = (selectedOptions) => {
        const selectedRights = selectedOptions.map(option => ({
            route_id: option.value
        }));

        setFormData((prev) => ({
            ...prev,
            employee_rights: selectedRights
        }));
    };
    const handleRights1 = (selectedOptions) => {
        const selectedRights = selectedOptions.map(option => ({
            label: option.label,
            value: option.value
        }));

        setUpdateData((prev) => ({
            ...prev,
            employee_rights: selectedRights
        }));
    };
    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`${BASE_URL_CORE}/core-api/seller/create-employee/`, editData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response?.status === 200) {
                setShow(false)
                setReset(new Date())
                toast.success(response?.data?.message);
            }
        } catch (error) {
            customErrorFunction(error);
        }
        setEditShow(false)
    }
    const toggleStatus = async (e, id) => {
        setToggleData({
            id: id,
            status: e.target.checked
        })
        try {
            const response = await axios.put(`${BASE_URL_CORE}/core-api/seller/create-employee/`, {
                id: id,
                status: e.target.checked
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response?.status === 200) {
                setReset(new Date())
                toast.success("Status Updated successfully!");
            }
        } catch (error) {
            customErrorFunction(error);
            setShow(false)
        }
    };
    const validateForm = () => {
        let validationErrors = '';
        let isValid = true;
        if (!formData.employee.name && !formData.employee.code && !formData.employee.email && !formData.employee.password) {
            validationErrors = "All Field is required!";
            isValid = false;
        }
        setErrors(validationErrors)
        return isValid;
    }
    const handleSaveUser = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/create-employee/`, formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response?.status === 200) {
                setShow(false)
                setReset(new Date())
                toast.success("Employee Created successfully!");
                setFormData(
                    {
                        employee: {
                            name: "",
                            seller_id: 1,
                            mobile: "",
                            password: "",
                            email: ""
                        },
                        employee_rights: []
                    }
                )
            }
        } catch (error) {
            setShow(false)
            customErrorFunction(error);
            setFormData(
                {
                    employee: {
                        name: "",
                        seller_id: null,
                        mobile: "",
                        password: "",
                        email: ""
                    },
                    employee_rights: []
                }
            )
        }
    };
    const handleDeleteShow = async (id) => {
        setDeleteShow(!deleteShow)
        setEmpId(id)
    }
    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`${BASE_URL_CORE}/core-api/seller/create-employee/${empId}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response?.status === 200) {
                setReset(new Date())
                setDeleteShow(false)
                toast.success("Employee Deleted successfully!");
            }
        } catch (error) {
            setDeleteShow(false)
            customErrorFunction(error);
        }
    }
    const handleSendEmail = (fullName, email, password) => {
        const subject = `New User Registration: ${fullName}`;
        const body = `Hello,\n\nPlease find the user details below:\n\nUser Name: ${fullName}\nEmail: ${email}\nPassword: ${password}\n\nThank you.`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink
    }
    useEffect(() => {
        if (updateData) {
            setEditData({
                name: updateData?.name,
                id: updateData?.id,
                mobile: updateData?.mobile,
                password: updateData?.password,
                email: updateData?.email,
                employee_rights: updateData.employee_rights?.map((item) => ({
                    route_id: item?.value
                }))
            })
        }
    }, [updateData])
    useEffect(() => {
        if (userData) {
            setFormData((prev) => ({
                ...prev,
                employee: {
                    seller_id: userData?.id
                }
            }))
        }

    }, [userData])
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/create-employee/`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (response.status === 200) {
                    setEmployeeUser(response?.data)
                }

            } catch (error) {
                customErrorFunction(error)
            }
        };
        fetchSellers();
    }, [reset]);
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/get-rights/`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (response.status === 200) {
                    const temp = response?.data?.map((item) => ({
                        label: item.title,
                        value: item.id
                    })
                    )
                    setModules(temp)
                }

            } catch (error) {
                customErrorFunction(error)
            }
        };
        fetchSellers();
    }, []);


    const handlePwdCopy = (password, index) => {
        navigator.clipboard.writeText(password).then(() => {
            setPwdCopy(index);
            setTimeout(() => setPwdCopy(null), 2000); 
        });
    }

    const handleClose = () => {
        setShow(!show);
        setFormData(
            {
                employee: {
                    name: "",
                    seller_id: null,
                    mobile: "",
                    password: "",
                    email: ""
                },
                employee_rights: []
            }
        )
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
                            <th style={{ width: '14%' }}>Employee Name</th>
                            <th style={{ width: '14%' }}>Email</th>
                            <th style={{ width: '10%' }}>Contact</th>
                            <th style={{ width: '10%' }}>Code</th>
                            <th style={{ width: '30%' }}>Module(s)</th>
                            <th style={{ width: '9%' }}>Status</th>
                            <th style={{ width: '12%' }}>Action</th>
                        </tr>
                        <tr className="blank-row"><td></td></tr>
                    </thead>
                    <tbody>
                        {employeeUser.map((account, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <tr className="blank-row"><td></td></tr>}
                                <tr className='table-row box-shadow'>
                                    <td>{account.name}</td>
                                    <td>
                                        <div className='user-pwd-container'>
                                            <span>{account.email}</span>
                                            <span onClick={() => handlePwdCopy(account.password, index)}>{PwdCopy === index ? "Copied" : "Copy Password"}</span>
                                        </div>
                                    </td>
                                    <td>{account.mobile}</td>
                                    <td>{account.code}</td>
                                    <td>
                                        <ul className='user-rights-sections'>
                                            {account?.employee_rights?.map((item) => (
                                                <li>{item?.route_name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <Form.Check
                                            type="switch"
                                            checked={account.status}
                                            onChange={(e) => toggleStatus(e, account?.id)}
                                            label={account?.status ? "Active" : "Inactive"}
                                        />
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center gap-2'>
                                            <button title='Send Mail to New User' className='btn user-based-mail' onClick={() => handleSendEmail(account.fullName, account.email, account.password)}>
                                                <FontAwesomeIcon icon={faEnvelopeOpen} />
                                            </button>
                                            <button title='Edit User' onClick={() => handleEditUser(account?.id, "edit")} className='btn user-based-edit'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button title='Delete User' onClick={() => handleDeleteShow(account?.id)} className='btn user-based-delete'>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Add user */}
            <Modal className='confirmation-modal add-user-pop' show={show} onHide={handleAddUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group'>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                maxLength={70}
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                value={formData?.employee.name}
                                className='form-control input-field'
                                onKeyPress={(e) => {
                                    if (e.key == " " && e.target.value.endsWith(' ')) {
                                        e.preventDefault()
                                    }
                                }}
                            />

                        </div>
                        <div className='form-group mt-3'>
                            <label>Mobile No</label>
                            <input
                                name="mobile"
                                type="text"
                                maxLength={10}
                                placeholder="Enter mobile"
                                onChange={handleInputChange}
                                value={formData?.employee.mobile}
                                className='form-control input-field'
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {errors.name && <div className="custom-error">{errors.name}</div>}
                        </div>
                        <div className='form-group mt-3'>
                            <label>Email ID</label>
                            <input
                                type="email"
                                name="email"
                                maxLength={40}
                                placeholder="Enter email"
                                onChange={handleInputChange}
                                value={formData?.employee.email}
                                onKeyPress={(e) => {
                                    if (e.key == " " && e.target.value.endsWith(' ')) {
                                        e.preventDefault()
                                    }
                                }}
                                className='form-control input-field'
                            />
                            {errors.name && <div className="custom-error">{errors.name}</div>}
                        </div>
                        <div className='form-group mt-3'>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                maxLength={30}
                                autoComplete="new-password"
                                placeholder="Enter Password"
                                onChange={handleInputChange}
                                onKeyPress={(e) => {
                                    if (e.key == " " && e.target.value.endsWith(' ')) {
                                        e.preventDefault()
                                    }
                                }}
                                value={formData?.employee.password}
                                className='form-control input-field'
                            />
                            {errors.name && <div className="custom-error">{errors.name}</div>}
                        </div>
                        <div className='form-group mt-3'>
                            <label>Modules to Access</label>
                            <Select
                                options={modules}
                                onChange={handleRights}
                                isMulti
                                isSearchable
                            />
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className=''>
                        <div>
                            {errors && <div style={{ color: "red" }}>{errors}</div>}
                        </div>
                        <div className='d-flex gap-2 justify-content-end w-100'>
                            <button className="btn cancel-button" onClick={handleClose}>
                                Close
                            </button>
                            <button className="btn main-button" onClick={handleSaveUser}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* Edit User */}
            <Modal className='confirmation-modal add-user-pop' show={editShow} onHide={handleEditUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group'>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                maxLength={70}
                                onChange={handleEditChange}
                                placeholder="Enter full name"
                                value={updateData?.name}
                                className='form-control input-field'
                                onKeyPress={(e) => {
                                    if (e.key == " " && e.target.value.endsWith(' ')) {
                                        e.preventDefault()
                                    }
                                }}
                            />

                        </div>
                        <div className='form-group mt-3'>
                            <label>Mobile No</label>
                            <input
                                name="mobile"
                                type="text"
                                maxLength={10}
                                placeholder="Enter mobile"
                                onChange={handleEditChange}
                                value={updateData?.mobile}
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                className='form-control input-field'
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Email ID</label>
                            <input
                                type="email"
                                name="email"
                                maxLength={40}
                                placeholder="Enter email"
                                value={updateData?.email}
                                onChange={handleEditChange}
                                onKeyPress={(e) => {
                                    if (e.key == " " && e.target.value.endsWith(' ')) {
                                        e.preventDefault()
                                    }
                                }}
                                className='form-control input-field'
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                maxLength={30}
                                autoComplete="new-password"
                                placeholder="Enter Password"
                                onChange={handleEditChange}
                                value={updateData?.password}
                                className='form-control input-field'
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Modules to Access</label>
                            <Select
                                options={modules}
                                onChange={handleRights1}
                                value={updateData?.employee_rights}
                                isMulti
                                isSearchable
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className=''>
                        <div className='d-flex gap-2 justify-content-end w-100'>
                            <button className="btn cancel-button" onClick={() => setEditShow(false)}>
                                Close
                            </button>
                            <button className="btn main-button" onClick={handleUpdateUser}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal className='confirmation-modal add-user-pop' show={deleteShow} onHide={handleDeleteShow}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Confirmation required!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    Are you sure you want to delete the employee!
                </Modal.Body>
                <Modal.Footer>
                    <div className=''>
                        <div className='d-flex gap-2 justify-content-end w-100'>
                            <button className="btn cancel-button" onClick={() => setDeleteShow(false)}>
                                Cancel
                            </button>
                            <button className="btn main-button" onClick={handleDeleteUser}>
                                Yes
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default UserRoleManage;
