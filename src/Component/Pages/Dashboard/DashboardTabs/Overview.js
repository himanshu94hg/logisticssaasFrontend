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
import OverviewStatusCard from '../Components/Overview/OverviewStatusCard';
import { useSelector } from 'react-redux';
import ShipmentGraph from '../Components/Overview/ShipmentGraph.js';

const Overview = ({ activeTab }) => {
  const dispatch = useDispatch()
  let authToken = Cookies.get("access_token")

  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  useEffect(() => {
    if (activeTab === "Overview" && authToken) {
      dispatch({ type: "DASHBOARD_OVERVIEW_SHIPMENTCARD_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_COUNTER_CARD_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_LAST_ORDERS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_TOPSELL_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_NDR_DETAILS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_COD_DETAILS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_RTO_DETAILS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_REVENUE_CARD_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_MOSTPOPULAR_CUSTOMER_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES_ACTION", payload: dateRangeDashboard })
    }
  }, [activeTab, dispatch])




  return (
    <Row className={`mb-3 ${screenWidthData < 992 && 'm-inline-1'}`}>
      <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
        <TotalShipment />
        <DeliveryPerformance />
        <StateSplitDashboard />
        <WeightDiscrepancies />
      </Col>
      <Col className="col-sm-12 col-lg-6 col-md-12 cardsSpace">
        <TotalInfoDashboard />
        {/* <OverviewDetails /> */}
        <OverviewStatusCard />
        <ShipmentGraph activeTab={activeTab} />
        <TopSellingDashboard />
        {/* <TableDashboard /> */}
      </Col>
      <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
        <RevenueDashboard />
        <CourierWiseDashboard />
        <PopularCustomerDashboard />
      </Col>
    </Row>
  );
};

export default Overview;
