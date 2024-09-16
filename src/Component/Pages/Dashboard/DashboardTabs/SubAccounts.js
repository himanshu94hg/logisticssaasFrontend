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
import { BASE_URL_ORDER } from '../../../../axios/config'
import { globalGetApiCallFunction } from '../../../../customFunction/apicall'

const SubAccounts = ({ activeTab }) => {
  const orderEndPoint = BASE_URL_ORDER

  const [cardCounter, setCounter] = useState(null)
  const [labeldata, setLabelData] = useState([])

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
        }
      }
    };
    fetchData();
  }, [activeTab]);


  return (
    <>
      <div className='position-relative'>
        <NonActiveService />  
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