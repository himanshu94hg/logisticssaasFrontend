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
import { useSelector } from 'react-redux'
import NonActiveService from '../Components/NonActiveService/NonActiveService'

const NDRDashboard = ({ activeTab }) => {
  const dispatch = useDispatch();

  const { screenWidthData, planStatusData } = useSelector(state => state?.authDataReducer)


  useEffect(() => {
    if (activeTab === "NDR") {
      dispatch({ type: "DASHBOARD_NDR_COUNTER_CARDS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_STATUS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_SUCCESS_BY_COURIER_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_SUCCESS_BY_ZONE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_DELIVERY_ATTEMPT_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_FUNNEL_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_RESPONSE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_REASON_SPLIT_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_NDR_BUYER_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab])

  return (
    <>
      <Row className={`mb-3 ${screenWidthData < 992 && 'm-inline-1'} position-relative`}>
        {!planStatusData?.analytics_dashboard && <NonActiveService />}
        <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
          <SuccessByZone />
          <SuccessbyCourier />
          <NDRResponse />
        </Col>
        <Col className="col-sm-12 col-lg-6 col-md-12 cardsSpace">
          <NDRTotalInfo />
          <NDRStatus />
          <NDRFunnel />
        </Col>
        <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
          <NDRtoDeliveryAttempt />
          <NDRReasonSplit />
          <SellerBuyerResponse />
        </Col>
      </Row>
    </>
  )
}

export default NDRDashboard