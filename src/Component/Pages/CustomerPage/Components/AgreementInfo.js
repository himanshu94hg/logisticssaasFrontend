import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL_CORE } from '../../../../axios/config';
import React, { useEffect, useRef, useState } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customErrorFunction } from '../../../../customFunction/errorHandling';
import AgreementData from '../VerifiedCustomer/AgreementData';

const AgreementInfo = ({ activeTab, accountType }) => {
  const dispatch = useDispatch()
  const componentRef = useRef();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [refresh, setRefresh] = useState(new Date())
  const hardcodedToken = Cookies.get("access_token");
  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
  const [formData, setFormData] = useState([]);

  const [dynamicContent, setDynamicContent] = useState({
    name: '',
    place: '',
    date: '',
    document_upload: null
  });

  // useEffect(() => {
  //   dispatch({ type: "SELLER_PROFILE_DATA_ACTION" });
  // }, [refresh])

  useEffect(() => {
    if (userData) {
      setDynamicContent({
        name: userData?.first_name,
        place: userData?.city || 'Gurugram',
        document_upload: null,
        date: moment(new Date()).format("YYYY-MM-DD")
      })
    }
  }, [userData])

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BASE_URL_CORE}/core-api/seller/agreement-info/`;
      if (accountType) {
        url += `?subaccount=${accountType}`;
      }
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
          },
        });
        setData(response?.data);
      } catch (error) {
        customErrorFunction(error);
      }
    };
    if (activeTab === "Agreement") {
      fetchData();
    }

  }, [refresh, activeTab]);

  const handleClickSubmit = async () => {
    let url = `${BASE_URL_CORE}/core-api/seller/agreement-info/`;
    if (accountType) {
      url += `?subaccount=${accountType}`;
    }

    try {
      const response = await axios.post(url, dynamicContent, {
        headers: {
          'Authorization': `Bearer  ${hardcodedToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response?.status === 200) {
        toast.success("Agreement signed successfully!");
        setRefresh(new Date())
      }
    } catch (error) {
      customErrorFunction(error);
    }
    setShow(false)
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const updateContent = () => {
    setShow(true)
  };

  return (
    <>
      <div className='customer-details-container'>
        <div className='customer-details-form'>
          <div className='agreement-section'>
            <AgreementData
              Company={data?.company_name || null}
              Name={data?.name || null}
              Gst={data?.company_gst || null}
              Place={data?.place || null}
              Date={data?.date || null}
            />
          </div>

          {/* <div className='Sign-section'>
            <p>Name: <span>{data?.name}</span></p>
            <p>Place: <span>{data?.place}</span></p>
            <p>Date: <span>{data?.date}</span></p>
          </div> */}

          <div className='agreement-buttons mt-4'>
            <button className='btn btn-success' onClick={updateContent}>Accept and Sign Agreement</button>
            <button className='btn main-button' disabled onClick={handlePrint}><FontAwesomeIcon icon={faDownload} /> Download Agreement</button>
          </div>
          <div className='d-none'>
            <div ref={componentRef}>
              <AgreementData
                Company={data?.company_name || null}
                Name={data?.name || null}
                Gst={data?.company_gst || null}
                Place={data?.place || null}
                Date={data?.date || null}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        className='confirmation-modal'
      >
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(!data?.company_gst || !data?.name || !data?.company_name) ?
            "Please fill and save all the onboarding forms first!"
            :
            "You are about to update the content!"
          }
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex gap-2'>
            <button className="btn cancel-button" onClick={handleClose}>
              Cancel
            </button>
            {(data?.company_gst && data?.name && data?.company_name)
              &&
              <button className="btn main-button" onClick={handleClickSubmit}>Yes, update it!</button>
            }
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgreementInfo;
