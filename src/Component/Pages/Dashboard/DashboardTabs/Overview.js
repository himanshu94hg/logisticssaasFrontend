import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import TotalInfoDashboard from '../Components/Overview/TotalInfoDashboard';
import TopSellingDashboard from '../Components/Overview/TopSellingDashboard';
import RevenueDashboard from '../Components/Overview/RevenueDashboard';
import CourierWiseDashboard from '../Components/Overview/CourierWiseDashboard';
import PopularCustomerDashboard from '../Components/Overview/PopularCustomerDashboard';
import TotalShipment from '../Components/Overview/TotalShipment';
import DeliveryPerformance from '../Components/Overview/DeliveryPerformance';
import StateSplitDashboard from '../Components/Overview/StateSplitDashboard';
import TableDashboard from '../Components/Overview/TableDashboard';
import OverviewDetails from '../Components/Overview/OverviewDetails';
import WeightDiscrepancies from '../Components/Overview/WeightDiscrepancies';
import { useDispatch } from 'react-redux';

const Overview = () => {

  return (
    <Row className='mb-3'>
      <Col className="col-3 cardsSpace">
        <TotalShipment />
        <DeliveryPerformance />
        <StateSplitDashboard />
      </Col>
      <Col className="col-6 cardsSpace">
        <TotalInfoDashboard />
        <TableDashboard />
        <TopSellingDashboard />
        <OverviewDetails />
      </Col>
      <Col className="col-3 cardsSpace">
        <RevenueDashboard />
        <CourierWiseDashboard />
        <PopularCustomerDashboard />
        <WeightDiscrepancies />
      </Col>
    </Row>
  );
};

export default Overview;
