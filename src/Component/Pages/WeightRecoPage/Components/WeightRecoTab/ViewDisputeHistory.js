import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const ViewDisputeHistory = ({ DisputeEscalate, selectedRow, setDisputeEscalate }) => {
    const dispatch = useDispatch();
    const historyRecord = useSelector(state => state?.weightRecoReducer?.historyData);
    useEffect(() => {
        if (DisputeEscalate && selectedRow) {
            dispatch({ type: "HISTORY_ACTION", payload: selectedRow?.id });
        }
    }, [DisputeEscalate, selectedRow, dispatch]);

    const [AddRemarks, setAddRemarks] = useState(false)
    const [remarkText, setRemarkText] = useState("");
    const [imageInputs, setImageInputs] = useState([{ id: Date.now(), file: null }]);
    const [error, setError] = useState(false)

    const handleAddRemarks = () => {
        setAddRemarks(!AddRemarks)
        setRemarkText("");
        setImageInputs([{ id: Date.now(), file: null }]);
    }

    const handleAddImageInput = () => {
        setImageInputs([...imageInputs, { id: Date.now(), file: null }]);
    };

    const handleRemoveImageInput = (id) => {
        setImageInputs(imageInputs.filter((input) => input.id !== id));
    };
    const handleImageChange = (e, id) => {
        const file = e.target.files[0];
        setImageInputs((prevInputs) =>
            prevInputs.map((input) => (input.id === id ? { ...input, file } : input))
        );
    };

    const handleRemarkSubmit = () => {
        if (remarkText.trim() || imageInputs.some((input) => input.file)) {
            const remarkData = {
                text: remarkText,
                images: imageInputs.filter((input) => input.file).map((input) => input.file),
            };

            // Dispatch or handle the remark submission with text and images
            console.log("Submitted Remark Data:", remarkData);

            // Reset form
            setRemarkText("");
            setImageInputs([{ id: Date.now(), file: null }]);
            setAddRemarks(false);
        }
        else {
            setError(true)
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
                        <button onClick={handleAddRemarks} className='btn main-button'>
                            {
                                AddRemarks ? 'Cancel' : 'Add Remarks'
                            }
                        </button>
                    </div>
                </div>
                <div className='panel-body'>
                    <div className='d-flex w-100 justify-content-between align-items-center my-3'>
                        <div>
                            <p>Charged Weight: {selectedRow?.c_weight} kg</p>
                            <p>Charged Dimensions (cm): {selectedRow?.c_length} x {selectedRow?.c_breadth} x {selectedRow?.c_height}</p>
                        </div>
                        <div>
                            <p>Dispute Date: {moment(selectedRow?.created_at).format("DD MMM YYYY")}</p>
                            <p>Status: <span className='dispute-status'>{selectedRow?.status}</span></p>
                        </div>
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
                                    value={remarkText}
                                    onChange={(e) => setRemarkText(e.target.value)}
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
                                <button onClick={handleAddRemarks} className='btn cancel-button'>Cancel</button>
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