
import React, { useState, useEffect } from "react";
import IndiaMap from '../../../../../assets/image/IndiaMap.png';
import IndiaMapp from "../../../../common/Graph/IndiaMapp";
import { useSelector } from "react-redux";

const WarehouseInformation = () => {
    const [stateAllocation, setStateAllocation] = useState([]);
    const [stateMapData, setStateMapData] = useState({})
    const { warehouseData } = useSelector(state => state?.dashboardOrderReducer)

    useEffect(() => {
        if (warehouseData) {
            const transformedData = warehouseData?.reduce((acc, item) => {
                acc[item.pickup_details__p_state] = {
                    sales: item.count,
                    value: item.pickup_details__p_state
                };
                return acc;
            }, {});
            setStateMapData(transformedData)
        }

    }, [warehouseData])

    return (
        <div className="box-shadow shadow-sm p10 state-wise-card">
            <div className="card-heading">
                <h4 className="title">Warehouse Information</h4>
                <p className="export-report">Export Report</p>
            </div>
            <IndiaMapp stateMapData={stateMapData} />
        </div>
    );
};

export default WarehouseInformation;
