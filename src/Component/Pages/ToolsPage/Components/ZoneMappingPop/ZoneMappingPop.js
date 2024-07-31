import './ZoneMappingPop.css';
import { PiExport } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from 'react';

const ZoneMappingPop = ({ setZoneMapping }) => {
  const dispatch = useDispatch();
  const popRef = useRef(null);
  const [pincode, setPincode] = useState("")
  const [zoneStatus, setZoneStatus] = useState(false)
  const { zonePathName, pathName } = useSelector(state => state?.authDataReducer)

  useEffect(() => {
    if (zonePathName && pathName === "Zone Mapping") {
      setZoneStatus(true)
      setZoneMapping(true)
    }
  }, [zonePathName]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target)) {
        setZoneMapping(false);
        setZoneStatus(false);
        setPincode('')
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setZoneMapping]);


  const exportToExcel = () => {
    if (pincode == "") {
      toast.error("Please enter pincode!")
    } else {
      dispatch({ type: 'ZONE_MAPPING_ACTION', payload: pincode });
    }
    setZoneMapping(false)
    setZoneStatus(false)
    setPincode('')
  };

  return (
    <>
      <section ref={popRef} className={`zone-mapping-container ${zoneStatus && 'open'}`}>
        <h4>Zone Mapping</h4>
        <form action="">
          <div className='d-flex mt-4 gap-4 flex-column flex-md-row align-items-end justify-content-between'>
            <label style={{ width: '100%' }}>
              Pick-up Pincode
              <input className='input-field' type="text" placeholder='6 Digits Pick-up Area Pincode' onChange={(e) => setPincode(e.target.value)} />
            </label>
            <button type='button' className='btn main-button' onClick={exportToExcel} >
              <span className='rotate-180'   ><PiExport fontSize={25} /></span> Export
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ZoneMappingPop;
