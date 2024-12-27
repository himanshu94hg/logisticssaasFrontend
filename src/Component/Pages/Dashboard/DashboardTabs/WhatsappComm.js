import axios from 'axios'
import Cookies from "js-cookie"
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import WhatsAppNDR from '../Components/WhatsAppComm/WhatsAppNDR'
import SentOverTime from '../Components/WhatsAppComm/SentOverTime'
import OrdersConfirmed from '../Components/WhatsAppComm/OrdersConfirmed'
import AbundantChecking from '../Components/WhatsAppComm/AbundantChecking'
import MostViewedStatus from '../Components/WhatsAppComm/MostViewedStatus'
import WhatsAppTotalInfo from '../Components/WhatsAppComm/WhatsAppTotalInfo'
import WhatsAppCreateOrder from '../Components/WhatsAppComm/WhatsAppCreateOrder'
import CodToPrepaidConversion from '../Components/WhatsAppComm/CodToPrepaidConversion'
import { BASE_URL_CORE } from '../../../../axios/config'
import NonActiveService from '../Components/NonActiveService/NonActiveService'
import { useSelector } from 'react-redux'

const WhatsappComm = ({ activeTab }) => {
  const token = Cookies.get('access_token');
  const [totalMessage, setTotalMessage] = useState(null)
  const { planStatusData } = useSelector(state => state?.authDataReducer);

  useEffect(() => {
    if (activeTab === "Whatsapp Comm") {
      const fetchAllData = async () => {
        try {
          const urls = [
            `${BASE_URL_CORE}/core-api/seller/whatsapp-total-count/`,
            `${BASE_URL_CORE}/core-api/seller/ndr-bot-count/`,
            `${BASE_URL_CORE}/core-api/seller/create-order-bot-count/`,
            `${BASE_URL_CORE}/core-api/seller/whatsapp-message-count/`,
          ];

          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const results = await Promise.allSettled(
            urls.map((url) =>
              axios.get(url, { headers })
            )
          );
          results.forEach((result, index) => {
            if (result.status === "fulfilled") {
              if (index == 0) {
                setTotalMessage(result?.value?.data)
              }
            }
          });
        } catch (error) {

        }
      };

      fetchAllData();
    }
  }, [activeTab]);


  return (
    <>
      <div className='position-relative'>
        {!planStatusData?.whatsapp_notification && <NonActiveService />}
        <Row className='mb-3 position-relative z-2'>
          <Col className="col-3 cardsSpace">
            <MostViewedStatus />
            <WhatsAppCreateOrder />
          </Col>
          <Col className="col-6 cardsSpace">
            <WhatsAppTotalInfo totalMessage={totalMessage} />
            <WhatsAppNDR />
          </Col>
          <Col className="col-3 cardsSpace">
            <SentOverTime />
            <OrdersConfirmed />
          </Col>
        </Row>
        <Row className='mb-3 position-relative z-2'>
          <Col className='col-6'>
            <CodToPrepaidConversion />
          </Col>
          <Col className='col-6'>
            <AbundantChecking />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default WhatsappComm