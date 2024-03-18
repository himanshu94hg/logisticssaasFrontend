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
import { dateRangeDashboard } from '../../../../customFunction/dateRange';
import Cookies from 'js-cookie';

const Overview = ({ activeTab }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get('token');
    if (activeTab === "Overview" && token) {
      dispatch({ type: "DASHBOARD_OVERVIEW_SHIPMENTCARD_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_COUNTER_CARD_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_LAST_ORDERS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_TOPSELL_ACTION", payload: dateRangeDashboard })
      // dispatch({ type: "DASHBOARD_OVERVIEW_NDR_DETAILS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_REVENUE_CARD_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_MOSTPOPULAR_CUSTOMER_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab, dispatch])

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
