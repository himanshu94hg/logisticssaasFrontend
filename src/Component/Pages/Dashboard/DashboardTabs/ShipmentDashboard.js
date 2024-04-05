import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import WeightProfile from '../Components/Shipment/WeightProfile'
import ShipmentOverview from '../Components/Shipment/ShipmentOverview'
import ZoneWiseData from '../Components/Shipment/ZoneWiseData'
import OFDDataCard from '../Components/Shipment/OFDDataCard'
import ExpectedDate from '../Components/Shipment/ExpectedDate'
import ShipmentPerformance from '../Components/Shipment/ShipmentPerformance'
import DataTable from '../Components/Overview/DataTable/DataTable'
import { useDispatch } from 'react-redux'
import { dateRangeDashboard } from '../../../../customFunction/dateRange'

const ShipmentDashboard = ({activeTab}) => {

  const dispatch=useDispatch()

  useEffect(()=>{
    if(activeTab==="Shipment"){
      dispatch({type:"DASHBOARD_SHIPMENT_WEIGHT_PROFILE_ACTION",payload:dateRangeDashboard})
      dispatch({type:"DASHBOARD_SHIPMENT_OFD_DATA_ACTION",payload:dateRangeDashboard})
      dispatch({type:"DASHBOARD_SHIPMENT_ZONEWISE_DATA_ACTION",payload:dateRangeDashboard})
      dispatch({type:"DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA_ACTION",payload:dateRangeDashboard})
      dispatch({type:"DASHBOARD_SHIPMENT_PERFORMANCE_METRIX_ACTION",payload:dateRangeDashboard})
    }
  },[activeTab])

  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <WeightProfile />
          <ZoneWiseData />
        </Col>
        <Col className="col-6 cardsSpace">
          <ShipmentOverview />
          <ShipmentPerformance />
        </Col>
        <Col className="col-3 cardsSpace">
          <OFDDataCard />
          <ExpectedDate />
        </Col>
      </Row>
    </>
  )
}

export default ShipmentDashboard