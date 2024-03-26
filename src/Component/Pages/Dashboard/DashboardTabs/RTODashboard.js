import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import RTOOrderDetails from '../Components/RTO/RTOOrderDetails'
import TopRTOPincodes from '../Components/RTO/TopRTOPincodes'
import RTOStatus from '../Components/RTO/RTOStatus'
import RTOCount from '../Components/RTO/RTOCount'
import TopRTOCity from '../Components/RTO/TopRTOCity'
import TopRTOCourier from '../Components/RTO/TopRTOCourier'
import { dateRangeDashboard } from '../../../../customFunction/dateRange'

const RTODashboard = ({ activeTab }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = Cookies.get('token');
    if (activeTab === "RTO" ) {
      dispatch({ type: "DASHBOARD_RTO_TOP_RTO_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_TOP_CITY_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_COUNT_MONTHWISE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_TOP_COURIER_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_STATUS_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab, dispatch])

  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          {/* <RTOOrderDetails /> */}
          <TopRTOPincodes />
        </Col>
        <Col className="col-6 cardsSpace">
          <RTOStatus />
          <RTOCount />
        </Col>
        <Col className="col-3 cardsSpace">
          <TopRTOCity />
          <TopRTOCourier />
        </Col>
      </Row>
    </>
  )
}

export default RTODashboard