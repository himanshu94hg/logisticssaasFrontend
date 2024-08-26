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

const AgreementInfo = ({ activeTab, setDetailsView }) => {
  const dispatch = useDispatch()
  const componentRef = useRef();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [refresh, setRefresh] = useState(new Date())
  const hardcodedToken = Cookies.get("access_token");
  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);

  const [dynamicContent, setDynamicContent] = useState({
    name: '',
    place: '',
    date: '',
    document_upload: null
  });

  useEffect(() => {
    dispatch({ type: "SELLER_PROFILE_DATA_ACTION" });
  }, [refresh])

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
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/agreement-info/`, {
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        customErrorFunction(error);
      }
    };
    if (activeTab === "Agreement") {
      fetchData();
    }

  }, [refresh, activeTab]);

  const handleClickSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/agreement-info/`, dynamicContent, {
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
            <h5>MERCHANT AGREEMENT</h5>
            <h5>SHIPEASE TECHNOLOGIES PRIVATE LIMITED</h5>
            <p>This Merchant Agreement <strong>(“Agreement”)</strong> is between you (company/individual/firm/partnership/body corporate), together with any company or other business entity you are representing, if any (hereinafter collectively referred as “<strong>Merchant</strong>” or “<strong>you</strong>” or “<strong>User</strong>”); and <strong>Shipease Technologies Private Limited</strong>, a company registered under the Companies Act, 1956, having its registered office at 476B 2nd & 3rd Floor, Sector 39 Block C  Gurugram, Haryana, 122001 and corporate office at Unit 321, Tower B1, M3M Cosmopolitan, Sector-66, Gurugram, Haryana, Pin-122101, offering ‘ Logistics Management Services’, under the name ‘Shipease’ (hereinafter referred to as “Shipease” or “we” or “Shipease” or “Company”, and together with the User referred jointly as the “Parties” and individually as a “Party”).</p>
            <h5>BACKGROUND</h5>
            <p>This Agreement comes into effect when you register to use the Services (as defined below), or click on “Continue” box, and accept the terms and conditions provided herein. By registering or clicking on the ‘Continue’ box, you signify your absolute, irrevocable and unconditional consent to all the provisions of this Agreement in its entirety. This Agreement constitutes a legally binding agreement between you and Shipease. This Agreement defines the terms and conditions under which you’re allowed to use the Shipease’s website (“Website”) and Shipease’s mobile application (“Mobile App”), and how Shipease will treat your account while you are a member. If you have any questions about our terms, feel free to contact us at support@Shipease.in. You are advised to read this Agreement carefully. You expressly represent and warrant that you will not avail the Services if you do not understand, agree to become a party to, and abide by all of the terms and conditions specified below. Any violation of this Agreement may result in legal liability upon you. The Website/ Mobile App and the online/ offline services of Shipease or its affiliates, provides access to a platform that facilitates more comfortable form of e-commerce where you can use the logistics services according to your requirements within India and in countries designated by Shipease from time to time (“Service(s)”). This Agreement, among other things, provides the terms and conditions for use of the Services, primarily through a web-based practice management software hosted and managed remotely through the Website/Mobile App. This Agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system, and does not require any physical or digital signatures. This Agreement is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing of the rules and regulations, privacy policy and terms of usage for access or usage of the website/ service.</p>
            <div className='Sign-section'>
              <p>Name: <span>{data?.name}</span></p>
              <p>Place: <span>{data?.place}</span></p>
              <p>Date: <span>{data?.date}</span></p>
            </div>
          </div>
          <div className='agreement-buttons mt-4'>
            <button className='btn btn-success' disabled={userData?.is_agreement_info_verified ? true : false} onClick={updateContent}>Accept and Sign Agreement</button>
            <button className='btn main-button' disabled onClick={handlePrint}><FontAwesomeIcon icon={faDownload} /> Download Agreement</button>
          </div>
          <div style={{ display: 'none' }}>
            <div ref={componentRef}>
              <div className='agreement-section'>
                <h5>MERCHANT AGREEMENT</h5>
                <h5>SHIPEASE TECHNOLOGIES PRIVATE LIMITED</h5>
                <p>This Merchant Agreement <strong>(“Agreement”)</strong> is between you (company/individual/firm/partnership/body corporate), together with any company or other business entity you are representing, if any (hereinafter collectively referred as “<strong>Merchant</strong>” or “<strong>you</strong>” or “<strong>User</strong>”); and <strong>Shipease Technologies Private Limited</strong>, a company registered under the Companies Act, 1956, having its registered office at 476B 2nd & 3rd Floor, Sector 39 Block C  Gurugram, Haryana, 122001 and corporate office at Unit 321, Tower B1, M3M Cosmopolitan, Sector-66, Gurugram, Haryana, Pin-122101, offering ‘ Logistics Management Services’, under the name ‘Shipease’ (hereinafter referred to as “Shipease” or “we” or “Shipease” or “Company”, and together with the User referred jointly as the “Parties” and individually as a “Party”).</p>
                <h5>BACKGROUND</h5>
                <p>This Agreement comes into effect when you register to use the Services (as defined below), or click on “Continue” box, and accept the terms and conditions provided herein. By registering or clicking on the ‘Continue’ box, you signify your absolute, irrevocable and unconditional consent to all the provisions of this Agreement in its entirety. This Agreement constitutes a legally binding agreement between you and Shipease. This Agreement defines the terms and conditions under which you’re allowed to use the Shipease’s website (“Website”) and Shipease’s mobile application (“Mobile App”), and how Shipease will treat your account while you are a member. If you have any questions about our terms, feel free to contact us at support@Shipease.in. You are advised to read this Agreement carefully. You expressly represent and warrant that you will not avail the Services if you do not understand, agree to become a party to, and abide by all of the terms and conditions specified below. Any violation of this Agreement may result in legal liability upon you. The Website/ Mobile App and the online/ offline services of Shipease or its affiliates, provides access to a platform that facilitates more comfortable form of e-commerce where you can use the logistics services according to your requirements within India and in countries designated by Shipease from time to time (“Service(s)”). This Agreement, among other things, provides the terms and conditions for use of the Services, primarily through a web-based practice management software hosted and managed remotely through the Website/Mobile App. This Agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system, and does not require any physical or digital signatures. This Agreement is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing of the rules and regulations, privacy policy and terms of usage for access or usage of the website/ service.</p>
                <div className='Sign-section'>
                  <p>Name: <span>{data?.name}</span></p>
                  <p>Place: <span>{data?.place}</span></p>
                  <p>Date: <span>{data?.date}</span></p>
                </div>
              </div>
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
          You are about to update the content!
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex gap-2'>
            <button className="btn cancel-button" onClick={handleClose}>
              No, cancel!
            </button>
            <button className="btn main-button" onClick={handleClickSubmit}>Yes, update it!</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgreementInfo;
