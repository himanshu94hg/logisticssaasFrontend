import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TbBuildingWarehouse } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import './ManageWarehouse.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import EditWareHouse from './EditWareHouse';
import { BASE_URL_CORE } from '../../../axios/config';
import { Modal, Form, Button } from 'react-bootstrap';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from "react-icons/ai";
import { faChevronRight, faCircleXmark, faMagnifyingGlass, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { RxReset } from "react-icons/rx";
import ThreeDots from '../../../assets/image/icons/ThreeDots.png'

const BoxGrid = ({ boxData, editWarehouse, setWareHouseId }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(null);
  const [defaultWarehouseIndex, setDefaultWarehouseIndex] = useState(null);

  useEffect(() => {
    if (boxData) {
      let temp = null;
      boxData.map((item) => {
        if (item?.is_default) {
          temp = item?.id
        }
      })
      setDefaultWarehouseIndex(temp)
    }
  }, [boxData])

  const handleToggle = (index, id) => {
    setIsOpen(isOpen === index ? null : index);
  };


  const handleSetDefault = (index, id) => {
    if (defaultWarehouseIndex === index) {
      Swal.fire({
        text: 'This warehouse is already marked as default.',
        confirmButtonText: 'Ok',
        customClass: {
          title: 'custom-title',
          confirmButton: 'btn main-button',
          cancelButton: 'btn cancel-button'
        }
      });
    } else {
      Swal.fire({
        title: 'Confirmation Required!',
        text: 'Do you want to mark this warehouse as default?',
        showCancelButton: true,
        confirmButtonText: `Yes, mark it as default`,
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
        customClass: {
          title: 'custom-title',
          confirmButton: 'btn main-button',
          cancelButton: 'btn cancel-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "MAKE_WAREHOUSE_DEFAULT_ACTION", payload: id })
          setDefaultWarehouseIndex(index);
          Swal.fire({
            title: 'Marked as Default!',
            text: 'This warehouse has been marked as default.',
            icon: 'success',
            timer: '3000',
            showConfirmButton: false,
            customClass: {
              title: 'custom-title',
              confirmButton: 'btn main-button',
              cancelButton: 'btn cancel-button'
            }
          });
        }
      });
    }
  };

  if (boxData.length === 0) {
    return <p>No data available</p>;
  }


  return (
    <div className="box-grid">
      {boxData?.length && boxData?.map((box, index) => (
        <div key={index} className={`box`}>
          <div className={`box-card-outer ${isOpen === index ? 'card-flip' : ''}`}>
            <div className='warehouse-details'>
              <button
                onClick={() => handleSetDefault(index, box?.id)}
                className={`btn mark-as-default-btn  ${box?.is_default ? 'bg-sh-primary text-white' : ''} ${isOpen === index ? 'd-none' : ''}`}>
                {box?.is_default ? <span className=''>Default</span> : <span>Mark as Default</span>}
              </button>
              <div>
                <div className='warehouse-heading mb-2'>
                  <TbBuildingWarehouse fontSize={25} />
                  <h4 className='mb-0'>{box?.warehouse_name}</h4>
                </div>
                <p>{box?.contact_name}</p>
              </div>
              <hr />
              <div>
                <p>{box?.gst_number}</p>
                <p>{box?.contact_name}</p>
                <p>{box?.contact_number}</p>
              </div>
              <hr />
              <div>
                <p className='add-truncated-paragraph'>{box?.address_line1}, {box?.address_line2}</p>
                <p>{box?.city}, {box?.state}, PIN:{box?.pincode}</p>
                <p>{box?.support_email}</p>
                <p>Ph. {box?.support_phone}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <button className='btn main-button-outline' onClick={() => handleToggle(index)}>Show RTO Address</button>
                <div className='d-flex gap-2'>
                  <button className='btn edit-btn' onClick={() => {
                    editWarehouse(index);
                    setWareHouseId(box.id)
                  }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className='btn delete-btn'
                    onClick={() => dispatch({ type: "DELETE_WAREHOUSE_ACTION", payload: box?.id })}
                  ><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
            <div className={`rto-details ${isOpen === index ? 'open' : ''}`}>
              <button className='btn close-button' onClick={() => setIsOpen(null)}><FontAwesomeIcon icon={faCircleXmark} /></button>
              <div>
                <div className='rto-pin-title'>RTO Address</div>
                <div className='warehouse-heading mb-2'>
                  <TbBuildingWarehouse fontSize={25} />
                  <h4 className='mb-0'>{box?.rto_details?.warehouse_name}</h4>
                </div>
                <p>{box?.rto_details?.contact_person_name}</p>
              </div>
              <hr />
              <div>
                <p>GST no. {box?.rto_details?.gst_number}</p>
                <p>{box?.rto_details?.contact_person_name}</p>
                <p>Ph. {box?.rto_details?.contact_number}</p>
              </div>
              <hr />
              <div>
                <p className='add-truncated-paragraph'>{box?.rto_details?.address}, {box?.rto_details?.landmark}</p>
                <p>{box?.rto_details?.city}, {box?.rto_details?.state}, PIN:{box?.rto_details?.pincode}</p>
                <p>{box?.rto_details?.email}</p>
                <p>Alt. Ph. {box?.rto_details?.contact_number}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ManageWarehouse = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false)
  const authToken = Cookies.get("access_token");
  const [searchQuery, setSearchQuery] = useState('');
  const [initialData, setInitialData] = useState([])
  const [wareHouseId, setWareHouseId] = useState(null);
  const [bulkReset, setBulkReset] = useState(new Date())
  const [selectedFile, setSelectedFile] = useState(null);
  const [ValidateShow, setValidateShow] = useState(false)
  const [editWarehouse, setEditWarehouse] = useState(false);
  const { defaultWarehouseRes } = useSelector(state => state?.settingsSectionReducer);
  const { screenWidthData, planStatusData } = useSelector(state => state?.authDataReducer)

  useEffect(() => {
    fetchDataFromApi();
  }, [defaultWarehouseRes, bulkReset]);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(`${BASE_URL_CORE}/core-api/features/warehouse/`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setBoxes(response?.data);
      setInitialData(response?.data)
    } catch (error) {
      customErrorFunction(error)
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchWarehouse = () => {
    const filteredBoxes = boxes?.filter(box => {
      const searchString = `${box?.warehouse_name} ${box?.address_line1} ${box?.city} ${box?.state} ${box?.pincode}`.toLowerCase();
      return searchString?.includes(searchQuery?.toLowerCase());
    });
    setInitialData(filteredBoxes)
  }

  const handleEditWarehouse = (index) => {
    setEditWarehouse(!editWarehouse);
  };

  const handleClose = () => {
    setShow(false)
    setSelectedFile(null)
    setValidateShow(false)
  };

  const handleShow = () => setShow(true);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setValidateShow(false);
  };

  const handleUpload = async () => {

    if (!selectedFile) {
      setValidateShow(true)
    }
    else {
      setValidateShow(false)
      handleClose();

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await axios.post(
          `${BASE_URL_CORE}/core-api/features/import-warehouse/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.status === 201) {
          toast.success('Warehouse created successfully!');
          setBulkReset(response?.status + new Date())
        }
      } catch (error) {
        customErrorFunction(error);
      }
    }
  };


  const handleExport = async () => {
    try {
      const response = await axios.get(`${BASE_URL_CORE}/core-api/features/export-warehouse/`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        responseType: 'blob'
      });

      if (response.status === 200) {
        toast.success('File exported successfully!');
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, 'warehouse.xlsx');
      } else {
        toast.error('Failed to export the file.');
      }
    } catch (error) {
      console.error('Error during file export: ', error);
      customErrorFunction(error);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setInitialData(boxes); // Reset to initial data
  };

  const handleDownloadTemplate = () => {
    const templateUrl = 'shipease_bulk_order.xlsx';
    const tempAnchor = document.createElement('a');
    tempAnchor.setAttribute('download', 'shipease_bulk_order.xlsx');
    tempAnchor.setAttribute('href', templateUrl);
    tempAnchor.click();
    tempAnchor.remove();
  };

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 500);

  }, [])

  // className={planStatusData?.label_invoices_creation ? '' : 'feature-disabled'}


  return (
    <>
      <div className="position-relative manage-warehouse">
        <section className="box-shadow shadow-sm p7 mb-3 filter-container">
          <div className="search-container d-flex" style={{ width: '40%' }}>
            <label>
              <input
                className='input-field'
                type="text"
                placeholder="Search by Location || Address || City || State || Pincode"
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    searchWarehouse()
                  }
                }}
              />
              <button onClick={searchWarehouse}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </label>
            <button className='btn main-button-outline ms-2' onClick={handleReset}>
              <RxReset className='align-text-bottom' /> Reset
            </button>
          </div>
          {
            screenWidthData > 991 &&
            <div className='button-container'>
              <button className={`btn main-button-outline me-2 ${planStatusData?.enable_pickup_address ? "" : "feature-disabled"}`} onClick={() => { if (planStatusData?.enable_pickup_address) { handleShow() } }} ><AiOutlineCloudUpload fontSize={25} /> Import</button>
              <button className='btn main-button-outline me-2' onClick={handleExport}><AiOutlineCloudDownload fontSize={25} /> Export</button>
              <button className={`btn main-button ${planStatusData?.enable_pickup_address ? "" : "feature-disabled"}`} onClick={() => { if (planStatusData?.enable_pickup_address) { navigate('/add-pickup-address') } }}><FontAwesomeIcon icon={faPlus} /> Add Warehouse</button>
            </div>
          }

          {screenWidthData < 992 &&
            <div className="nav-actions-container">
              <div className="nav-action-dots">
                <img src={ThreeDots} alt="ThreeDots" width={24} />
              </div>
              <div className="nav-actions-list">
                <ul>
                  <li onClick={() => { if (planStatusData?.enable_pickup_address) { handleShow() } }}><AiOutlineCloudUpload className={`align-text-bottom ${planStatusData?.enable_pickup_address ? "" : "feature-disabled"}`} /> Import</li>
                  <li onClick={handleExport}><AiOutlineCloudDownload className='align-text-bottom' /> Export</li>
                  <li onClick={() => { if (planStatusData?.enable_pickup_address) { navigate('/add-pickup-address') } }} className={`${planStatusData?.enable_pickup_address ? "" : "feature-disabled"}`} ><FontAwesomeIcon icon={faPlus} /> Add Warehouse</li>
                </ul>
              </div>
            </div>
          }
        </section>

        <section className='warehouse-grid-container'>
          <div>
            <h4 className='mb-3'>Manage Warehouse Addresses</h4>
            <BoxGrid boxData={initialData} editWarehouse={handleEditWarehouse} setWareHouseId={setWareHouseId} />
          </div>
        </section>
      </div>

      {/* Edit Slider */}
      <section className={`ticket-slider warehouse-edit ${editWarehouse ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => setEditWarehouse(false)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Edit Warehouse</h2>
        </section>
        <section className='ticket-slider-body'>
          <EditWareHouse wareHouseId={wareHouseId} setEditWarehouse={setEditWarehouse} />
        </section>
      </section>
      <section className={`backdrop ${editWarehouse ? 'd-block' : 'd-none'}`}></section>
      <LoaderScreen loading={loader} />
      <Modal className='bulk-import-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Bulk Warehouse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bulk-upload-container">
            <input className='form-control input-field' type="file" onChange={handleFileChange} />
            <a className='float-end mt-2 text-sh-primary font13 d-flex align-items-center gap-1' href='./warehouse_import.xlsx' download><FiDownload /> Download sample file</a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* validation message */}
          {
            ValidateShow && <p className='text-danger font12'>Please Select a file first</p>
          }
          <button className='btn cancel-button' onClick={handleClose}>Cancel</button>
          <button className='btn main-button' onClick={handleUpload}>Upload</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageWarehouse;