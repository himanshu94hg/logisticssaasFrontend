import React from 'react'
import NavTabs from './navTabs/NavTabs'
import HomeIcon from './Icons/HomeIcon'
import './OrdersPage.css'
import InternationalIcon from './Icons/InternationalIcon'
import Form from 'react-bootstrap/Form';

const OrdersPage = () => {
    return (
        <>
            <section className='w-100 box-shadow shadow-sm p7 bg-light orders-menu-header'>
                <div className='d-flex justify-content-between'>
                    <Form.Select aria-label="Default select example">
                        <option value="1">Domestic</option>
                        <option value="2">International</option>
                    </Form.Select>
                    <div>new import sync</div>
                </div>
            </section>


            <NavTabs />
        </>
    )
}

export default OrdersPage