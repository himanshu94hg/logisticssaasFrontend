import React from 'react'
import { Col, Row } from 'react-bootstrap'
import TopSellingDashboard from '../Components/Overview/TopSellingDashboard'
import ChannelByOrder from '../Components/Orders/ChannelByOrder'
import TotalOrderInfo from '../Components/Orders/TotalOrderInfo'
import CancelOrder from '../Components/Orders/CancelOrder'
import BuyerDemographic from '../Components/Orders/BuyerDemographic'
import PrepaidCOD from '../Components/Orders/PrepaidCOD'
import TableDashboard from '../Components/Overview/TableDashboard'
import DomesticInternational from '../Components/Orders/DomesticInternational'
import BestSKU from '../Components/Orders/BestSKU'
import PopularOrdersLocation from '../Components/Orders/PopularOrdersLocation'
import WarehouseInformation from '../Components/Orders/WarehouseInformation'
import OrderDetails from '../Components/Orders/OrderDetails'
import ForwardReverseOrder from '../Components/Orders/ForwardReverseOrder'

const OrdersDashboard = () => {
  return (
    <>
      <Row>
        <Col className="col-3 cardsSpace">
          <ChannelByOrder />
          <OrderDetails />
          <WarehouseInformation />
        </Col>
        <Col className="col-6 cardsSpace">
          <TotalOrderInfo />
          <ForwardReverseOrder />
          <Row>
            <Col className='col-6'>
              <BestSKU />
            </Col>
            <Col className='col-6'>
              <DomesticInternational />
            </Col>
          </Row>
        </Col>
        <Col className="col-3 cardsSpace">
          <CancelOrder />
          <BuyerDemographic />
          <PrepaidCOD />
          <PopularOrdersLocation />
        </Col>
      </Row>
    </>
  )
}

export default OrdersDashboard