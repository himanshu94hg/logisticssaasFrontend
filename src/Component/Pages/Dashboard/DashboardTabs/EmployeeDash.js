import React from 'react'
import { Col, Row } from 'react-bootstrap'
import EmpTotalInfo from '../Components/EmployeeDash/EmpTotalInfo'
import EmployeesPerformance from '../Components/EmployeeDash/EmployeesPerformance'
import TeamDash from '../Components/EmployeeDash/TeamDash'
import AttendanceandPunctuality from '../Components/EmployeeDash/AttendanceandPunctuality'
import QualityMetrics from '../Components/EmployeeDash/QualityMetrics'
import ProductivityMetrics from '../Components/EmployeeDash/ProductivityMetrics'
import TaskCompletionRates from '../Components/EmployeeDash/TaskCompletionRates'

const EmployeeDash = () => {
  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <EmployeesPerformance />
          <AttendanceandPunctuality />
        </Col>
        <Col className="col-6 cardsSpace">
          <EmpTotalInfo />
          <QualityMetrics />
        </Col>
        <Col className="col-3 cardsSpace">
          <TaskCompletionRates />
          <ProductivityMetrics />
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col className="col-12 cardsSpace">
          <TeamDash />
        </Col>

      </Row>
    </>
  )
}

export default EmployeeDash