import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExportIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ExportIcon';
import AcceptIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/AcceptIcon';
import BulkDisputeIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/BulkDisputeIcon';
import Modal from 'react-bootstrap/Modal';

const BulkActionsComponent = ({ activeTab, selectedRows, setSelectedRows, setLoader, setBulkActionShow }) => {
    const dispatch = useDispatch()
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportWeightCard)

    const handleExport = () => {
        setExportButtonClick(true);
        setLoader(true)
        const requestData = {
            "order_tab": {
                "type": activeTab,
                "subtype": ""
            },
            "order_id": `${selectedRows.join(',')}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
        };
        dispatch({ type: "EXPORT_WEIGHT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            setLoader(false)
            setSelectedRows([])
            setBulkActionShow(false)
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    const [remarkPop, setremarkPop] = useState(false)

    const HandleRemarkPop = () => {
        setremarkPop(!remarkPop)
    }

    return (
        <>
            {selectedRows.length > 0 && (
                <section className='bulk-action-container box-shadow'>
                    <div className='ba-inner-container'>
                        <div className='ba-rows-selected'>
                            <span className='fw-bold font20'>{selectedRows.length}</span>
                            <span>Rows Selected</span>
                        </div>
                        <ul className='ba-actions'>
                            {activeTab === "Weight Reconciliation" &&
                                <>
                                    <li onClick={() => HandleRemarkPop()}><AcceptIcon size={24} /><span>Accept All</span></li>
                                    <li onClick={() => HandleRemarkPop()}><BulkDisputeIcon size={24} /><span>Raise Dispute</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li><ExportIcon /><span>Export All</span></li>
                                </>
                            }
                            {activeTab === "Settled Reconciliation" &&
                                <>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li><ExportIcon /><span>Export All</span></li>
                                </>
                            }
                            {activeTab === "On-Hold Reconciliation" &&
                                <>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li><ExportIcon /><span>Export All</span></li>
                                </>
                            }
                        </ul>
                        <div className='ba-close'></div>
                    </div>
                </section>
            )}

            <Modal
                show={remarkPop}
                onHide={HandleRemarkPop}
                keyboard={false}
                className='confirmation-modal remark-popup'
            >
                <Modal.Header>
                    <Modal.Title>Are you sure you want to update all?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        Remarks
                        <textarea className='input-field' type="text" />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={HandleRemarkPop}>
                            No, cancel!
                        </button>
                        <button className="btn main-button" onClick={HandleRemarkPop}>Yes, update All!</button>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default BulkActionsComponent