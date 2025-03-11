import axios from 'axios';
import moment from 'moment';
import Cookies from "js-cookie"
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { awsAccessKey } from '../../../../../config';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getFileData, uploadImageData } from '../../../../../awsUploadFile';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';


const ViewDisputeHistory = ({ DisputeEscalate, selectedRow, setDisputeEscalate, RaiseBulk, setRaiseBulk, selectedRows }) => {
    const dispatch = useDispatch();
    const [reset, setReset] = useState(null)
    let authToken = Cookies.get("access_token")
    const [remarkText, setRemarkText] = useState("");
    const [AddRemarks, setAddRemarks] = useState(false)
    const [imageInputs, setImageInputs] = useState([{ id: Date.now(), file: null }]);
    const [formData, setFormData] = useState({
        ids: "",
        remark: "",
        images: "",
        bulk_action: RaiseBulk,
    })
    useEffect(() => {
        console.log(formData, 'formData')
        // console.log(selectedRows.join(','), 'selectedRows')
        if (!DisputeEscalate) {
            setRaiseBulk(false)
        }
    }, [RaiseBulk])

    const historyRecord = useSelector(state => state?.weightRecoReducer?.historyData);

    useEffect(() => {
        const files = imageInputs.map(item => item.imageUrl)?.join(',');
        setFormData((prev) => ({
            ...prev,
            images: files
        }))

    }, [imageInputs])

    useEffect(() => {
        if (!RaiseBulk) {
            if (DisputeEscalate && selectedRow) {
                dispatch({ type: "HISTORY_ACTION", payload: selectedRow?.id });
            }
        }
        else {
            setAddRemarks(true)
        }
    }, [DisputeEscalate, selectedRow, dispatch, reset]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            images: '',
            remark: '',
            bulk_action: RaiseBulk,
        }))
    }, [DisputeEscalate])

    useEffect(() => {
        if (RaiseBulk) {
            const test = `${selectedRows.join(', ')}`
            setFormData((prev) => ({
                ...prev,
                ids: test,
            }))
        }
        else {
            if (selectedRow?.id) {
                setFormData((prev) => ({
                    ...prev,
                    ids: `${selectedRow?.id}`
                }))
            }
        }
    }, [selectedRow, selectedRows, RaiseBulk])

    const handleAddRemarks = (type) => {
        if (type === "cancel") {
            if (!RaiseBulk) {
                setAddRemarks(!AddRemarks)
            }
        }
        if (type === "add") {
            setAddRemarks(!AddRemarks)
        }
        else {
            setDisputeEscalate(false)
            setRemarkText("");
            setImageInputs([{ id: Date.now(), file: null }]);
        }
    }

    const handleAddImageInput = () => {
        setImageInputs([...imageInputs, { id: Date.now(), file: null }]);
    };

    const handleRemoveImageInput = (id) => {
        setImageInputs(imageInputs.filter((input) => input.id !== id));
    };

    const handleImageChange = async (e, id) => {
        const file = e.target.files[0];
        setImageInputs((prevInputs) =>
            prevInputs.map((input) => (input.id === id ? { ...input, file } : input))
        );
        try {
            const responseData = await getFileData(`customerData/${e.target.files[0].name.replace(/\s/g, "")}`);
            const awsUrl = responseData.data.url.url
            const formData = new FormData();
            formData.append('key', responseData.data.url.fields.key);
            formData.append('file', e.target.files[0]);
            formData.append('AWSAccessKeyId', awsAccessKey);
            formData.append('policy', responseData.data.url.fields.policy);
            formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
            const additionalData = await uploadImageData(awsUrl, formData);
            if (additionalData?.status == 204) {
                const imageUrl = responseData?.data?.url?.url + "weightdispute/" + e.target.files[0]?.name.replace(/\s/g, "")
                setImageInputs((prevInputs) =>
                    prevInputs.map((input) => (input.id === id ? { ...input, imageUrl } : input))
                );
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };


    const handleRemarkSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/orders-api/orders/weight-reconciliation-dispute/`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            if (response?.status === 200) {
                setAddRemarks(false)
                setReset(new Date())
                setFormData((prev) => ({
                    ...prev,
                    images: '',
                    remark: '',
                    bulk_action: RaiseBulk,
                }))
                toast.success("Dispute Raised successfully!")
                setRaiseBulk(false)
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };

    return (
        <>
            <section className={`view-dispute-panel ${DisputeEscalate && 'open'}`}>
                <div id='sidepanel-closer' onClick={() => setDisputeEscalate(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div className='panel-header'>
                    <div>
                        <h4>Weight Dispute Remarks</h4>
                        <p>You can view all remarks or add your new remarks.</p>
                    </div>
                    <div>
                        {
                            !RaiseBulk &&
                            <button onClick={(type) => handleAddRemarks(AddRemarks ? "cancel" : "add")} className='btn main-button'>
                                {
                                    AddRemarks ? 'Cancel' : 'Add Remarks'
                                }
                            </button>
                        }
                    </div>
                </div>
                <div className='panel-body'>
                    <div className='d-flex w-100 justify-content-between align-items-center my-3'>
                        {!RaiseBulk &&
                            <>
                                <div>
                                    <p>Charged Weight: {(selectedRow?.c_weight / 1000).toFixed(2)} kg</p>
                                    <p>Charged Dimensions (cm): {selectedRow?.c_length} x {selectedRow?.c_breadth} x {selectedRow?.c_height}</p>
                                </div>
                                <div>
                                    <p>Dispute Date: {moment(selectedRow?.created_at).format("DD MMM YYYY")}</p>
                                    <p>Status: <span className='dispute-status'>{selectedRow?.status}</span></p>
                                </div>
                            </>
                        }
                    </div>
                    <div className='flip-flex'>
                        <div className={`table-container ${AddRemarks && 'hide-content'}`}>
                            <table className=" w-100">
                                <thead className="sticky-header">
                                    <tr>
                                        <th>Remarks By</th>
                                        <th>Remark Date</th>
                                        <th>Remark(s)</th>
                                    </tr>
                                    <tr className="blank-row"><td></td></tr>
                                </thead>
                                <tbody>
                                    {historyRecord?.map((row, index) => (
                                        <React.Fragment key={row?.id}>
                                            {index > 0 && <tr className="blank-row"><td></td></tr>}
                                            <tr key={index}>
                                                <td>{row?.action_taken_by}</td>
                                                <td>
                                                    <p>{moment(row?.updated_at).format('DD MMM YYYY')} || {moment(row?.updated_at).format('h:mm A')}</p>
                                                </td>
                                                <td>
                                                    {/* <p>Asked Weight: {selectedRow?.e_weight} kg</p> */}
                                                    <p>{row?.remark}</p>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={`remark-form-section ${!AddRemarks && 'hide-content'}`}>
                            <div className='w-100'>
                                <textarea
                                    cols={5}
                                    className='input-field'
                                    value={formData.remark}
                                    onChange={(e) => setFormData((prev) => ({
                                        ...prev,
                                        remark: e.target.value
                                    }))}
                                ></textarea>
                            </div>
                            <div className='d-flex flex-column'>
                                {imageInputs.map((input) => (
                                    <div key={input.id} className='d-flex mb-2'>
                                        <input
                                            type="file"
                                            className='form-control input-field'
                                            onChange={(e) => handleImageChange(e, input.id)}
                                        />
                                        {imageInputs.length > 1 && (
                                            <button
                                                className='btn btn-danger ms-2'
                                                onClick={() => handleRemoveImageInput(input.id)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button className='btn add-images-btn mt-2' onClick={handleAddImageInput}>
                                    Add more images
                                </button>
                            </div>
                            <div>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-100'>
                                <button onClick={(type) => handleAddRemarks("cancel")} className='btn cancel-button'>Cancel</button>
                                <button onClick={handleRemarkSubmit} className='btn main-button'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewDisputeHistory