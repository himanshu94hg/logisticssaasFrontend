import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import TotalShipment from '../Components/Overview/TotalShipment';
import ShipmentGraph from '../Components/Overview/ShipmentGraph.js';
import RevenueDashboard from '../Components/Overview/RevenueDashboard';
// import { dateRangeDashboard } from '../../../../customFunction/dateRange';
import TotalInfoDashboard from '../Components/Overview/TotalInfoDashboard';
import OverviewStatusCard from '../Components/Overview/OverviewStatusCard';
import TopSellingDashboard from '../Components/Overview/TopSellingDashboard';
import DeliveryPerformance from '../Components/Overview/DeliveryPerformance';
import StateSplitDashboard from '../Components/Overview/StateSplitDashboard';
import WeightDiscrepancies from '../Components/Overview/WeightDiscrepancies';
import CourierWiseDashboard from '../Components/Overview/CourierWiseDashboard';
import PopularCustomerDashboard from '../Components/Overview/PopularCustomerDashboard';
import TicketsChart from '../Components/Overview/TicketsChart.js';
import NonActiveService from '../Components/NonActiveService/NonActiveService.js';
import { getDateRangeDashboard } from '../../../../customFunction/getDateRangeDashboard/index.js';
import {
  DUMMY_SHIPMENT_CARD,
  DUMMY_COUNTER_CARD,
  DUMMY_COD_DETAILS,
  DUMMY_NDR_DETAILS,
  DUMMY_RTO_DETAILS,
  DUMMY_REVENUE_CARD,
  DUMMY_LAST_ORDERS,
  DUMMY_TOP_SELL,
  DUMMY_STATEWISE_DATA,
  DUMMY_COURIER_WISE,
  DUMMY_MOST_POPULAR_CUSTOMERS,
  DUMMY_DELIVERY_PERFORMANCE,
  DUMMY_WEIGHT_DISCREPANCIES,
} from '../../../../mockData/dashboardDummyData';
import {
  GET_DASHBOARD_OVERVIEW_SHIPMENTCARD_DATA,
  GET_DASHBOARD_OVERVIEW_COD_DETAILS_DATA,
  GET_DASHBOARD_OVERVIEW_NDR_DETAILS_DATA,
  GET_DASHBOARD_OVERVIEW_RTO_DETAILS_DATA,
  GET_DASHBOARD_OVERVIEW_LAST_ORDERS_DATA,
  GET_DASHBOARD_OVERVIEW_REVENUE_CARD_DATA,
  GET_DASHBOARD_OVERVIEW_COUNTER_CARD_DATA,
  GET_DASHBOARD_OVERVIEW_TOPSELL_DATA,
  GET_DASHBOARD_OVERVIEW_STATEWISE_DATA,
  GET_DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_DATA,
  GET_DASHBOARD_OVERVIEW_MOST_POPULAR_CUSTOMER_DATA,
  GET_DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_DATA,
  GET_DASHBOARD_OVERVIEW_WEIGHT_DISPENCERY_DATA,
} from '../../../../redux/constants/dashboard/overview';

const Overview = ({ activeTab }) => {
  const dispatch = useDispatch()
  let authToken = Cookies.get("access_token")
  const { screenWidthData, planStatusData } = useSelector(state => state?.authDataReducer)

  const dateRange = useSelector((state) => state.dateRange);
  const dateRangeDashboard = getDateRangeDashboard(dateRange);
  const isLocalBypass = process.env.REACT_APP_BYPASS_LOGIN === 'true';

  useEffect(() => {
    if (activeTab === "Overview" && authToken) {
      if (isLocalBypass) {
        // Inject dummy data directly for local showcase
        dispatch({ type: GET_DASHBOARD_OVERVIEW_SHIPMENTCARD_DATA, payload: DUMMY_SHIPMENT_CARD });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_COUNTER_CARD_DATA, payload: DUMMY_COUNTER_CARD });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_COD_DETAILS_DATA, payload: DUMMY_COD_DETAILS });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_NDR_DETAILS_DATA, payload: DUMMY_NDR_DETAILS });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_RTO_DETAILS_DATA, payload: DUMMY_RTO_DETAILS });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_LAST_ORDERS_DATA, payload: DUMMY_LAST_ORDERS });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_REVENUE_CARD_DATA, payload: DUMMY_REVENUE_CARD });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_TOPSELL_DATA, payload: DUMMY_TOP_SELL });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: DUMMY_STATEWISE_DATA });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_DATA, payload: DUMMY_COURIER_WISE });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_MOST_POPULAR_CUSTOMER_DATA, payload: DUMMY_MOST_POPULAR_CUSTOMERS });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_DATA, payload: DUMMY_DELIVERY_PERFORMANCE });
        dispatch({ type: GET_DASHBOARD_OVERVIEW_WEIGHT_DISPENCERY_DATA, payload: DUMMY_WEIGHT_DISCREPANCIES });
      } else {
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
    }
  }, [activeTab, dispatch, dateRangeDashboard, authToken, isLocalBypass])


  return (
    <Row className={`mb-3 ${screenWidthData < 992 && 'm-inline-1'} position-relative`}>
      {!isLocalBypass && !planStatusData?.analytics_dashboard && <NonActiveService />}

      <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
        <TotalShipment />
        <DeliveryPerformance />
        <StateSplitDashboard />
        <PopularCustomerDashboard />
      </Col>
      <Col className="col-sm-12 col-lg-6 col-md-12 cardsSpace">
        <TotalInfoDashboard />
        <OverviewStatusCard />
        <ShipmentGraph activeTab={activeTab} />
        <TopSellingDashboard />
      </Col>
      <Col className="col-sm-12 col-lg-3 col-md-6 cardsSpace">
        <RevenueDashboard />
        <WeightDiscrepancies />
        <CourierWiseDashboard />
        <TicketsChart />
      </Col>
    </Row>
  );
};

export default Overview;
