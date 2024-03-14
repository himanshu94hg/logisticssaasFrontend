import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import BestSKU from '../Components/Orders/BestSKU'
import PrepaidCOD from '../Components/Orders/PrepaidCOD'
import CancelOrder from '../Components/Orders/CancelOrder'
import { dateRangeDashboard } from '../../../../customFunction/dateRange'
import OrderDetails from '../Components/Orders/OrderDetails'
import ChannelByOrder from '../Components/Orders/ChannelByOrder'
import TotalOrderInfo from '../Components/Orders/TotalOrderInfo'
import BuyerDemographic from '../Components/Orders/BuyerDemographic'
import ForwardReverseOrder from '../Components/Orders/ForwardReverseOrder'
import WarehouseInformation from '../Components/Orders/WarehouseInformation'
import DomesticInternational from '../Components/Orders/DomesticInternational'
import PopularOrdersLocation from '../Components/Orders/PopularOrdersLocation'


const OrdersDashboard = ({ activeTab }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (activeTab === "Orders") {
      dispatch({ type: "DASHBOARD_ORDERS_STORE_BASED_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_ORDERS_COUNT_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_ORDERS_CANCELLED_ACTION", payload: dateRangeDashboard })
      dispatch({ type: "DASHBOARD_ORDERS_MPS_ACTION", payload: dateRangeDashboard })
      dispatch({ type: 'DASHBOARD_ORDERS_BUYER_DEMOGRAPHIC_ACTION', payload: dateRangeDashboard })
      dispatch({ type: 'DASHBOARD_ORDERS_PREPAID_COD_ACTION', payload: dateRangeDashboard })
      dispatch({ type: 'DASHBOARD_ORDERS_WAREHOUSE_INFO_ACTION', payload: dateRangeDashboard })
      dispatch({ type: 'DASHBOARD_ORDERS_SKU_PROJECT_ACTION', payload:dateRangeDashboard })
    }
  }, [activeTab])


  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <ChannelByOrder />
          <OrderDetails />
          <WarehouseInformation />
        </Col>
        <Col className="col-6 cardsSpace">
          <TotalOrderInfo />
          <ForwardReverseOrder />
          <BestSKU />
        </Col>
        <Col className="col-3 cardsSpace">
          <CancelOrder />
          <BuyerDemographic />
          <PrepaidCOD />
          <PopularOrdersLocation />
          <DomesticInternational />
        </Col>
      </Row>
    </>
  )
}

export default OrdersDashboard