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
import { useSelector } from 'react-redux'
import NonActiveService from '../Components/NonActiveService/NonActiveService'
import { getDateRangeDashboard } from '../../../../customFunction/getDateRangeDashboard'

const RTODashboard = ({ activeTab }) => {
  const dispatch = useDispatch()
  const { screenWidthData, planStatusData } = useSelector(state => state?.authDataReducer)
  const dateRange = useSelector((state) => state.dateRange);

  const dateRangeDashboard = getDateRangeDashboard(dateRange);

  useEffect(() => {
    const token = Cookies.get('token');
    if (activeTab === "RTO") {
      dispatch({ type: "DASHBOARD_RTO_TOP_RTO_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_TOP_CITY_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_COUNT_MONTHWISE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_TOP_COURIER_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_RTO_STATUS_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab, dispatch, dateRangeDashboard])


  return (
    <>
      <Row className={`mb-3 ${screenWidthData < 992 && 'm-inline-1'} position-relative`}>
        {!planStatusData?.analytics_dashboard && <NonActiveService />}
        <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
          {/* <RTOOrderDetails /> */}
          <TopRTOPincodes screenWidthData={screenWidthData} />
        </Col>
        <Col className="col-sm-12 col-lg-6 col-md-12 cardsSpace">
          <RTOStatus />
          <RTOCount />
        </Col>
        <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
          <TopRTOCity />
          <TopRTOCourier />
        </Col>
      </Row>
    </>
  )
}

export default RTODashboard