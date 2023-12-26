import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import Col from "react-bootstrap/Col";

function RevenueDashboard() {

  const filter = ["1D", "1W", "1M", "3M", "6M", "1Y"];
  const [revenueAnalytic, setRevenueAnalytic] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState("1D");
  const [totalRevenveCourier, setTotalRevenueAnalytic] = useState(null);
  const [totalRevenveShipment, setTotalRevenueShipment] = useState(null);
  const [totalRevenveWithinTat, setTotalRevenueWithinTat] = useState(null);
  const [totalRevenveWithOutTat, setTotalRevenueWithoutTat] = useState(null);
  const [totalRevenveCodWithinTat, setTotalRevenueCodWithinTat] = useState(null);
  const [totalRevenveCodWithOutTat, setTotalRevenueCodWithOutTat] = useState(null);
  const [totalData, setTotalData] = useState(null);

  const requestData = {
    sellerId: "150",
    start: "",
    end: "",
  };

  // const dataItems = [
  //   { label: 'Courier Revenue', color: 'bg-red-light text-red', icon: <AiOutlineArrowUp className="font15" />, value: totalRevenveCourier, analyticKey: 'courier_revenue' },
  //   { label: 'Shipment Amount', color: 'bg-green-light text-green', icon: <AiOutlineArrowUp className="text-white font15" />, value: totalRevenveShipment, analyticKey: 'shipment_amount' },
  //   { label: 'Prepaid Within Tat', color: 'bg-blue-light text-blue', icon: <AiOutlineArrowUp className="text-white font15" />, value: totalRevenveWithinTat, analyticKey: 'prepaid_within_tat' },
  //   { label: 'Prepaid Without Tat', color: 'bg-purple-light text-purple', icon: <AiOutlineArrowUp className="text-white font15" />, value: totalRevenveWithOutTat, analyticKey: 'prepaid_without_tat' },
  //   { label: 'COD Within tat', color: 'bg-sky-light text-aqua', icon: <AiOutlineArrowUp className="text-white font15" />, value: totalRevenveCodWithinTat, analyticKey: 'cod_within_tat' },
  //   { label: 'COD Without tat', color: 'bg-purple-light', icon: <AiOutlineArrowUp className="text-white font15" />, value: totalRevenveCodWithOutTat, analyticKey: 'cod_without_tat' },
  // ];
  useEffect(() => {
    const currentDate = new Date();
    let startDate, endDate;

    switch (selectedInterval) {
      case "1D":
        startDate = currentDate.toISOString().split('T')[0];
        endDate = startDate;
        break;
      case "1W":
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        startDate = oneWeekAgo.toISOString().split('T')[0];
        endDate = currentDate.toISOString().split('T')[0];
        break;
      case "1M":
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        startDate = oneMonthAgo.toISOString().split('T')[0];
        endDate = currentDate.toISOString().split('T')[0];
        break;
      case "3M":
        const threeMonthsAgo = new Date(currentDate);
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        startDate = threeMonthsAgo.toISOString().split('T')[0];
        endDate = currentDate.toISOString().split('T')[0];
        break;
      case "6M":
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        startDate = sixMonthsAgo.toISOString().split('T')[0];
        endDate = currentDate.toISOString().split('T')[0];
        break;
      case "1Y":
        const oneYearAgo = new Date(currentDate);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        startDate = oneYearAgo.toISOString().split('T')[0];
        endDate = currentDate.toISOString().split('T')[0];
        break;
      default:
        break;
    }

    requestData.start = startDate;
    requestData.end = endDate;

    axios
      .post(
        "https://www.shipease.in/api/microservices/dashboard/overview/revenue-analytics",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setRevenueAnalytic(response.data.data);
        if (response.data.data) {
          const newRevenueAnalytic = response.data.data;
          const totalRevenue = newRevenueAnalytic.courier_revenue + newRevenueAnalytic.shipment_amount + newRevenueAnalytic.prepaid_within_tat + newRevenueAnalytic.prepaid_without_tat + newRevenueAnalytic.cod_within_tat + newRevenueAnalytic.cod_without_tat;
          const courier_revenue = newRevenueAnalytic.courier_revenue * 100 / totalRevenue;
          const shipment_amount = newRevenueAnalytic.shipment_amount * 100 / totalRevenue;
          const prepaid_within_tat = newRevenueAnalytic.prepaid_within_tat * 100 / totalRevenue;
          const prepaid_without_tat = newRevenueAnalytic.prepaid_without_tat * 100 / totalRevenue;
          const cod_within_tat = newRevenueAnalytic.cod_within_tat * 100 / totalRevenue;
          const cod_without_tat = newRevenueAnalytic.cod_without_tat * 100 / totalRevenue;
          setTotalRevenueAnalytic(courier_revenue.toFixed(2));
          setTotalRevenueShipment(shipment_amount.toFixed(2));
          setTotalRevenueWithinTat(prepaid_within_tat.toFixed(2));
          setTotalRevenueWithoutTat(prepaid_without_tat.toFixed(2));
          setTotalRevenueCodWithinTat(cod_within_tat.toFixed(2));
          setTotalRevenueCodWithOutTat(cod_without_tat.toFixed(2));
          setTotalData(totalRevenue);
        }
      })
      .catch((error) => {
        console.error(error);
        setRevenueAnalytic(null);
      });
  }, [selectedInterval]);


  return (
    <div className="box-shadow shadow-sm p10">

      {/* old code */}

      <div className="row">
        <div className="col">
          <h4 className="title">Revenue Analytics</h4>
          <div className="btn-group d-flex" role="group" aria-label="Basic example">
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1D" ? "active" : ""}`} onClick={() => setSelectedInterval("1D")}>1D</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1W" ? "active" : ""}`} onClick={() => setSelectedInterval("1W")}>1W</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1M" ? "active" : ""}`} onClick={() => setSelectedInterval("1M")}>1M</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "3M" ? "active" : ""}`} onClick={() => setSelectedInterval("3M")}>3M</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "6M" ? "active" : ""}`} onClick={() => setSelectedInterval("6M")}>6M</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1Y" ? "active" : ""}`} onClick={() => setSelectedInterval("1Y")}>1Y</button>
          </div>
        </div>
      </div>
      {/* <div className="">
        <h4 className="title">Revenue Analytics</h4>
        <div className="btn-group d-flex py-2" role="group" aria-label="Basic example">
          {filter.map((interval) => (
            <button
              key={interval}
              type="button"
              className={`btn btn-primary tab-btn-ui ${selectedInterval === interval ? "active" : ""}`}
              onClick={() => setSelectedInterval(interval)}
            >
              {interval}
            </button>
          ))}
        </div>
      </div> */}

      {/* old code  */}

      <ul className="list-ui mt20">
        <li className="bg-red-light text-red">
          <p>Courier Revenue</p>
          <p className="text-red">
            <AiOutlineArrowUp className=" font15" /> {totalRevenveCourier}%
          </p>
          <p className="text-red">{revenueAnalytic?.courier_revenue}</p>
        </li>

        <li className="bg-green-light text-green">
          <p>Shipment Amount</p>
          <p>
            <AiOutlineArrowUp className=" font15" /> {totalRevenveShipment}%
          </p>
          <p>{revenueAnalytic?.shipment_amount}</p>
        </li>

        <li className="bg-blue-light text-blue">
          <p>Prepaid Within Tat</p>
          <p>
            <AiOutlineArrowUp className=" font15" /> {totalRevenveWithinTat}%
          </p>
          <p>{revenueAnalytic?.prepaid_within_tat}</p>
        </li>

        <li className="bg-purple-light text-purple">
          <p>Prepaid Without Tat</p>
          <p>
            <AiOutlineArrowUp className=" font15" /> {totalRevenveWithOutTat}%
          </p>
          <p>{revenueAnalytic?.prepaid_without_tat}</p>
        </li>
        <li className="bg-sky-light text-aqua">
          <p>COD Within tat</p>
          <p>
            <AiOutlineArrowUp className=" font15" /> {totalRevenveCodWithinTat}%
          </p>
          <p>{revenueAnalytic?.cod_within_tat}</p>
        </li>
        <li className="bg-purple-light">
          <p>COD Without tat</p>
          <p>
            <AiOutlineArrowUp className=" font15" /> {totalRevenveCodWithOutTat}%
          </p>
          <p>{revenueAnalytic?.cod_without_tat}</p>
        </li>
        <li>
          <p></p>
          <p><AiOutlineArrowUp className="text-white font30" /></p>
          <p>{totalData !== null ? totalData.toFixed(2) : 'N/A'}</p>
        </li>
      </ul>
      {/* <ul className="list-ui mt20">
        {dataItems.map((item, index) => (
          <li key={index} className={item.color}>
            <p>{item.label}</p>
            <p className="d-flex m-1">
              {item.icon} {item.value}%
            </p>
            <p>{revenueAnalytic?.[item.analyticKey]}</p>
          </li>
        ))}
        <li>
          <p></p>
          <p><AiOutlineArrowUp className="text-white font30" /></p>
          <p>{totalData !== null ? totalData.toFixed(2) : 'N/A'}</p>
        </li>
      </ul> */}
    </div>
  );
}

export default RevenueDashboard;
