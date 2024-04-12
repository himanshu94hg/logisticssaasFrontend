import React, { useEffect, useRef, useState } from 'react'
import './ZoneMappingPop.css'
import { PiExport } from "react-icons/pi";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ZoneMappingPop = ({ ZoneMapping, setZoneMapping }) => {
  const dispatch = useDispatch();
  const popRef = useRef(null);
  const [zoneData, setZoneData] = useState([])
  const [pincode, setPincode] = useState("")
  const [zoneStatus, setZoneStatus] = useState(false)
  const { zonePathName } = useSelector(state => state?.authDataReducer)

  useEffect(() => {
    if (zonePathName) {
      setZoneStatus(true)
      setZoneMapping(true)
    }
  }, [zonePathName]);


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setZoneMapping(false);
      setZoneStatus(false)
    }
  };

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
      <section ref={popRef} className={`zone-mapping-container ${zoneStatus ? '' : 'd-none'}`}>
        <h4>Zone Mapping</h4>
        <form action="">
          <div className='d-flex mt-4 gap-4 align-items-end justify-content-between'>
            <label style={{ width: '100%' }}>
              Pick-up Pincode
              <input className='input-field' type="text" placeholder='6 Digits Pick-up Area Pincode' onChange={(e) => setPincode(e.target.value)} />
            </label>
            <button type='button' className='btn main-button' onClick={exportToExcel}>
              <span className='rotate-180'><PiExport fontSize={25} onClick={() => setZoneMapping(false)} /></span> Export
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ZoneMappingPop