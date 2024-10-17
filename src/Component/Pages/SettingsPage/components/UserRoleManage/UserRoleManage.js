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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { faEnvelopeOpen, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const UserRoleManage = () => {
    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState('')
    const [reset, setReset] = useState(null)
    const [modules, setModules] = useState([])
    let authToken = Cookies.get("access_token")
    const [toggleData, setToggleData] = useState({})
    const [employeeUser, setEmployeeUser] = useState([])
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

    const handleRights = (selectedOptions) => {
        const selectedRights = selectedOptions.map(option => ({
            route_id: option.value
        }));

        setFormData((prev) => ({
            ...prev,
            employee_rights: selectedRights
        }));
    };

    const [actionType, setActionType] = useState("edit")

    const [editShow, setEditShow] = useState(false)
    const [updateData, setUpdateData] = useState({})



    const handleAddUser = (id, value) => {
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
                        email: response?.data?.email
                    })
                }
            } catch (error) {
                customErrorFunction(error);
            }
        }
    }
    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`${BASE_URL_CORE}/core-api/seller/create-employee/`, updateData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response?.status === 200) {
                setShow(false)
                setReset(new Date())
                toast.success("Employee Created successfully!");
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


    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL_CORE}/core-api/seller/create-employee/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response?.status === 200) {
                setReset(new Date())
                toast.success("Employee Deleted successfully!");

            }
        } catch (error) {
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

    console.log(formData, "this is a module data")

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
                            <th style={{ width: '20%' }}>Employee Name</th>
                            <th style={{ width: '20%' }}>Code</th>
                            <th style={{ width: '20%' }}>Module(s)</th>
                            <th style={{ width: '20%' }}>Status</th>
                            <th style={{ width: '20%' }}>Action</th>
                        </tr>
                        <tr className="blank-row"><td></td></tr>
                    </thead>
                    <tbody>
                        {employeeUser.map((account, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <tr className="blank-row"><td></td></tr>}
                                <tr className='table-row box-shadow'>
                                    <td>{account.name}</td>
                                    <td>{account.code}</td>
                                    <td>{account?.employee_rights?.map((item) => (
                                        <p className='fw-bold'>{item?.route_name}</p>
                                    ))}</td>
                                    <td>
                                        <Form.Check
                                            type="switch"
                                            checked={account.status}
                                            // value={account?.status}
                                            onChange={(e) => toggleStatus(e, account?.id)}
                                            label={account.seller?.status ? "Active" : "Inactive"}
                                        />
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center gap-2'>
                                            <button title='Send Mail to New User' className='btn edit-btn' onClick={() => handleSendEmail(account.fullName, account.email, account.password)}>
                                                <FontAwesomeIcon icon={faEnvelopeOpen} />
                                            </button>
                                            <button title='Edit User' onClick={() => handleEditUser(account?.id, "edit")} className='btn edit-btn'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button title='Delete User' onClick={() => handleDeleteUser(account?.id)} className='btn delete-btn'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

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
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                value={formData?.employee.name}
                                className='form-control input-field'
                            />

                        </div>
                        <div className='form-group mt-3'>
                            <label>Mobile No</label>
                            <input
                                name="mobile"
                                type="mobile"
                                placeholder="Enter mobile"
                                onChange={handleInputChange}
                                value={formData?.employee.mobile}
                                className='form-control input-field'
                            />
                            {errors.name && <div className="custom-error">{errors.name}</div>}
                        </div>
                        <div className='form-group mt-3'>
                            <label>Email ID</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={handleInputChange}
                                value={formData?.employee.email}
                                className='form-control input-field'
                            />
                            {errors.name && <div className="custom-error">{errors.name}</div>}
                        </div>
                        <div className='form-group mt-3'>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Enter Password"
                                onChange={handleInputChange}
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
                            <button className="btn cancel-button" onClick={handleAddUser}>
                                Close
                            </button>
                            <button className="btn main-button" onClick={handleSaveUser}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

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
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                value={updateData?.name}
                                className='form-control input-field'
                            />

                        </div>
                        <div className='form-group mt-3'>
                            <label>Mobile No</label>
                            <input
                                name="mobile"
                                type="mobile"
                                placeholder="Enter mobile"
                                onChange={handleInputChange}
                                value={updateData?.mobile}
                                className='form-control input-field'
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Email ID</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={handleInputChange}
                                value={updateData?.email}
                                className='form-control input-field'
                            />
                        </div>
                        <div className='form-group mt-3'>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Enter Password"
                                onChange={handleInputChange}
                                value={updateData?.password}
                                className='form-control input-field'
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

        </section>
    );
}

export default UserRoleManage;
