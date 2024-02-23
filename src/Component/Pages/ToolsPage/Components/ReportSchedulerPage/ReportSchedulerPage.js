import { faChevronRight, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './ReportSchedulerPage.css'
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import Select from 'react-select';



const ReportSchedulerPage = () => {
  const [NewScheduler, setNewScheduler] = useState(false)

  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dataForLast, setdataForLast] = useState(null);

  const dataForLastOptions = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' }
  ];

  const handledataForLast = (dataForLast) => {
    setdataForLast(dataForLast);
  };


  const generateDateOptions = () => {
    const options = [];
    for (let i = 1; i <= 31; i++) {
      options.push({ value: i, label: i });
    }
    return options;
  };

  const handleDateChange = (selectedOption) => {
    setSelectedDate(selectedOption.value);
  };

  const timeOptions = [
    { value: '08:00 AM', label: '08:00 AM' },
    { value: '09:00 AM', label: '09:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '12:00 PM', label: '12:00 PM' },
    { value: '01:00 PM', label: '01:00 PM' },
    { value: '02:00 PM', label: '02:00 PM' },
    { value: '03:00 PM', label: '03:00 PM' },
    { value: '04:00 PM', label: '04:00 PM' },
    { value: '05:00 PM', label: '05:00 PM' }
  ];


  // Dummy report data
  const dummyReports = [
    {
      id: 1,
      title: "Dummy Report 1",
      type: "Type A",
      status: true, // Assuming true represents 'Active' and false represents 'Inactive'
      recipients: ["Recipient 1", "Recipient 2"],
      recurrence: "Daily",
      orderStatus: "Pending",
      orderSubStatus: "Sub Status 1"
    },
    {
      id: 2,
      title: "Dummy Report 2",
      type: "Type B",
      status: true,
      recipients: ["Recipient 3", "Recipient 4"],
      recurrence: "Weekly",
      orderStatus: "Completed",
      orderSubStatus: "Sub Status 2"
    }
  ];

  // State to manage the status toggle
  const [reports, setReports] = useState(dummyReports);

  // Function to toggle status
  const toggleStatus = (id) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: !report.status } : report
    ));
  };

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
              <th>Order status</th>
              <th>Order Sub Status</th>
              <th>Actions</th>
            </tr>
            <tr className="blank-row"><td></td></tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <>
                <tr className='table-row box-shadow' key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.type}</td>
                  <td>
                    {/* Toggle switch for status */}
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={report.status} onChange={() => {
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
                  <td>{report.recipients.join(', ')}</td>
                  <td>{report.recurrence}</td>
                  <td>{report.orderStatus}</td>
                  <td>{report.orderSubStatus}</td>
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
          <div class="grid-container">
            <div class="grid-item component-1">
              <h5>Report Details</h5>
              <div className='d-flex flex-column gap-4'>
                <label>
                  Please Select a report Type
                  <select className='select-field' type="text" />
                </label>
                <label>
                  Report Name
                  <input className='input-field' type="text" />
                </label>
                <label>Recipients Email IDs
                  <ReactMultiEmail
                    placeholder='Enter Recipients email ID and press enter'
                    emails={emails}
                    onChange={(_emails) => {
                      setEmails(_emails);
                    }}
                    autoFocus={true}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    getLabel={(email, index, removeEmail) => {
                      return (
                        <div data-tag key={index}>
                          <div data-tag-item>{email}</div>
                          <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                          </span>
                        </div>
                      );
                    }}
                  />
                </label>
              </div>
            </div>

            <div class="grid-item component-2">
              <h5>Frequency Details</h5>
              <div className='d-flex flex-column gap-4'>
                <label>
                  Send Reports
                  <label>Every Month
                    <input type="radio" name="Send_Reports" id="" />
                  </label>
                  <label>Every Week
                    <input type="radio" name="Send_Reports" id="" />
                  </label>
                  <label>Every Day
                    <input type="radio" name="Send_Reports" id="" />
                  </label>
                </label>
                <label>
                  Selected Dates for sending reports
                  <Select
                    isMulti
                    options={generateDateOptions()}
                    placeholder="Select a date"
                    onChange={handleDateChange}
                  />
                </label>
                <label>
                  Select Time
                  <Select
                    isMulti
                    options={timeOptions}
                  />
                </label>
                <label className='d-flex flex-column'>
                  Get data for the last
                  <div className='d-flex align-items-center w-100 gap-3'>
                    <label className='w-100'>
                      <Select
                        options={generateDateOptions()}
                        placeholder="Select a date"
                        onChange={handleDateChange}
                      />
                    </label>
                    <label className='w-100'>
                      <Select
                        value={dataForLast}
                        onChange={handledataForLast}
                        options={dataForLastOptions}
                        placeholder="Select option..."
                      />
                    </label>
                  </div>
                </label>
                <p className='font13'><strong>Note:</strong> It can take upto 24 hours in sending your first report.</p>
                <p>We'll send reports on your email <strong>every month</strong> on <strong>19th</strong> with the last <strong>1 day</strong> data with the selected report content.</p>
              </div>
            </div>

            <div class="grid-item component-3">
              <h5>Report Content</h5>
              <div className='d-flex flex-column gap-4'>
                <label>
                  Order Type
                  <select className='select-field' name="" id=""></select>
                </label>
                <label>
                  Order Status
                  <select className='select-field' name="" id=""></select>
                </label>
                <label>
                  Order Sub-status
                  <select className='select-field' name="" id=""></select>
                </label>
              </div>
            </div>
          </div>
          <div className='d-flex gap-3 justify-content-end my-3'>
            <button className='btn cancel-button'>Cancel</button>
            <button className='btn main-button'>Schedule Report</button>
          </div>
        </section>

      </section>

      <div onClick={() => setNewScheduler(!NewScheduler)} className={`backdrop ${NewScheduler ? 'd-block' : 'd-none'}`}></div>

    </>
  );
}

export default ReportSchedulerPage;
