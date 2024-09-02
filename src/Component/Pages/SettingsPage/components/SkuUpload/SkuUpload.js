import React, { useState } from 'react';
import { Modal, Button, Form, FormFloating } from 'react-bootstrap';
import './SkuUpload.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const SkuUpload = () => {
    const skuData = [
        {
            id: 1,
            sku: 'SKU001',
            productName: 'Product 1',
            brandName: 'Brand A',
            productWeight: '1kg',
            dimensions: '10x10x10 cm',
            status: 'Available',
        },
        {
            id: 2,
            sku: 'SKU002',
            productName: 'Product 2',
            brandName: 'Brand B',
            productWeight: '2kg',
            dimensions: '20x20x20 cm',
            status: 'Out of Stock',
        },
        {
            id: 3,
            sku: 'SKU003',
            productName: 'Product 3',
            brandName: 'Brand C',
            productWeight: '1.5kg',
            dimensions: '15x15x15 cm',
            status: 'Discontinued',
        }
    ];
    let authToken = Cookies.get("access_token")
    const [file, setFile] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === skuData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(skuData.map(row => row.id));
        }
    };

    const [showAddModal, setShowAddModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const handleAddClose = () => { setFile(null); setShowAddModal(false) };
    const handleAddShow = () => { setShowAddModal(true); }

    const handleImportClose = () => setShowImportModal(false);
    const handleImportShow = () => setShowImportModal(true);


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
                setFile(null)
            }
        } catch (error) {
            customErrorFunction(error)
            setShowImportModal(false);
        }
    };



    return (
        <section className='sku-upload-page'>
            <header className='d-flex justify-content-between w-100 align-items-center'>
                <h4 className='mb-0'>SKU Upload</h4>
                <div className='d-flex gap-2 align-items-center'>
                    <Button className='btn main-button' onClick={handleAddShow}>Add SKU</Button>
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
                                                checked={selectedRows.length === skuData.length}
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
                                                    checked={selectedRows.includes(row.id)}
                                                    onChange={() => handleSelectRow(row.id)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{row?.sku}</td>
                                            <td>{row?.productName}</td>
                                            <td>{row?.brandName}</td>
                                            <td>{row?.productWeight}</td>
                                            <td>LBH(cm): {row?.dimensions}</td>
                                            <td>
                                                <div className='d-flex align-items-center gap-3 justify-content-start'>
                                                    <button className='btn p-0 text-sh-primary'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button className='btn p-0 text-sh-red'><FontAwesomeIcon icon={faTrashCan} /></button>
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

            {/* Add SKU Modal */}
            <Modal className='add-sku-modal' show={showAddModal} onHide={handleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add SKU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='d-flex flex-wrap gap-3 w-100'>
                        <div className='d-flex gap-3'>
                            <label>Product SKU
                                <input type="text" className='input-field' placeholder="Product SKU" />
                            </label>
                            <label>Product Name
                                <input type="text" className='input-field' placeholder="Product Name" />
                            </label>
                            <label>Brand Name
                                <input type="text" className='input-field' placeholder="Brand Name" />
                            </label>
                        </div>
                        <div className='d-flex gap-3'>
                            <label>Product Weight (In K.g) 0.5 for 500 gm
                                <input type="text" className='input-field' placeholder="Product Weight" />
                            </label>
                            <label>Product Length (In cm)
                                <input type="text" className='input-field' placeholder="Product Length" />
                            </label>
                            <label>Product Breadth (In cm)
                                <input type="text" className='input-field' placeholder="Product Breadth" />
                            </label>
                            <label>Product Height (In cm)
                                <input type="text" className='input-field' placeholder="Product Height" />
                            </label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleAddClose}>
                            Close
                        </button>
                        <button className="btn main-button" onClick={handleAddClose}>
                            Save SKU
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>


            {/* Import SKU Modal */}
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
                                    <a className='font12 text-sh-primary' href="/sku.xls" download="sku.xls">Download Sample File</a>
                                </div>
                                <input className='form-control input-field' type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
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
