import React from "react";
import { useSelector } from "react-redux";
import { BiSolidBadgeCheck } from "react-icons/bi";
import Cookies from 'js-cookie';
import { percentage } from "../../../../../customFunction/functionLogic";
import RatingStars from "../../../../common/RatingStars/RatingStars";
import { GoDownload } from "react-icons/go";


function PopularCustomerDashboard() {

  const token = Cookies.get("access_token")

  const { mostPopularCusData } = useSelector(state => state?.dashboardOverviewReducer)
  const total = mostPopularCusData.reduce((acc, data) => acc + data.count, 0)


  const exportOrders = async (OrderIDs) => {
    const payload = {
      order_tab: {
        type: "",
        subtype: ""
      },
      order_id: OrderIDs,
      courier: "",
      awb_number: "",
      min_awb_assign_date: "",
      max_awb_assign_date: "",
      status: "",
      order_type: "",
      customer_order_number: "",
      channel: "",
      min_invoice_amount: "",
      max_invoice_amount: "",
      warehouse_id: "",
      product_name: "",
      delivery_address: "",
      min_weight: "",
      max_weight: "",
      min_product_qty: "",
      max_product_qty: "",
      rto_status: false,
      global_type: "",
      payment_type: ""
    };

    try {
      const response = await fetch("https://app.shipease.in/orders-api/orders/export-order/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to export orders");

      const blob = await response.blob(); // 👈 Get the binary data
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = "orders_export.xlsx"; // 👈 Or .zip/.csv depending on what it returns
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error exporting orders:", error);
    }
  };


  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Most Popular Customers</h4>
      {mostPopularCusData?.map((customer, index) => (
        <ul key={index} className="d-flex justify-content-between align-items-center p0 list-none">
          <li>
            <div className="d-flex align-items-top justify-content-center">
              <div>
                <p className="mb-0 bold-600 font13 mr-5 text-truncate" style={{ maxWidth: '150px' }}>{customer.recipient_name}</p>
                <span className="font13 text-gray">
                  {customer.count} Purchases{" "}
                  <button style={{ marginTop: "-7px" }} className="btn py-0 px-1" onClick={() => exportOrders(customer?.order_id)}>
                    <GoDownload />
                  </button>
                </span>
              </div>
            </div>
          </li>
          <li className="w50">
            <div className="d-flex justify-content-between">
              <p className="font12 bold-600 mb-10"><RatingStars rating={4.5} /></p>
              <p className="font12 bold-600 mb-10">
                <span className="text-gray-light ">{percentage(customer.count, total)}</span>
              </p>
            </div>

            <div className="progress mb-15">
              <div
                className="progress-bar bg-sh-primary"
                role="progressbar"
                style={{ width: `${customer.rating_percentage}%` }}
                aria-valuenow={customer.rating_percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default PopularCustomerDashboard;
