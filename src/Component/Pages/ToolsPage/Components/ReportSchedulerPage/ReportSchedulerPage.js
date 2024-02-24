import { faChevronRight, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './ReportSchedulerPage.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ReportSchedulerPage = () => {
  const dispatch=useDispatch()
  const [NewScheduler, setNewScheduler] = useState(false)



  // State to manage the status toggle
  const [reports, setReports] = useState([]);

  // Function to toggle status
  const toggleStatus = (id) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: !report.status } : report
    ));
  };



  useEffect(()=>{
      dispatch({type:"REPORT_SCHEDULER_ACTION"})
  },[])

  const {reportSchedularData}=useSelector(state=>state?.toolsSectionReducer)


  console.log(reportSchedularData,"reportSchedularData")

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Scheduled Reports</h4>
        <button onClick={() => setNewScheduler(!NewScheduler)} className='btn main-button'>Schedule Reports</button>
      </div>
      <div className='table-container'>
        <table className="w-100">
          <thead className="sticky-header">
            <tr className="table-row box-shadow">
              <th>Report Title</th>
              <th>Report Type</th>
              <th>Status</th>
              <th>Recipients</th>
              <th>Report Recurrence</th>
              <th>Order Type</th>
              <th>Order status</th>
              <th>Order Sub Status</th>
              <th>Actions</th>
            </tr>
            <tr className="blank-row"><td></td></tr>
          </thead>
          <tbody>
            {reportSchedularData?.map(report => (
              <>
                <tr className='table-row box-shadow' key={report.id}>
                  <td>{report.report_title}</td>
                  <td>{report.report_type}</td>
                  <td>
                    {/* Toggle switch for status */}
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={report.enabled} onChange={() => {
                        // Handle toggle status
                        const updatedReports = reports.map(rep => {
                          if (rep.id === report.id) {
                            return { ...rep, status: !rep.status };
                          }
                          return rep;
                        });
                        setReports(updatedReports);
                      }} />
                    </div>
                  </td>
                  <td>{report.recipients}</td>
                  <td>{report.recurrence}</td>
                  <td>{report.order_type}</td>
                  <td>{report.order_status}</td>
                  <td>{report.order_sub_status}</td>
                  <td className='align-middle'>
                    <div className='d-flex align-items-center gap-3'>
                      <button className='btn edit-btn' ><FontAwesomeIcon icon={faPenToSquare} /></button>
                      <button className='btn delete-btn'><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                  </td>
                </tr>
                <tr className="blank-row"><td></td></tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <section className={`new-scheduler-slider ${NewScheduler ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => setNewScheduler(!NewScheduler)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Schedule a Report!</h2>
        </section>
        <section className='ticket-slider-body'>

        </section>
      </section>

      <div onClick={() => setNewScheduler(!NewScheduler)} className={`backdrop ${NewScheduler ? 'd-block' : 'd-none'}`}></div>

    </>
  );
}

export default ReportSchedulerPage;
