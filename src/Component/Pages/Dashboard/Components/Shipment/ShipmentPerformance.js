import React, { useState } from 'react';
import { DataGrid, Column, MasterDetail } from 'devextreme-react/data-grid';

const data = [
  { CounterItem: "FAT", Week1: 'FAT1', Week2: 'FAT2', Week3: 'FAT3', Week4: 'FAT4', Week5: 'FAT5', Factors: ['COD', 'Prepaid'] },
  { CounterItem: "FAD", Week1: 'FAD1', Week2: 'FAD2', Week3: 'FAD3', Week4: 'FAD4', Week5: 'FAD5', Factors: ['FactorA', 'FactorB'] },
  // Add similar data for other rows
];

const ShipmentPerformance = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const toggleRowExpansion = (rowKey) => {
    setExpandedRowKeys((prevExpandedRowKeys) => {
      if (prevExpandedRowKeys.includes(rowKey)) {
        // Row is expanded, so collapse it
        return prevExpandedRowKeys.filter((key) => key !== rowKey);
      } else {
        // Row is collapsed, so expand it
        return [...prevExpandedRowKeys, rowKey];
      }
    });
  };

  return (
    <DataGrid
      dataSource={data}
      showBorders={true}
      onRowClick={(e) => toggleRowExpansion(e.data.CounterItem)}
      keyExpr="CounterItem"
      columnAutoWidth={true}
    >
      {/* Define columns for the main grid */}
      <Column dataField="CounterItem" caption="Counter Item" />
      <Column dataField="Week1" caption="Week 1" />
      <Column dataField="Week2" caption="Week 2" />
      <Column dataField="Week3" caption="Week 3" />
      <Column dataField="Week4" caption="Week 4" />
      <Column dataField="Week5" caption="Week 5" />

      {/* MasterDetail component for showing additional information */}
      <MasterDetail
        enabled={true}
        component={AdditionalInfo}
      />
    </DataGrid>
  );
};

const AdditionalInfo = ({ data }) => (
    <div>
      {/* Additional information content */}
      <ul>
        {data && data.Factors ? (
          data.Factors.map((factor, index) => (
            <li key={index}>{factor}</li>
          ))
        ) : (
          <li>No additional factors available</li>
        )}
      </ul>
    </div>
  );
  

export default ShipmentPerformance;
