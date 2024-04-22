import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleInfo,faFilter } from '@fortawesome/free-solid-svg-icons';
import AmazonLogo from '../../../../../assets/image/logo/AmazonLogo.png'
import moment from 'moment';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import customImg from "../../../../../assets/image/integration/Manual.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import InfoIcon from '../../../../../assets/image/icons/InfoIcon.png'
import { getFileData, uploadImageData } from '../../../../../awsUploadFile';
import SidePanel from './SidePanel/SidePanel';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import {toast} from "react-toastify";
import { FaCheckSquare, FaTimes } from 'react-icons/fa';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import NoData from '../../../../common/noData';

const DateFormatter = ({ dateTimeString }) => {
    const [formattedDate, setFormattedDate] = useState('');



    useEffect(() => {
        const formattedDateTime = formatDateTime(dateTimeString);
        setFormattedDate(formattedDateTime);
    }, [dateTimeString]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const dateObject = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);

        return formattedDateTime;
    };

    return <p>{formattedDate}</p>;
};

const WeightRecoTab = ({weightRecoData,selectedRows,setSelectedRows,setBulkActionShow}) => {

    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);
    const acceptRecord = useSelector(state => state?.weightRecoReducer?.acceptData);
    const disputeRecord = useSelector(state => state?.weightRecoReducer?.disputeData);
    

    //const { weightRecoData } = useSelector(state => state?.weightRecoReducer)
    console.log(acceptRecord, "weightRecoDataweightRecoDataweightRecoData")


    const reasons = [
        { count: "Dabur Hingoli Gas Par Asar Zabardast 90N Tablets Unique B0BKSVZG23", data: "dtdc_surface" },

        { count: "Bru Green Label Ground Coffee, 500g Pouch,Bag B075MN16MZ", data: "dtdc_surface" },

        { count: "UNIQUE FORTUNE KACHI GHANI PURE MUSTARD OIL 1lt  4V-7JZR-OL83", data: "dtdc_surface" },

    ];

    const getRandomCount = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].count;
    };

    const getRandomReason = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].data;
    };




    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(weightRecoData.map(row => row.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        if (setSelectedRows !== ([])) {
            setBulkActionShow(true)
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === data.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }

    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleShow = (row) => {
        setSelectedRow(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const [showComment, setShowComment] = useState(false);

    const handleShowComment = (row) => {
        setSelectedRow(row);
        setShowComment(true);
    };

    const handleCloseComment = () => setShowComment(false);

    const handleAccept = (row) => {
        const rowString = JSON.stringify(row);
        dispatch({ type: "ACCEPT_ACTION", payload: {"ids":rowString} });
        if(acceptRecord.status === true)
        {
            toast.success("Thank you for accepting.")
        }
    };

    const handleDispute = (row) => {
        const rowString = JSON.stringify(row);
        dispatch({ type: "DISPUTE_ACTION", payload: {"ids":rowString} });
        if(disputeRecord.status === true)
        {
            toast.success("Thank you for disputing.")
        }
    };

    const handleComment = (row) => {
        // const rowString = JSON.stringify(row);
        // dispatch({ type: "ACCEPT_ACTION", payload: {"ids":rowString} });
        // if(acceptRecord.status === 200)
        // {
        //     toast.success("Thank you for accepting.")
        // }
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th style={{ width: '12%' }}>Order Details</th>
                                <th style={{ width: '12%' }}>Product Details</th>
                                <th style={{ width: '12%' }}>Order Total</th>
                                <th style={{ width: '12%' }}>Shipping Details</th>
                                <th style={{ width: '12%' }}>Entered Weight & Dimensions (CM)</th>
                                <th style={{ width: '12%' }}>Charged Weight & Dimensions (CM)</th>
                                <th style={{ width: '12%' }}>Status </th>
                                <th style={{ width: '12%' }}>Action</th>
                               
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {weightRecoData?.map((row, index) => (
                                <React.Fragment key={row?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row?.id)}
                                                onChange={() => handleSelectRow(row?.id)}
                                            />
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.order?.channel && row?.order?.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                        : row?.order?.channel && row?.order?.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                            : row?.order?.channel && row?.order?.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                : row?.order?.channel && row?.order?.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                    : row?.order?.channel && row?.order?.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                        : row?.order?.channel && row?.order?.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                            : row?.order?.channel && row?.order?.channel.toLowerCase() === "amazondirect" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                            : row?.order.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                                    : ""}
                                                    &nbsp; <span className=''>{row?.order?.customer_order_number}</span>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <img src={ForwardIcon} className={`${row?.order.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* package details */}
                                            <div className='cell-inside-box'>
                                                {/* <p className='width-eclipse'>{row?.order?.order_products[0]?.product_name}</p> */}
                                                <p>{row?.order?.order_products[0]?.product_name}
                                                    <span className='details-on-hover ms-2 align-middle'>
                                                        <InfoIcon />
                                                        <span style={{ width: '250px' }}>
                                                            {row?.order?.order_products?.map((product, index) => (
                                                                <React.Fragment key={index}>
                                                                    <strong>Product:</strong> {product.product_name}<br />
                                                                    <strong>SKU:</strong> {product.sku}<br />
                                                                    <strong>Qt.:</strong> {product.quantity}<br />
                                                                </React.Fragment>
                                                            ))}
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </td>


                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p>₹ {row?.order?.invoice_amount}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* shiping section here */}
                                            <div className='cell-inside-box'>
                                                <p className='mt-1'>

                                                    {/* <img src={`https://shipease.in/${row?.partner_details?.image}`} height={40} className='me-2' /> */}
                                                    <span className=''>AWB : {row?.order?.awb_number}</span><br/>
                                                    <span className='text-capitalize'>Courier : {row?.order?.courier_partner}</span>
                                                </p>
                                            </div>

                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.e_weight} kg</p>
                                                <p>LBH: {row?.e_length}cm x {row?.e_breadth}cm x {row?.e_height}</p>
                                                {/* <p className=''>Applied Amount : {row?.applied_amount}</p> */}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.c_weight} kg</p>
                                                <p>LBH: {row?.c_length}cm x {row?.c_breadth}cm x {row?.c_height}</p>
                                                {/* <p className=''>Charged Amount : {row?.charged_amount}</p> */}
                                            </div>
                                        </td>
                                        
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row?.status}</p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                {row?.status === "pending" ? (
                                                    <React.Fragment>
                                                        <button className='btn main-button' title='Accept' onClick={() => handleAccept(row.id)}>
                                                            <FaCheckSquare />
                                                        </button>
                                                        <button className='btn main-button' title='Dispute' onClick={() => handleDispute(row.id)} >
                                                            <FaTimes />
                                                        </button>
                                                    </React.Fragment>
                                                ) : (
                                                    <button className='btn main-button' onClick={() => handleShow(row)}>
                                                        View History
                                                    </button>
                                                )}
                                                {row?.status === "accepted" || row?.status === "auto_accepted" && (
                                                    <div className='action-options'>
                                                        <div className='threedots-img'>
                                                            <img src={ThreeDots} alt='ThreeDots' width={24} />
                                                        </div>
                                                        <div className='action-list'>
                                                            <ul>
                                                                {row?.status === "pending" ? (
                                                                    <li className='pt-4' onClick={() => handleShowComment(row.id)}>Add Comment</li>
                                                                ) : (
                                                                    <li >....</li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {weightRecoData?.length === 0 && <NoData />}
                </div>
                <SidePanel CloseSidePanel={CloseSidePanel} />

                {/* <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div> */}
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedRow={selectedRow} />
                <PreviewComment showComment={showComment} handleCloseComment={handleCloseComment} selectedRow={selectedRow} />

            </div>
        </section >
    );
};

export default WeightRecoTab;

function Preview({ show, handleClose, selectedRow }) {
    const dispatch = useDispatch();
    const historyRecord = useSelector(state => state?.weightRecoReducer?.historyData);

    console.log(historyRecord,"All data")
    useEffect(() => {
        if (show && selectedRow) {
            dispatch({ type: "HISTORY_ACTION", payload: selectedRow?.id });
        }
    }, [show, selectedRow, dispatch]);

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>History Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Weight Discrepancy Date</th>
                        <th>Status</th>
                        <th>Charged Weight (KG)</th>
                        <th>Charged Dimension (CM)</th>
                        <th>Action Taken by</th>
                        <th>Applied Weight</th>
                        <th>Remark</th>
                    </tr>
                    {historyRecord?.map((row, index) => (
                        <tr key={index}>
                            <td>{row?.created_at ? <DateFormatter dateTimeString={row?.created_at} /> : ''}</td>
                            <td>{row?.status}</td>
                            <td>{selectedRow?.c_weight}</td>
                            <td>(L * B * H) : {selectedRow?.c_length} * {selectedRow?.c_breadth} * {selectedRow?.c_height} </td>
                            <td>{row?.action_taken_by}</td>
                            <td>{selectedRow?.e_weight}</td>
                            <td>{row?.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </Modal.Body>
        </Modal>
    );
}

function PreviewComment({ showComment, handleCloseComment, selectedRow }) {
    const dispatch = useDispatch();
    const [remark, setRemark] = useState('');
    const [logoError, setLogoError] = useState('');
    const [awsAccessKey, setAwsAccessKey] = useState('');
    const [formData, setFormData] = useState({
        company_logo: ''
    });
    const commentRecord = useSelector(state => state?.weightRecoReducer?.commentData);

    console.log("All Comment Data",commentRecord)

    const handleRemarkChange = (event) => {
        setRemark(event.target.value);
    };

    const handleImageChange = async (event) => {
        try {
            const file = event.target.files[0];
            const logoFileSize = parseFloat((file.size / (1024 * 1024)).toFixed(2));
    
            console.log(logoFileSize, "logoFileSize");
            if (logoFileSize > 2) {
                setLogoError("File shouldn't be greater than 2 MB");
            } else {
                await uploadFile(event, "image");
            }
        } catch (error) {
            console.error('Error handling file change:', error);
        }
    };

    const uploadFile = async (e, type) => {
        const file = e.target.files[0];
        const logoFileSize = parseFloat((file.size / (1024 * 1024)).toFixed(2));
    
        console.log(logoFileSize,"logoFileSize")
        if (type === "image") {
          if (logoFileSize > 2) {
            setLogoError("File shouldn't be greater than 2 mb")
          } else {
            try {
              // Handle file upload logic here
              const responseData = await getFileData(`weightRecoData/${e.target.files[0].name.replace(/\s/g, "")}`);
              const awsUrl = responseData.data.url.url
              const formData = new FormData();
              formData.append('key', responseData.data.url.fields.key);
              formData.append('file', e.target.files[0]);
              formData.append('AWSAccessKeyId', awsAccessKey);
              formData.append('policy', responseData.data.url.fields.policy);
              formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
              const additionalData = await uploadImageData(awsUrl, formData);
              if (additionalData?.status == 204) {
                const imageUrl = responseData?.data?.url?.url + "weightRecoData/" + e.target.files[0]?.name.replace(/\s/g, "")
                setFormData(prev => ({
                  ...prev,
                  company_logo: imageUrl
                }));
              }
              setLogoError('');
            } catch (error) {
              console.error('Error handling file change:', error);
            }
          }
        }
    };

    const handleSubmit = () => {
        dispatch({ 
            type: "COMMENT_ACTION",
            payload: {
                weight_rec_id: selectedRow,
                remark: remark,
                image: formData.company_logo
            }
        });
        setRemark('');
        setFormData({ company_logo: '' });
        toast.success("Comment added successfully!");
        handleCloseComment();
    };

    return (
        <Modal show={showComment} onHide={handleCloseComment} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="remark">
                        <Form.Label>Remark</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={remark} 
                            onChange={handleRemarkChange} 
                            placeholder="Enter your remark here" 
                        />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                        {logoError && <p className="text-danger">{logoError}</p>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={handleCloseComment}>
                    Close
                </Button>
                <Button className="btn main-button" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}