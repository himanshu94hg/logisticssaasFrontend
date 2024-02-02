import React, { useEffect } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery'; // Import jQuery
import 'datatables.net';
import './DataTable.css'

const DataTable = () => {
  useEffect(() => {
    // Initialize DataTable
    const table = $('#example').DataTable({
      columnDefs: [
        {
          targets: '_all',
          orderable: false, // Disable sorting for all columns
        },
      ],
    });

    return () => {
      // Cleanup on component unmount
      table.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <table id="example" className="display" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>AWB Number</th>
          <th>Order Details</th>
          <th>Customer Details</th>
          <th>Packaging Details</th>
          <th>Payment</th>
          {/* <th>Delivery Address</th>
          <th>Courier Partner</th>
          <th>Status</th>
          <th>Action</th>  */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tiger</td>
          <td>Nixon</td>
          <td>System Architect</td>
          <td>Edinburgh</td>
          <td>320800</td>
        </tr>
        <tr>
          <td>Garrett</td>
          <td>Winters</td>
          <td>Accountant</td>
          <td>Tokyo</td>
          <td>170750</td>
        </tr>
        
      </tbody>
    </table>
  );
};

export default DataTable;
