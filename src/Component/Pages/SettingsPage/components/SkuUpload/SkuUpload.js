import './SkuUpload.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import sampleFile from "./sku.xlsx"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Modal, Button, } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

const SkuUpload = () => {
    const [file, setFile] = useState(null);
    const [selectAll, setSelectAll] = useState(false)
    const [errors, setErrors] = useState("")
    const [skuData, setSkuData] = useState([]);
    let authToken = Cookies.get("access_token")
    const [refresh, setRefresh] = useState(null);
    const [errorsAll, setErrorsAll] = useState({})
    const [actiontype, setActiontype] = useState("")
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
    const [skuFormData, setSkuFormData] = useState({
        sku: "",
        seller: "",
        product_name: "",
        weight: null,
        length: null,
        width: null,
        height: null,
        brand_name: ""
    })
    const handleImportClose = () => setShowImportModal(false);
    const handleImportShow = () => setShowImportModal(true);

    const handleAddClose = () => {
        setFile(null);
        setShowAddModal(false)
        setSkuFormData({
            sku: "",
            seller: userData?.id,
            product_name: "",
            weight: null,
            length: null,
            width: null,
            height: null,
            brand_name: ""
        })
        setErrorsAll({})
        setErrors('')
    };

    const handleAddShow = async (type, id) => {
        setActiontype(type)
        setShowAddModal(true);
        if (type === "Edit") {
            try {
                const response = await axios.get(
                    `${BASE_URL_CORE}/core-api/features/service/get-sku-detail/${id}/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                if (response.status === 200) {
                    setSkuFormData({
                        sku: response?.data?.sku,
                        id: response?.data?.id,
                        product_name: response?.data?.product_name,
                        weight: response?.data?.weight,
                        length: response?.data?.length,
                        width: response?.data?.width,
                        height: response?.data?.height,
                        brand_name: response?.data?.brand_name
                    })
                }
            } catch (error) {
                customErrorFunction(error);
            }

        }
    }

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows?.length === skuData?.length) {
            setSelectAll(false)
            setSelectedRows([]);
        } else {
            setSelectedRows(skuData?.map(row => row.id));
            setSelectAll(true)
        }
    };

    const handleImport = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(
                `${BASE_URL_CORE}/core-api/features/service/import-sku/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.status === 201) {
                toast.success("Sku imported successfully!")
                setShowImportModal(false);
                setRefresh(new Date())
                setFile(null)
            }
        } catch (error) {
            customErrorFunction(error)
            setShowImportModal(false);
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL_CORE}/core-api/features/service/export-sku/`,
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.status === 200) {
                const blob = new Blob([response?.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'sku.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success("File exported successfully")
            }
        } catch (error) {
            customErrorFunction(error);
        }
    }

    const handleAddSku = async (type) => {
        const newErrors = {}
        if (!skuFormData.product_name) {
            newErrors.product_name = "Product Name is required!"
        }
        if (!skuFormData.sku) {
            newErrors.sku = "Product SKU is required!"
        }
        if (!skuFormData.brand_name) {
            newErrors.brand_name = "Brand Name is required!"
        }
        if (!skuFormData.width) {
            newErrors.width = "Width Name is required!"
        }
        if (!skuFormData.weight) {
            newErrors.weight = "Weight Name is required!"
        }
        if (!skuFormData.length) {
            newErrors.length = "Length is required!"
        }
        if (!skuFormData.height) {
            newErrors.height = "Height Name is required!"
        }
        setErrorsAll(newErrors)

        if (Object.keys(newErrors).length == 0) {
            if (type === "Add") {
                try {
                    const response = await axios.post(
                        `${BASE_URL_CORE}/core-api/features/service/create-sku/`,
                        skuFormData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );
                    if (response.status === 201) {
                        toast.success(response?.data?.message)
                        setShowAddModal(false);
                        setRefresh(new Date())
                    }
                } catch (error) {
                    customErrorFunction(error)
                    setShowAddModal(false);
                }
            }
            else {
                try {
                    const response = await axios.put(
                        `${BASE_URL_CORE}/core-api/features/service/create-sku/`,
                        skuFormData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );
                    if (response.status === 200) {
                        toast.success(response?.data?.message)
                        setShowAddModal(false);
                        setRefresh(new Date())
                    }
                } catch (error) {
                    customErrorFunction(error)
                    setShowAddModal(false);
                }
            }
        } else {
            setErrors("**All Fields are required!")
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setSkuFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = async (id) => {
        try {
            const payload = {
                id: [id],
                seller: userData?.id
            };

            const response = await axios.delete(
                `${BASE_URL_CORE}/core-api/features/service/create-sku/`,
                {
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response?.status === 200) {
                toast.success(response?.data?.message)
                setRefresh(new Date())
                setSelectAll(false)
                setSelectedRows([])
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };

    const handleKeyPress = (e) => {
        const allowedCharacters = /^[0-9\b.]+$/;
        const { value } = e.target;
        if (!allowedCharacters.test(e.key)) {
            e.preventDefault()
        }
        if (value.includes('.')) {
            const decimalPart = value.split('.')[1];
            if (decimalPart && decimalPart.length >= 2 && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }

        }
    }

    useEffect(() => {
        if (showAddModal) {
            setSkuFormData({
                sku: "",
                seller: userData?.id,
                product_name: "",
                weight: null,
                length: null,
                width: null,
                height: null,
                brand_name: ""
            })
        }
    }, [showAddModal])

    useEffect(() => {
        const fetchSku = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL_CORE}/core-api/features/service/import-sku/`,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                if (response.status === 200) {
                    setSkuData(response?.data?.results)
                }
            } catch (error) {
                customErrorFunction(error);
            }
        };
        fetchSku();
    }, [refresh]);

    useEffect(() => {
        if (userData) {
            setSkuFormData(prev => ({
                ...prev,
                seller: userData?.id
            }))
        }
    }, [userData])

    // useEffect(() => {
    //     if (selectedRows.length > 0 && selectedRows.length === skuData?.length) {
    //         setSelectAll(true)
    //     }
    // }, [selectedRows])


    return (
        <section className='sku-upload-page'>
            <header className='d-flex justify-content-between w-100 align-items-center'>
                <h4 className='mb-0'>SKU Upload</h4>
                <div className='d-flex gap-2 align-items-center'>
                    <Button className='btn main-button' onClick={handleExport}>Export</Button>
                    <Button className='btn main-button' onClick={() => handleAddShow("Add")}>Add SKU</Button>
                    <Button className='btn main-button' onClick={handleImportShow}>Import</Button>
                </div>
            </header>
            <div className='mt-3'>
                <div className="position-relative">
                    <div className='table-container'>
                        <table className="w-100">
                            <thead className="sticky-header">
                                <tr className="table-row box-shadow">
                                    <th style={{ width: '1%' }}>
                                        <div className='d-flex gap-1 align-items-center'>
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </div>
                                    </th>
                                    <th>S.no.</th>
                                    <th>SKU</th>
                                    <th>Product Name</th>
                                    <th>Brand Name</th>
                                    <th>Product Weight</th>
                                    <th>Dimensions</th>
                                    <th>Action</th>
                                </tr>
                                <tr className="blank-row"><td colSpan="8"></td></tr>
                            </thead>
                            <tbody>
                                {skuData?.map((row, index) => (
                                    <React.Fragment key={row?.id}>
                                        {index > 0 && <tr className="blank-row"><td colSpan="8"></td></tr>}
                                        <tr className='table-row box-shadow'>
                                            <td className='checkbox-cell'>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows?.includes(row.id)}
                                                    onChange={() => handleSelectRow(row.id)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{row?.sku}</td>
                                            <td>{row?.product_name}</td>
                                            <td>{row?.brand_name}</td>
                                            <td>{row?.weight} kg</td>
                                            <td>LBH(cm): {Math.floor(row?.length)} x {Math.floor(row?.width)} x {Math.floor(row?.width)}</td>
                                            <td>
                                                <div className='d-flex align-items-center gap-3 justify-content-start'>
                                                    <button className='btn p-0 text-sh-primary' onClick={() => handleAddShow("Edit", row?.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button onClick={() => handleDelete(row?.id)} className='btn p-0 text-sh-red'><FontAwesomeIcon icon={faTrashCan} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal className='add-sku-modal' show={showAddModal} onHide={handleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {actiontype} SKU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='d-flex flex-wrap gap-3 w-100'>
                        <div className='d-flex gap-3'>
                            <label>Product SKU
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    name='sku'
                                    maxLength={50}
                                    value={skuFormData.sku}
                                    placeholder="Product SKU"
                                    onChange={(e) => handleChange(e)}
                                    onKeyDown={(e) => {
                                        if (e.key === " " && e.target.value.endsWith(' ')) {
                                            e.preventDefault()
                                        }
                                    }}
                                    className={`input-field ${errorsAll.sku ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>Product Name
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    maxLength={50}
                                    name='product_name'
                                    placeholder="Product Name"
                                    onChange={(e) => handleChange(e)}
                                    value={skuFormData.product_name}
                                    onKeyDown={(e) => {
                                        if (e.key === " " && e.target.value.endsWith(' ')) {
                                            e.preventDefault()
                                        }
                                    }}
                                    className={`input-field ${errorsAll.product_name ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>Brand Name
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    maxLength={50}
                                    name='brand_name'
                                    placeholder="Brand Name"
                                    value={skuFormData.brand_name}
                                    onChange={(e) => handleChange(e)}
                                    onKeyDown={(e) => {
                                        if (e.key === " " && e.target.value.endsWith(' ')) {
                                            e.preventDefault()
                                        }
                                    }}
                                    className={`input-field ${errorsAll.brand_name ? 'input-field-error' : ''}`}
                                />

                            </label>
                        </div>
                        <div className='d-flex gap-3'>
                            <label>Product Weight (In K.g) 0.5 for 500 gm
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    name='weight'
                                    maxLength={50}
                                    value={skuFormData.weight}
                                    placeholder="Product Weight"
                                    onChange={(e) => handleChange(e)}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    className={`input-field ${errorsAll.weight ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>Product Length (In cm)
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    name='length'
                                    maxLength={50}
                                    value={skuFormData.length}
                                    placeholder="Product Length"
                                    onChange={(e) => handleChange(e)}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    className={`input-field ${errorsAll.length ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>Product Breadth (In cm)
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    name='width'
                                    maxLength={50}
                                    value={skuFormData.width}
                                    placeholder="Product Breadth"
                                    onChange={(e) => handleChange(e)}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    className={`input-field ${errorsAll.width ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>Product Height (In cm)
                                <span className='mandatory'> *</span>
                                <input
                                    type="text"
                                    name='height'
                                    maxLength={50}
                                    value={skuFormData.height}
                                    placeholder="Product Height"
                                    onChange={(e) => handleChange(e)}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    className={`input-field ${errorsAll.height ? 'input-field-error' : ''}`}
                                />
                            </label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <p className='fw-bold text-sh-red font12'>{errors}</p>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleAddClose}>
                            Close
                        </button>
                        <button className="btn main-button" onClick={() => handleAddSku(actiontype)}>
                            {actiontype} SKU
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal className='confirmation-modal impurt-sku' show={showImportModal} onHide={handleImportClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Import SKUs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div controlId="formFile">
                            <label className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        Upload File
                                    </div>
                                    <a className='font12 text-sh-primary' href={sampleFile} download={sampleFile}>Download Sample File</a>
                                </div>
                                <input className='form-control input-field sku-details-form-input' type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <p className='fw-bold text-sh-red font12'>{errors}</p>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleImportClose}>
                            Close
                        </button>
                        <button className="btn main-button" onClick={handleImport}>
                            Import SKUs
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default SkuUpload;
