import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreFiltersPanel from '../MoreFiltersPanel/MoreFiltersPanel';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import SelectAllDrop from '../SelectAllDrop/SelectAllDrop';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import globalDebouncedClick from '../../../../../debounce';
import NoData from '../../../../common/noData';


const Manifest = ({ manifestOrders, activeTab, setEditOrderSection, setOrderId, setBulkActionShow, selectedRows, setSelectedRows,orderStatus }) => {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [BulkActions, setBulkActions] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const token = Cookies.get("access_token")
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [generateinvoice, setGenerateinvoice] = useState(false);

    const { orderdelete, manifestList, downloadManifest } = useSelector(state => state?.orderSectionReducer)
    const { labelData, invoiceData } = useSelector(state => state?.orderSectionReducer)


    /* useEffect(()=>{
         if(manifestList){
             setTotalItems(manifestList?.length)
         }
     },[manifestList])
 
 
 
 
     useEffect(() => {
         if (activeTab === "Manifest") {
 
             dispatch({ type: "MANIFEST_LIST_API_ACTION" })
         }
     }, [activeTab])
 
     */

    useEffect(() => {
        if (orderdelete) {
            setSelectAll(false)
        }
    }, [orderdelete])

    const handleSelectAll = () => {
        // setSelectAll(!selectAll);
        // if (!selectAll) {
        //     setSelectedRows(orders.map(row => row?.id));
        //     setBulkActionShow(true)
        // } else {
        //     setSelectedRows([]);
        //     setBulkActionShow(false)
        // }
    };

    const handleSelectRow = (orderId) => {
        // const isSelected = selectedRows?.includes(orderId);
        // setBulkActions(true)
        // if (isSelected) {
        //     setSelectedRows(selectedRows.filter(id => id !== orderId));
        // } else {
        //     setSelectedRows([...selectedRows, orderId]);
        // }
        // if (selectedRows.length === orders.length - 1 && isSelected) {
        //     setSelectAll(false);
        // } else {
        //     setSelectAll(false);
        // }
    };
    const handleClick = (data) => {
        if (activeTab === "Manifest") {
            dispatch({
                type: "BULK_ORDER_DOWNLOAD_MANIFEST_ACTION", payload: {
                    manifest_id: data
                }
            })
        }
    };

    const handleClickDownloadLabel = async (data) => {
        let temp = []
        data.map((item) => {
            temp.push(item?.order)
        })
        dispatch({
            type: "BULK_ORDER_GENERATE_LABEL_ACTION",
            payload: {
                order_ids: `${temp.join(",")}`
            }
        });
        setGenaratelabel(true)
    }

    useEffect(() => {
        if (labelData?.message === "Go to MIS -> Download and download the labels.") {
        }
        else{
            if(labelData)
            {
                if (genaratelabel === true) {
                    const blob = new Blob([labelData], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'label.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    setGenaratelabel(false)
                }
            }
        }
    }, [labelData])

    const handleClickDownloadInvoice = async (data) => {
        let temp = []
        data.map((item) => {
            temp.push(item?.order)
        })
        dispatch({
            type: "BULK_ORDER_GENERATE_INVOICE_ACTION", payload: {
                order_ids: `${temp.join(",")}`
            }
        });
        setGenerateinvoice(true)
    }

    useEffect(() => {
        if (invoiceData?.message === "Go to MIS -> Download and download the invoices.") {
        }
        else{
            if (invoiceData) {
                if (generateinvoice === true) {
                    const blob = new Blob([invoiceData], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Invoice.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    setGenerateinvoice(false)
                }
            }
        }
    }, [invoiceData])

    const manifestDownload = (data) => {
        globalDebouncedClick(() => handleClick(data));
    }

    const handleDownloadLabel = async (data) => {
        globalDebouncedClick(() => handleClickDownloadLabel(data));
    };

    const handleDownloadInvoice = async (data) => {
        globalDebouncedClick(() => handleClickDownloadInvoice(data));
    };


    useEffect(() => {
        if (downloadManifest) {
            if (activeTab === "Manifest") {
                const blob = new Blob([downloadManifest], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'manifest.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        }

    }, [downloadManifest])


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container m-table-height'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>
                                    {/* <div className='d-flex gap-1 align-items-center'>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                        <SelectAllDrop />
                                    </div> */}
                                </th>
                                <th style={{ width: '10%' }}>Manifest Id</th>
                                <th style={{ width: '12.5%' }}>Created</th>
                                <th style={{ width: '12%' }}>Created By</th>
                                <th style={{ width: '14%' }}>Courier</th>
                                <th style={{ width: '16%' }}>Number of Order(s)</th>
                                <th style={{ width: '20%' }}>Pickup Reference Number</th>
                                {/* <th style={{ width: '10%' }}>Status</th> */}
                                <th style={{ width: '15%' }}>Download</th>

                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {manifestOrders?.map((row, index) => (
                                <React.Fragment key={row?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            {/* <input
                                                type="checkbox"
                                                checked={selectedRows?.includes(row?.id)}
                                                onChange={() => handleSelectRow(row?.id)}
                                            /> */}
                                        </td>

                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{row?.id}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{moment(row?.created).format("YYYY-MM-DD")}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row?.type}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='order-Status-box mt-1'>{row?.courier}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <td className='align-middle'>
                                                <div className='cell-inside-box'>
                                                    <p>{row?.number_of_order}</p>
                                                </div>
                                            </td>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>{row?.p_ref_no} </p>
                                            </div>
                                        </td>


                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button' onClick={() => manifestDownload(row?.id)}> Download Manifest</button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li onClick={() => handleDownloadLabel(row.manifest_order)}>Download Label</li>
                                                            <li onClick={() => handleDownloadInvoice(row.manifest_order)}>Download Invoice</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {manifestOrders?.length === 0 && <NoData/>}
                </div>
            </div>
        </section>
    );
};

export default Manifest;