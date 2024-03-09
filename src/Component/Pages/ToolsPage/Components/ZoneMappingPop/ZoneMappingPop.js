import React, { useEffect, useState } from 'react'
import './ZoneMappingPop.css'
import { PiExport } from "react-icons/pi";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ZoneMappingPop = (props) => {
  const dispatch=useDispatch();
  const [zoneData,setZoneData]=useState([])
  const [pincode,setPincode]=useState("")
  const {zoneMapping}=useSelector(state=>state?.toolsSectionReducer)


  const data=[
    {
      name:"Sanjeev"
    }
  ]

  const exportToExcel = async () => {
    try {
      const response = await dispatch({ type: "ZONE_MAPPING_ACTION", payload: pincode });
      // const exportData = data; 
      // const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      // const fileExtension = '.xlsx';
      // const ws = XLSX.utils.json_to_sheet(exportData);
      // const wb = { Sheets: { zoneMapping: ws }, SheetNames: ['zoneMapping'] };
      // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      // const excelData = new Blob([excelBuffer], { type: fileType });
      // saveAs(excelData, 'exported_data' + fileExtension);
    } catch (error) {
      // toast.error('Error exporting data:', error);
    }
    
  };



  return (
    <>
      <section className={`zone-mapping-container ${props.ZoneMapping ? '' : 'd-none'}`}>
        <h4>Zone Mapping</h4>
        <form action="">
          <div className='d-flex mt-4 gap-4 align-items-end justify-content-between'>
            <label style={{ width: '100%' }}>
              Pick-up Pincode
              <input className='input-field' type="text"  placeholder='6 Digits Pick-up Area Pincode' onChange={(e)=>setPincode(e.target.value)} />
            </label>
            <button type='button' className='btn main-button'  onClick={exportToExcel}>
              <span className='rotate-180'><PiExport fontSize={25} /></span> Export
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ZoneMappingPop