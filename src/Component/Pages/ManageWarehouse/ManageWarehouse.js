import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import SearchIcon from '../../../assets/image/icons/search-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleXmark, faMagnifyingGlass, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from "react-icons/ai";
import { TbBuildingWarehouse } from "react-icons/tb";
import './ManageWarehouse.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import EditWareHouse from './EditWareHouse';

const BoxGrid = ({ boxData, editWarehouse }) => {
  const [isOpen, setIsOpen] = useState(null);
  const dispatch = useDispatch()

  
  
  
  const [defaultWarehouseIndex, setDefaultWarehouseIndex] = useState(null);
  
  useEffect(() => {
    if (boxData) {
      let temp = null;
      boxData.map((item) => {
        if (item.is_default){
          temp=item.id
        }
      })
      setDefaultWarehouseIndex(temp)
    }
  }, [boxData])

  const handleToggle = (index, id) => {
    setIsOpen(isOpen === index ? null : index);
  };



  // Inside BoxGrid component
  const handleSetDefault = (index, id) => {
    // Check if the current warehouse is already marked as default
    if (defaultWarehouseIndex === index) {
      Swal.fire({
        title: 'Already Default',
        text: 'This warehouse is already marked as default.',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonClass: 'my-confirm-button-class'
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to mark this warehouse as default?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `<span class="custom-confirm-button">Yes, mark it as default</span>`,
        cancelButtonText: '<span class="custom-cancel-button">No, cancel</span>',
        reverseButtons: true,
        confirmButtonClass: 'my-confirm-button-class',
        cancelButtonClass: 'my-cancel-button-class'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "MAKE_WAREHOUSE_DEFAULT_ACTION", payload: id })
          setDefaultWarehouseIndex(index);
          Swal.fire(
            'Marked as Default!',
            'This warehouse has been marked as default.',
            'success'
          );
        }
      });
    }
  };

  if (boxData.length === 0) {
    return <p>No data available</p>;
  }



  return (
    <div className="box-grid">
      {boxData.map((box, index) => (

        <div key={index} className={`box`}>
          <div className={`box-card-outer ${isOpen === index ? 'card-flip' : ''}`}>
            <div className='warehouse-details'>
              <button
                onClick={() => handleSetDefault(index, box.id)}
                className={`btn mark-as-default-btn  ${box?.is_default ? 'bg-sh-primary text-white' : ''} ${isOpen === index ? 'd-none' : ''}`}>
                {/* {defaultWarehouseIndex === index ? 'Default' : <span>Mark as Default</span>} */}
                {box?.is_default ? <span className=''>Default</span> : <span>Mark as Default</span>}
              </button>
              <div>
                <div className='warehouse-heading mb-2'>
                  <TbBuildingWarehouse fontSize={25} />
                  <h4 className='mb-0'>{box.warehouse_name}</h4>
                </div>
                <p>{box.contact_name}</p>
              </div>
              <hr />
              <div>
                <p>{box.gst_number}</p>
                <p>{box.contact_name}</p>
                <p>{box.contact_number}</p>
              </div>
              <hr />
              <div>
                <p>{box.address_line1}, {box.address_line2}, {box.city}, {box.state}, PIN:{box.pincode}</p>
                <p>{box.support_email}</p>
                <p>Ph. {box.support_phone}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <button className='btn main-button-outline' onClick={() => handleToggle(index)}>Show RTO Address</button>
                <div className='d-flex gap-2'>
                  <button className='btn edit-btn' onClick={() => editWarehouse(index)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className='btn delete-btn' 
                  onClick={()=>dispatch({type:"DELETE_WAREHOUSE_ACTION",payload:box?.id})}
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
                  <h4 className='mb-0'>{box.rto_details.warehouse_name}</h4>
                </div>
                <p>{box.rto_details.contact_person_name}</p>
              </div>
              <hr />
              <div>
                <p>GST no. {box.rto_details.gst_number}</p>
                <p>{box.rto_details.contact_person_name}</p>
                <p>Ph. {box.rto_details.contact_number}</p>
              </div>
              <hr />
              <div>
                <p>{box.rto_details.address}, {box.rto_details.landmark}, {box.rto_details.city}, {box.rto_details.state}, PIN:{box.rto_details.pincode}</p>
                <p>{box.rto_details.email}</p>
                <p>Alt. Ph. {box.rto_details.contact_number}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ManageWarehouse = () => {
  let navigate = useNavigate();
  const [boxes, setBoxes] = useState([]);
  let sellerData = Cookies.get("user_id")
  let authToken = Cookies.get("access_token");
  const [editWarehouse, setEditWarehouse] = useState(false);
  const {defaultWarehouseRes}=useSelector(state=>state?.settingsSectionReducer)

  useEffect(() => {
    fetchDataFromApi();
  }, [defaultWarehouseRes]);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(`https://dev.shipease.in/core-api/features/warehouse/`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (!response.data) {
        throw new Error('Failed to fetch data');
      }
      setBoxes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditWarehouse = (index) => {
    console.log("Editing warehouse at index:", index);
    setEditWarehouse(!editWarehouse);
  };

  return (
    <>
      <div className="position-relative manage-warehouse">
        <section className="box-shadow shadow-sm p7 mb-3 filter-container">
          <div className="search-container">
            <label>
              <input className='input-field' type="text" placeholder="Search by Location || Address || City || State || Pincode" />
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </label>
          </div>
          <div className='button-container'>
            <button className='btn main-button me-2'><AiOutlineCloudUpload fontSize={25} /> Import</button>
            <button className='btn main-button me-2'><AiOutlineCloudDownload fontSize={25} /> Export</button>
            <button className='btn main-button' onClick={() => navigate('/add-pickup-address')}><FontAwesomeIcon icon={faPlus} /> Add Warehouse</button>
          </div>
        </section>

        <section className='warehouse-grid-container'>
          <div>
            <h4 className='mb-3'>Manage Pickup Addresses</h4>
            <BoxGrid boxData={boxes} editWarehouse={handleEditWarehouse} />
          </div>
        </section>
      </div>

      {/* Edit Slider */}
      <section className={`ticket-slider ${editWarehouse ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => setEditWarehouse(!editWarehouse)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Edit Warehouse</h2>
         <EditWareHouse/>
        </section>
      </section>
      <section className={`backdrop ${editWarehouse ? 'd-block' : 'd-none'}`}></section>
    </>
  );
};

export default ManageWarehouse