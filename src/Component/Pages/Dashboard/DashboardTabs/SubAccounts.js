import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MostViewedStatus from '../Components/WhatsAppComm/MostViewedStatus'
import SentOverTime from '../Components/WhatsAppComm/SentOverTime'
import SubAccountsInfo from '../Components/SubAccounts/SubAccountsInfo'
import PerformanceSubAccounts from '../Components/SubAccounts/PerformanceSubAccounts'
import PerformanceRefAccounts from '../Components/SubAccounts/PerformanceRefAccounts'
import CODSubAccounts from '../Components/SubAccounts/CODSubAccounts'
import CODRefAccounts from '../Components/SubAccounts/CODRefAccounts'
import NonActiveService from '../Components/NonActiveService/NonActiveService'
import { BASE_URL_CORE, BASE_URL_ORDER } from '../../../../axios/config'
import { globalGetApiCallFunction } from '../../../../customFunction/apicall'
import { customErrorFunction } from '../../../../customFunction/errorHandling'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'


const SubAccounts = ({ activeTab }) => {
  const orderEndPoint = BASE_URL_ORDER
  let authToken = Cookies.get("access_token")
  const [cardCounter, setCounter] = useState(null)
  const [labeldata, setLabelData] = useState([])
  const [subAccountCount, setSubAccountCount] = useState(null)
  const { planStatusData } = useSelector(state => state?.authDataReducer);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "Sub Accounts") {
        try {
          const res1 = await globalGetApiCallFunction(orderEndPoint + "/orders-api/dashboard/seller-sub-account/");
          const res2 = await globalGetApiCallFunction(orderEndPoint + "/orders-api/dashboard/sub-account/");
          setCounter(res2);
          const temp = res1?.map((item) => ({
            label: item.company_name,
            value: item.id
          }));
          setLabelData(temp)
        } catch (error) {
          customErrorFunction(error)
        }
      }
    };
    fetchData();
  }, [activeTab]);

  const fetchSku = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_CORE}/core-api/seller/sub-account/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {

        setSubAccountCount(response?.data?.results?.length)
      }
    } catch (error) {
      customErrorFunction(error);
    }
  };
  useEffect(() => {
    if (activeTab === "Sub Accounts") {
      fetchSku();
    }
  }, [activeTab]);

  return (
    <>
      <div className='position-relative'>
        {!planStatusData?.multiple_user_login_role_management && <NonActiveService />}
        <Row className='cardsSpace position-relative z-2'>
          <Col className='col-12'>
            <Row>
              <Col className='col-3 cardsSpace'>
                <CODSubAccounts labeldata={labeldata} activeTab={activeTab} />
              </Col>
              <Col className='col-6 cardsSpace'>
                <SubAccountsInfo cardCounter={cardCounter} />
              </Col>
              <Col className='col-3 cardsSpace'>
                <CODRefAccounts />
              </Col>
            </Row>
          </Col>
          <Col className='col-12'>
            <Row>
              <Col className='col-6 cardsSpace'>
                <PerformanceSubAccounts labeldata={labeldata} activeTab={activeTab} />
              </Col>
              <Col className='col-6 cardsSpace'>
                <PerformanceRefAccounts />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default SubAccounts