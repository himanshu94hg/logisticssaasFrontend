import React from 'react'
import { Col, Row } from 'react-bootstrap'
import EmpTotalInfo from '../Components/EmployeeDash/EmpTotalInfo'
import EmployeesPerformance from '../Components/EmployeeDash/EmployeesPerformance'
import RevenueByEmployees from '../Components/EmployeeDash/RevenueByEmployees'

const EmployeeDash = () => {
  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <EmployeesPerformance />
        </Col>
        <Col className="col-6 cardsSpace">
          <EmpTotalInfo />
        </Col>
        <Col className="col-3 cardsSpace">
          <RevenueByEmployees />
        </Col>
      </Row>
    </>
  )
}

export default EmployeeDash