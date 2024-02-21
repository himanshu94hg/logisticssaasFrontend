import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import '../Overview/totalInfoDashboard.css'
import DataTable from "../Overview/DataTable/DataTable";
import TableDashboard from '../Overview/TableDashboard'
import './TotalOrderInfo.css'
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import iconOrders from '../../../../../assets/image/icons/Orders_icon.png'

function TotalOrderInfo() {
  const[totalOrder,setTotalOrder] = useState(null);
  const[cancelOrder,setCancelOrder] = useState(null);
  const[totalDeveloper,setTotalDeveloper]=useState(null)
  const[totalRtoOrder,setTotalRtoOrder]=useState(null)
  
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const [totalorderResponse, cancelorderResponse, totaldeleverdResponse, totalrtoResponse] =
    //       await Promise.all([
    //         axios.get('http://65.2.38.87:8088/api/v1/totalorder/'),
    //         axios.get('http://65.2.38.87:8088/api/v1/totalcancelorder/'),
    //         axios.get('http://65.2.38.87:8088/api/v1/totaldeleverdorder/'),
    //         axios.get('http://65.2.38.87:8088/api/v1/totalrtoordercount/'),
    //       ]);

    //     setTotalOrder(totalorderResponse.data);
    //     setCancelOrder(cancelorderResponse.data);
    //     setTotalDeveloper(totaldeleverdResponse.data);
    //     setTotalRtoOrder(totalrtoResponse.data);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };

    // fetchData();
  }, []);
  return (
    <>
       <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg green-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconOrders} alt="iconOrders" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-no-wrap">Total Orders</p>
                    {totalOrder ? (
                      <h3 className="font20 title-text p-y bold-600 m0">{totalOrder.total_orders_count}</h3>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>
     

        {/* Card 2 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg yellow-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                  <img src={iconDelivery} alt="iconDelivery" width={24}/>

                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">Cancel Order</p>
                  <h3 className="font20 title-text p-y bold-600 m0">
                    {cancelOrder?.total_cancel_order_count} 
                    </h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon"/>
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg blue-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={iconDelivery} alt="iconDelivery" width={24}/>
                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">Yet To Pick</p>
                  <h3 className="font20 title-text p-y bold-600 m0">{totalDeveloper?.total_Delivered_order_count}</h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon" />
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg red-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={iconRTO} alt="iconRTO" width={24}/>
                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">Reverse Orders</p>
                  <h3 className="font20 title-text p-y bold-600 m0">
                    {totalRtoOrder?.total_return_to_origin_order_count}
                    </h3>
                </div>
                  <div className="col-2">
                  <HiTrendingDown className="trending-icon"/>
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <TableDashboard /> */}
      {/* <div className="mt-3 datatable-container">
        <h4 className="title">Last 30 Days Order</h4>
        <DataTable />
      </div> */}
    </>
  );
}

export default TotalOrderInfo;
