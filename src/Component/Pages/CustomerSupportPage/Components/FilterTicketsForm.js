import React from 'react'
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const FilterTicketsForm = () => {
  const categories = [
    { value: '', label: 'Choose a Subcategory' },

    {
      label: 'Pickup & Delivery',
      options: [
        { value: 'delay_forward_delivery', label: 'Delay in Forward Delivery' },
        { value: 'delay_rto_delivery', label: 'Delay in RTO Delivery' },
        { value: 'delay_pickup', label: 'Delay in Pickup' },
        { value: 'lost_damaged_tracking', label: 'Shipment Showing as Lost/Damaged in Tracking' },
      ],
    },
    {
      label: 'Shipment NDR & RTO',
      options: [
        { value: 'undelivered_shipment', label: 'Issue Over Undelivered Shipment' },
        { value: 'mark_as_rto', label: 'Request to Mark Shipment as RTO' },
      ],
    },
    {
      label: 'Shipment Dispute',
      options: [
        { value: 'delivered_shipment', label: 'Issues with Delivered Shipment' },
        { value: 'weight_discrepancy', label: 'Issue Over Weight Discrepancy' },
      ],
    },
    {
      label: 'Finance',
      options: [
        { value: 'delay_cod_remittance', label: 'Delay in COD Remittance' },
        { value: 'hold_cod_remittance', label: 'Request to Hold COD Remittance' },
        { value: 'transfer_wallet_to_bank', label: 'Transfer Wallet Amount into My Bank Account' },
        { value: 'recharge_issue', label: 'Issue in Recharging Wallet' },
        { value: 'plan_upgrade_downgrade', label: 'Upgrade/Downgrade Shiprocket Plan' },
        { value: 'negative_wallet_balance', label: 'Wallet Showing Negative Balance' },
      ],
    },
    {
      label: 'KYC & Bank Verification',
      options: [
        { value: 'kyc_verification', label: 'Issues with KYC Verification' },
        { value: 'bank_verification_issue', label: 'Facing Issues in Verifying Bank Account Details' },
      ],
    },
    {
      label: 'International Shipping',
      options: [
        { value: 'general_enquiry', label: 'General Enquiry' },
      ],
    },
    {
      label: 'Technical Support',
      options: [
        { value: 'channel_api_integration', label: 'Issues With Channel & API Integration' },
        { value: 'order_management_issue', label: 'Issue In Managing Orders' },
        { value: 'cancellation_issue', label: 'Order/Shipment Cancellation' },
      ],
    },
    {
      label: 'Billing & Taxation',
      options: [
        { value: 'account_ledger_statement', label: 'Account Ledger Statement Needed' },
        { value: 'tds_form', label: 'TDS Form Required for Tax Return' },
        { value: 'invoice_issue', label: 'Issue with Invoice' },
        { value: 'help_with_gst', label: 'Need Help with GST' },
      ],
    },
    {
      label: 'Claims',
      options: [
        { value: 'refund_to_bank', label: 'Transfer Lost Shipment Refund to My Bank Account' },
        { value: 'amount_not_received', label: 'Amount Not Received for Lost Shipment' },
        { value: 'credit_note_details', label: 'Credit Note Details Required' },
        { value: 'claim_request', label: 'Request Claim for Secure Shipment' },
      ],
    },
    {
      label: 'Others',
      options: [
        { value: 'engage_services_issue', label: 'Issue with Engage Services' },
        { value: 'srf_services_issue', label: 'Issue with SRF services' },
        { value: 'direct_orders_issue', label: 'Issue with Direct orders' },
        { value: 'not_listed_issue', label: 'My Issue is Not Listed' },
        { value: 'not_listed_issue', label: 'My Issue is Not Listed' }, // Duplicate entry for 'not_listed_issue'
      ],
    },
  ];

  const handleChange = (selectedOption) => {
    console.log(`Selected option:`, selectedOption);
  };

  const StatusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'open', label: 'Open' },
    { value: 'wip', label: 'Work In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  const defaultDate = new Date();

  return (
    <section className="ticket-slider-body">
            
            <div className='ticket-filter-inputs'>
              <Select
                options={categories}
                onChange={handleChange}
                placeholder="Choose a Subcategory"
                isMulti // Enables multi-select
              />
              <Select
                options={StatusOptions}
                placeholder="Select Status"
              />
            </div>
            <hr />
            <div className='ticket-filter-inputs'>
              <div>
                <h6>Resolution Due By</h6>
                <div className="date-picker-container">
                  <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                  <DatePicker
                    selected={defaultDate}
                    dateFormat="MM/dd/yyyy"
                    className='input-field'
                  />
                </div>
              </div>
              <div>
                <h6>Last Updated</h6>
                <div className="date-picker-container">
                  <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                  <DatePicker
                    selected={defaultDate}
                    dateFormat="MM/dd/yyyy"
                    className='input-field'
                  />
                </div>
              </div>
            </div>

            <div className='mt-4 d-flex'>
              <button className='btn main-button-outline'>Reset</button>
              <button className='btn main-button ms-3'>Apply</button>
            </div>
        </section>
  )
}

export default FilterTicketsForm