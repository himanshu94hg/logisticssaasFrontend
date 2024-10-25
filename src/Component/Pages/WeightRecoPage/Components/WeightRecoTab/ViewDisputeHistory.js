import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ViewDisputeHistory = ({ DisputeEscalate, selectedRow, setDisputeEscalate }) => {
    const dispatch = useDispatch();
    const historyRecord = useSelector(state => state?.weightRecoReducer?.historyData);
    useEffect(() => {
        if (DisputeEscalate && selectedRow) {
            dispatch({ type: "HISTORY_ACTION", payload: selectedRow?.id });
        }
    }, [DisputeEscalate, selectedRow, dispatch]);

    const [AddRemarks, setAddRemarks] = useState(false)

    const handleAddRemarks = () => {
        setAddRemarks(!AddRemarks)
    }
    const handleAddImageInput = () => {

    }

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
                                <textarea name="" id=""></textarea>
                            </div>
                            <input type="file" name="" id="" />
                            <button onClick={handleAddImageInput}>Add more images</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewDisputeHistory