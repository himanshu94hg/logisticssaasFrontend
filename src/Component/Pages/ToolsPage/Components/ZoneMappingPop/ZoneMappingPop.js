import React, { useEffect } from 'react'
import './ZoneMappingPop.css'
import { PiExport } from "react-icons/pi";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ZoneMappingPop = (props) => {

  // const data = [
  //   { id: 1, name: 'John', age: 30 },
  //   { id: 2, name: 'Alice', age: 25 },
  //   { id: 3, name: 'Bob', age: 35 },
  // ];
  
  const dispatch=useDispatch();
  const {zoneMapping}=useSelector(state=>state?.toolsSectionReducer)


  useEffect(()=>{
    dispatch({type:"ZONE_MAPPING_ACTION",payload:"201310"})
  },[])

  const exportToExcel = () => {
   

    if(zoneMapping.length){
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(zoneMapping);
      const wb = { Sheets: { zoneMapping: ws }, SheetNames: ['zoneMapping'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const excelData = new Blob([excelBuffer], { type: fileType });
      saveAs(excelData, 'exported_data' + fileExtension);
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
              <input className='input-field' type="text" placeholder='6 Digits Pick-up Area Pincode' />
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