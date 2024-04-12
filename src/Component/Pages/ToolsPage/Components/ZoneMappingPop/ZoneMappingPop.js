import React, { useEffect, useRef, useState } from 'react';
import './ZoneMappingPop.css';
import { PiExport } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ZoneMappingPop = ({ setZoneMapping }) => {
  const dispatch = useDispatch();
  const popRef = useRef(null);
  const [pincode, setPincode] = useState('');
  const [zoneStatus, setZoneStatus] = useState(false);
  const { pathName } = useSelector(state => state?.authDataReducer);

  useEffect(() => {
    if (pathName === 'Zone Mapping') {
      setZoneStatus(true);
      setZoneMapping(true);
    }
  }, [pathName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target)) {
        setZoneMapping(false);
        setZoneStatus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setZoneMapping]);

  const exportToExcel = async () => {
    try {
      const response = await dispatch({ type: 'ZONE_MAPPING_ACTION', payload: pincode });
    } catch (error) {
      toast.error('Error exporting data: ' + error.message);
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
              <span className='rotate-180'><PiExport fontSize={25} /></span> Export
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ZoneMappingPop;
