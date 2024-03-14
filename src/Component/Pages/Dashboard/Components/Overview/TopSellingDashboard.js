import moment from "moment";
import React, { useEffect, } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { percentage } from "../../../../../customFunction/percentage";

function CustomTable({ data }) {

 const total=data.reduce((acc,data)=>acc+data.total,0) 

  return (
    <table className="custom-table w-100">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Product Name</th>
          <th>Revenue</th>
          <th>Delivered %</th>
          <th>RTO %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td title={product.product_name}>{product.product_name}</td>
            <td>{product.total}</td>
            <td>
              <span className="text-green">
                {percentage(product.total,total)}
              </span>
            </td>
            <td>  {percentage(product.total,total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TopSellingDashboard() {
  const dispatch = useDispatch()
  const endDate = moment(new Date()).format("YYYY-MM-DD")
  const startDate = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD"); 
  const { topSellCard } = useSelector(state => state?.dashboardOverviewReducer)

  useEffect(() => {
    dispatch({
      type: "DASHBOARD_OVERVIEW_TOPSELL_ACTION", payload: {
        start_date:startDate,
        end_date:endDate
      }
    })
  }, [])


  return (
    <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Top Selling Products</h4>
      </div>
      <div className="table-responsive">
        <CustomTable data={topSellCard} />
      </div>
    </div>
  );
}

export default TopSellingDashboard;
