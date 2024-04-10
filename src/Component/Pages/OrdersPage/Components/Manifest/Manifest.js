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


const Manifest = ({ orders, activeTab,setTotalItems, setEditOrderSection, setOrderId, setBulkActionShow, selectedRows, setSelectedRows }) => {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [BulkActions, setBulkActions] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const token = Cookies.get("access_token")

    const { orderdelete, manifestList, downloadManifest } = useSelector(state => state?.orderSectionReducer)


    useEffect(()=>{
        if(manifestList){
            setTotalItems(manifestList?.length)
        }
    },[manifestList])

    console.log(manifestList.length,"manifestList")



    useEffect(() => {
        if (activeTab === "Manifest") {

            dispatch({ type: "MANIFEST_LIST_API_ACTION" })
        }
    }, [activeTab])

    console.log(manifestList, "manifestListmanifestList")

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
        // console.log(BulkActions)
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

    const manifestDownload = (value) => {
        dispatch({
            type: "BULK_ORDER_DOWNLOAD_MANIFEST_ACTION", payload: {
                manifest_id: value
            }
        })
    }

    const handleDownloadLabel = async (data) => {
        let temp = []
        data.map((item) => {
            temp.push(item?.order)
        })
        const requestData = {
            order_ids: `${temp.join(",")}`
        };

        try {
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-label/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });
            if (response.status === 200) {
                toast.success("Download label successfully")
            }
            const data = await response.blob();
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'label.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Somethng went wrong!")
        }
    };


    const handleDownloadInvoice = async (data) => {
        let temp = []
        data.map((item) => {
            temp.push(item?.order)
        })
        const requestData = {
            order_ids: `${temp.join(",")}`
        };
        try {
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-invoice/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.blob();
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Invoice.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Somethng went wrong!")
        }
    };


    useEffect(() => {
        if (downloadManifest) {
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
                                <th style={{ width: '24%' }}>Manifest Id</th>
                                <th style={{ width: '12.5%' }}>Created</th>
                                <th style={{ width: '16%' }}>Created By</th>
                                <th style={{ width: '8%' }}>Courier</th>
                                <th style={{ width: '12.5%' }}>Number of Order</th>
                                <th style={{ width: '10.5%' }}>Pickup Reference Number</th>
                                <th style={{ width: '6%' }}>Download</th>

                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {manifestList?.map((row, index) => (
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
                                                            <li onClick={() => handleDownloadLabel(row.manifest_order)}>Download label</li>
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
                </div>
            </div>
        </section>
    );
};

export default Manifest;