import moment from 'moment';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import SidePanel from './SidePanel/SidePanel';
import NoData from '../../../../common/noData';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { FaCheckSquare, FaRegCopy, FaTimes } from 'react-icons/fa';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import customImg from "../../../../../assets/image/integration/Manual.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import { getFileData, uploadImageData } from '../../../../../awsUploadFile';
import magentoImg from "../../../../../assets/image/integration/magento.png"
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';

const WeightRecoTab = ({ weightRecoData, selectedRows, setSelectedRows, setBulkActionShow, setAwbNo, setOrderTracking, partnerList }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [copyText, setcopyText] = useState("Tracking Link")
    const acceptRecord = useSelector(state => state?.weightRecoReducer?.acceptData);
    const disputeRecord = useSelector(state => state?.weightRecoReducer?.disputeData);


    const handleClose = () => setShow(false);
    const handleCloseComment = () => setShowComment(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(weightRecoData?.map(row => row?.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows?.includes(orderId);
        if (isSelected) {
            setSelectedRows(selectedRows?.filter(id => id !== orderId));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
        if (setSelectedRows !== ([])) {
            setBulkActionShow(true)
        }
        if (selectedRows?.length === weightRecoData?.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }

    const handleShow = (row) => {
        setSelectedRow(row);
        setShow(true);
    };

    const handleShowComment = (row) => {
        setSelectedRow(row);
        setShowComment(true);
    };

    const handleAccept = (row) => {
        const rowString = JSON.stringify(row);
        dispatch({ type: "ACCEPT_ACTION", payload: { "ids": rowString } });
        if (acceptRecord.status === true) {
            toast.success("Thank you for accepting.")
        }
    };

    const handleDispute = (row) => {
        const rowString = JSON.stringify(row);
        dispatch({ type: "DISPUTE_ACTION", payload: { "ids": rowString } });
        if (disputeRecord.status === true) {
            toast.success("Thank you for disputing.")
        }
    };

    const handleClickAWB = (orders) => {
        setAwbNo(orders)
        setOrderTracking(true)
    };

    const handleCopy = (awb) => {
        const temp_url = `https://shipease.in/order-tracking/${awb}`
        navigator.clipboard.writeText(temp_url)
            .then(() => {
                setcopyText("Copied")
                setTimeout(() => {
                    setcopyText('Tracking Link');
                }, 2000);
            })
            .catch(err => {
            });
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
                                <th style={{ width: '14%' }}>Order Details</th>
                                <th style={{ width: '10%' }}>Product Details</th>
                                <th style={{ width: '6%' }}>Order Total</th>
                                <th style={{ width: '12%' }}>Shipping Details</th>
                                <th style={{ width: '14%' }}>Entered Weight & Dimensions (CM)</th>
                                <th style={{ width: '14%' }}>Charged Weight & Dimensions (CM)</th>
                                <th style={{ width: '6%' }}>Status </th>
                                <th style={{ width: '6%' }}>Action</th>

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
                                                                            : row?.order?.channel && row?.order?.channel.toLowerCase() === "amazon_direct" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                : row?.order.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                                    : ""}
                                                    &nbsp;
                                                    <Link to={`/orderdetail/${row?.order?.id}`} className='anchor-order'>{row?.order?.customer_order_number}</Link>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <img src={ForwardIcon} className={`${row?.order.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
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
                                            <div className='cell-inside-box'>
                                                <p>₹ {row?.order?.invoice_amount}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.courier_partner && <img src={partnerList[row?.courier_partner]["image"]} alt='Partner' />}
                                                <div>
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(row?.order?.awb_number)}>
                                                        {row?.order?.awb_number}
                                                    </p>
                                                    <p className='text-capitalize'>{row?.courier_partner && partnerList[row?.courier_partner]["title"]}</p>
                                                </div>
                                                <CustomTooltip
                                                    triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(row?.awb_number)}><FaRegCopy /></button>}
                                                    tooltipComponent={copyText}
                                                    addClassName='copytext-tooltip'
                                                />
                                            </div>

                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.e_weight} kg</p>
                                                <p>LBH(cm): {row?.e_length} x {row?.e_breadth} x {row?.e_height}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.c_weight} kg</p>
                                                <p>LBH(cm): {row?.c_length} x {row?.c_breadth} x {row?.c_height}</p>
                                            </div>
                                        </td>

                                        <td className='align-middle'>
                                            {row?.status &&
                                                <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                            }
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                {row?.status === "pending" ? (
                                                    <React.Fragment>
                                                        <button className='btn main-button' title='Accept' onClick={() => handleAccept(row?.id)}>
                                                            <FaCheckSquare />
                                                        </button>
                                                        <button className='btn main-button' title='Dispute' onClick={() => handleDispute(row?.id)} >
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
                                                                    <li className='pt-4' onClick={() => handleShowComment(row?.id)}>Add Comment</li>
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
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedRow={selectedRow} />
                <PreviewComment showComment={showComment} handleCloseComment={handleCloseComment} selectedRow={selectedRow} />

            </div>
        </section>
    );
};

export default WeightRecoTab;


function Preview({ show, handleClose, selectedRow }) {
    const dispatch = useDispatch();
    const historyRecord = useSelector(state => state?.weightRecoReducer?.historyData);
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
                                <td>{moment(row?.created_at).format("DD MMM YYYY")}</td>
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

    const handleRemarkChange = (event) => {
        setRemark(event.target.value);
    };

    const handleImageChange = async (event) => {
        try {
            const file = event.target.files[0];
            const logoFileSize = parseFloat((file.size / (1024 * 1024)).toFixed(2));

            if (logoFileSize > 2) {
                setLogoError("File shouldn't be greater than 2 MB");
            } else {
                await uploadFile(event, "image");
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };

    const uploadFile = async (e, type) => {
        const file = e.target.files[0];
        const logoFileSize = parseFloat((file.size / (1024 * 1024)).toFixed(2));
        if (type === "image") {
            if (logoFileSize > 2) {
                setLogoError("File shouldn't be greater than 2 mb")
            } else {
                try {
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
                    customErrorFunction(error)
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