import React, { useState } from 'react'
import ShippingChargesMIS from './Components/WeightRecoMIS.js';
import WeightRecoMIS from './Components/WeightRecoMIS.js';
import InvoiceMIS from './Components/InvoiceMIS.js';
import OnHoldRecoMIS from './Components/OnHoldRecoMIS.js';
import { useSelector } from 'react-redux';

const BillingTableMIS = ({ subType }) => {

    const {reportsBillingData}=useSelector(state=>state?.misSectionReducer)


    return (
        <>
            {
                subType === 'shipping_charges' ? (<ShippingChargesMIS />)
                    : subType === 'weight_reconciliation' ? (<WeightRecoMIS />)
                        : subType === 'remittance_logs' ? (<ShippingChargesMIS />)
                            : subType === 'onhold_reconciliation' ? (<OnHoldRecoMIS />)
                                : subType === 'invoices' ? (<InvoiceMIS />)
                                    : ''
            }
        </>
    )
}

export default BillingTableMIS