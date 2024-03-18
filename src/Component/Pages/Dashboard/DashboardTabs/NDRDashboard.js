import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import NDRTotalInfo from '../Components/NDR/NDRTotalInfo'
import SuccessByZone from '../Components/NDR/SuccessByZone'
import NDRStatus from '../Components/NDR/NDRStatus'
import NDRReasonSplit from '../Components/NDR/NDRReasonSplit'
import SuccessbyCourier from '../Components/NDR/SuccessbyCourier'
import NDRtoDeliveryAttempt from '../Components/NDR/NDRtoDeliveryAttempt'
import SellerBuyerResponse from '../Components/NDR/SellerBuyerResponse'
import NDRResponse from '../Components/NDR/NDRResponse'
import NDRFunnel from '../Components/NDR/NDRFunnel'
import { useDispatch } from 'react-redux'
import { dateRangeDashboard } from '../../../../customFunction/dateRange'

const NDRDashboard = ({activeTab}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === "NDR") {
      dispatch({ type: "DASHBOARD_NDR_COUNTER_CARDS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_STATUS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_SUCCESS_BY_COURIER_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_SUCCESS_BY_ZONE_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab])

  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <SuccessByZone />
          <SuccessbyCourier />
          <NDRResponse />
        </Col>
        <Col className="col-6 cardsSpace">
          <NDRTotalInfo />
          <NDRStatus />
          <NDRFunnel />
        </Col>
        <Col className="col-3 cardsSpace">
          <NDRtoDeliveryAttempt />
          <NDRReasonSplit />
          <SellerBuyerResponse />
        </Col>
      </Row>
    </>
  )
}

export default NDRDashboard