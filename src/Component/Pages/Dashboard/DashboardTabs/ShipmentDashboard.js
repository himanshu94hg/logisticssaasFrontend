import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import WeightProfile from '../Components/Shipment/WeightProfile'
import ShipmentOverview from '../Components/Shipment/ShipmentOverview'
import ZoneWiseData from '../Components/Shipment/ZoneWiseData'
import OFDDataCard from '../Components/Shipment/OFDDataCard'
import ExpectedDate from '../Components/Shipment/ExpectedDate'
import ShipmentPerformance from '../Components/Shipment/ShipmentPerformance'
import { useDispatch } from 'react-redux'
import { dateRangeDashboard } from '../../../../customFunction/dateRange'
import { useSelector } from 'react-redux'
import NonActiveService from '../Components/NonActiveService/NonActiveService'
import { getDateRangeDashboard } from '../../../../customFunction/getDateRangeDashboard'

const ShipmentDashboard = ({ activeTab }) => {
  const dispatch = useDispatch()
  const { screenWidthData, planStatusData } = useSelector(state => state?.authDataReducer)

  const dateRange = useSelector((state) => state.dateRange);

  const dateRangeDashboard = getDateRangeDashboard(dateRange);


  useEffect(() => {
    if (activeTab === "Shipment") {
      dispatch({ type: "DASHBOARD_SHIPMENT_WEIGHT_PROFILE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_SHIPMENT_OFD_DATA_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_SHIPMENT_ZONEWISE_DATA_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_SHIPMENT_PERFORMANCE_METRIX_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab, dateRangeDashboard])

  return (
    <>
      <Row className={`mb-3 ${screenWidthData < 992 && 'm-inline-1'} position-relative`}>
        {process.env.REACT_APP_BYPASS_LOGIN !== 'true' && !planStatusData?.analytics_dashboard && <NonActiveService />}
        <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
          <WeightProfile />
          <ZoneWiseData />
        </Col>
        <Col className="col-sm-12 col-lg-6 col-md-12 cardsSpace">
          <ShipmentOverview />
          <ShipmentPerformance />
        </Col>
        <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
          <OFDDataCard />
          <ExpectedDate />
        </Col>
      </Row>
    </>
  )
}

export default ShipmentDashboard