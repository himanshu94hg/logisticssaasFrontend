import { faChevronRight, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './ReportSchedulerPage.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import Select from 'react-select';
import Pagination from '../../../../common/Pagination/Pagination';
import NonActiveService from '../../../Dashboard/Components/NonActiveService/NonActiveService';

const ReportSchedulerPage = () => {
  const dispatch = useDispatch()
  const [reset, setReset] = useState(null)
  const [emails, setEmails] = useState([]);
  const [reports, setReports] = useState([]);
  const [focused, setFocused] = useState(false);
  const [totalItems, setTotalItems] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [dataForLast, setdataForLast] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [NewScheduler, setNewScheduler] = useState(false)
  const [reportSchedular, setReportSchedular] = useState([]);
  const [reportData, setReportData] = useState({
    report_title: "",
    recipients: "",
    report_type: "Order",
    order_type: "Prepaid",
    order_status: "Forward",
    order_sub_status: "Forward"
  });
  const { planStatusData } = useSelector(state => state?.authDataReducer);
  const { reportSchedularData, } = useSelector(state => state?.toolsSectionReducer)

  const reportType = [
    { value: 'Order', label: 'Order' },
    { value: 'Non-order', label: 'Non-order' },
  ];

  const contentType = [
    { value: 'recharge_logs', label: 'Recharge Logs' },
    { value: 'remmittance_logs', label: 'Remmittance Logs' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'credit_report', label: 'Credit Report' },
    { value: 'debit_report', label: 'Debit Report' },
    { value: 'shipping_charges', label: 'Shipping Charges' },
  ];


  const orderType = [
    { value: 'both', label: 'Both' },
    { value: 'Prepaid', label: 'Prepaid' },
    { value: 'COD', label: 'COD' },
  ];
  const orderStatus = [
    { value: 'Forward', label: 'Forward' },
    { value: 'Reverse', label: 'Reverse' },
  ];
  const orderSubStatus = [
    { value: 'Forward', label: 'Forward' },
    { value: 'Reverse', label: 'Reverse' },
  ];
  const dataForLastOptions = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' }
  ];
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


  const toggleStatus = (id) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: !report.status } : report
    ));
  };

  useEffect(() => {
    dispatch({ type: "REPORT_SCHEDULER_GET_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } })
  }, [reset, currentPage])


  useEffect(() => {
    if (reportSchedularData && reportSchedularData !== undefined) {
      setReportSchedular(reportSchedularData)
      setTotalItems(reportSchedularData?.length)
    }
  }, [reportSchedularData])

  const handleSubmit = () => {
    setNewScheduler(false);
    dispatch({ type: "REPORT_SCHEDULER_POST_ACTION", payload: reportData })
  }

  const handleCancel = () => {
    setReportData({
      report_title: "",
      recipients: "",
      report_type: "Order",
      order_type: "Prepaid",
      order_status: "Forward",
      order_sub_status: "Forward"
    })
    setNewScheduler(false);
  }

  const handleChange = (e, selectFileds) => {
    const value = e.target ? e.target.value : e.value;
    if (selectFileds === "report_title") {
      setReportData(prev => ({
        ...prev,
        [selectFileds]: value
      }));
    } else if (selectFileds === "recipients") {
      const concatenatedString = e.join(",");
      setReportData(prev => ({
        ...prev,
        [selectFileds]: concatenatedString
      }));
    }
    else {
      setReportData(prev => ({
        ...prev,
        [selectFileds]: value
      }));
    }
  };

  const handleDelete = (value) => {
    dispatch({ type: "REPORT_SCHEDULER_DELETE_ACTION", payload: value })
  }

  const customStyles = {
    menuList: (provided) => ({
      ...provided,
      maxHeight: '130px',
      overflowY: 'auto',
    }),
  };


  return (
    <>
      <div className='position-relative'>
        {!planStatusData?.report_schedular && <NonActiveService />}
        <div className='d-flex justify-content-between align-items-center'>
          <h4>Scheduled Reports</h4>
          <button onClick={() => {
            if (planStatusData?.report_schedular) {
              setNewScheduler(!NewScheduler)
            }
          }} className='btn main-button'>Schedule Reports</button>
        </div>

        <div className='rs-page-container'>
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
                {reportSchedular?.map(report => (
                  <React.Fragment key={report.id}>
                    <tr className='table-row box-shadow'>
                      <td>{report.report_title}</td>
                      <td>{report.report_type}</td>
                      <td>
                        {/* Toggle switch for status */}
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={report.enabled}
                            onChange={() => {
                              // Handle toggle status
                              const updatedReports = reportSchedular?.map(rep => {
                                if (rep.id === report.id) {
                                  return { ...rep, status: !rep.status };
                                }
                                return rep;
                              });
                              setReportSchedular(updatedReports);
                            }}
                          />
                        </div>
                      </td>
                      <td>{report.recipients}</td>
                      <td>{report.recurrence}</td>
                      <td>{report.order_type}</td>
                      <td>{report.order_status}</td>
                      <td>{report.order_sub_status}</td>
                      <td className='align-middle'>
                        <div className='d-flex align-items-center gap-3'>
                          <button className='btn edit-btn'>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            className='btn delete-btn'
                            onClick={() => handleDelete(report.id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="blank-row"><td></td></tr>
                  </React.Fragment>
                ))}
              </tbody>

            </table>
          </div>
          <Pagination
            setReset={setReset}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

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
                  <Select
                    options={reportType}
                    // value={reportData.report_type}
                    onChange={(e) => handleChange(e, "report_type")}
                  />
                </label>
                <label>
                  Report Name
                  <input
                    type="text"
                    value={reportData.report_title}
                    name={"report_title"}
                    className='input-field'
                    placeholder='Enter Report Name'
                    onChange={(e) => handleChange(e, "report_title")}
                  />
                </label>
                <label>Recipients Email IDs
                  <ReactMultiEmail
                    emails={emails}
                    autoFocus={true}
                    value={reportData.recipients}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => handleChange(e, "recipients")}
                    placeholder='Enter Recipients email ID and press enter'
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
                <label className='d-flex gap-5 align-items-center flex-wrap row-gap-2'>
                  Send Reports:
                  <label className='d-flex gap-2 align-items-center'>
                    <input type="radio" name="Send_Reports" id="" />
                    Every Month
                  </label>
                  <label className='d-flex gap-2 align-items-center'>
                    <input type="radio" name="Send_Reports" id="" />
                    Every Week
                  </label>
                  <label className='d-flex gap-2 align-items-center'>
                    <input type="radio" name="Send_Reports" id="" />
                    Every Day
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
              {reportData.report_type === 'Non-order' ? <>
                <div className='d-flex flex-column gap-4'>
                  <label>
                    Content Type
                    <Select
                      options={contentType}
                      styles={customStyles}
                    // value={reportData.report_type}
                    // onChange={(e) => handleChange(e, "")}
                    />
                  </label>
                  <label className='invisible'>
                    #############
                    <Select
                    />
                  </label>
                </div>
              </> :
                <div className='d-flex flex-column gap-4'>
                  <label>
                    Order Type
                    <Select
                      options={orderType}
                      // value={reportData.order_type}
                      onChange={(e) => handleChange(e, "order_type")}
                    />
                  </label>
                  <label>
                    Order Status
                    <Select
                      options={orderStatus}
                      // value={reportData.order_status}
                      onChange={(e) => handleChange(e, "order_status")}
                    />
                  </label>
                  <label>
                    Order Sub-status
                    <Select
                      options={orderSubStatus}
                      // value={reportData.order_sub_status}
                      onChange={(e) => handleChange(e, "order_sub_status")}
                    />
                  </label>
                </div>
              }
            </div>

          </div>
          <div className='d-flex gap-3 justify-content-end my-3'>
            <button className='btn cancel-button' onClick={handleCancel}>Cancel</button>
            <button className='btn main-button' onClick={handleSubmit}>Schedule Report</button>
          </div>
        </section>

      </section>

      <div onClick={() => setNewScheduler(!NewScheduler)} className={`backdrop ${NewScheduler ? 'd-block' : 'd-none'}`}></div>

    </>
  );
}

export default ReportSchedulerPage;
