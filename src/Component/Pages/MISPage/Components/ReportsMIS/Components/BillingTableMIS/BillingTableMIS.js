import React, { useState } from 'react'
import moment from 'moment'
import InfoIcon from '../../../../../../common/Icons/InfoIcon'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShippingChargesMIS from './Components/WeightRecoMIS.js';
import WeightRecoMIS from './Components/WeightRecoMIS.js';

const BillingTableMIS = ({ subType }) => {



    return (
        <>
            {
                subType === 'shipping_charges' ? (<ShippingChargesMIS />)
                    : subType === 'weight_reconciliation' ? (<WeightRecoMIS />)
                        : subType === 'remittance_logs' ? (<ShippingChargesMIS />)
                            : subType === 'onhold_reconciliation' ? (<ShippingChargesMIS />)
                                : subType === 'invoices' ? (<ShippingChargesMIS />)
                                    : ''
            }
        </>
    )
}

export default BillingTableMIS