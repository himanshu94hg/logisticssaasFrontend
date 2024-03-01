import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import RuleRow from './RuleRow';

const SetPreferenceRules = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const savedRules = JSON.parse(localStorage.getItem('rules'));
        if (savedRules) {
            setRules(savedRules);
        }
    }, []);

    const addRuleRow = () => {
        const newRule = { id: Date.now() };
        const updatedRules = [...rules, newRule];
        setRules(updatedRules);
        localStorage.setItem('rules', JSON.stringify(updatedRules));
    };

    const deleteRuleRow = (id) => {
        const updatedRules = rules.filter(rule => rule.id !== id);
        setRules(updatedRules);
        localStorage.setItem('rules', JSON.stringify(updatedRules));
    };

    return (
        <>
            <div className='set-of-rules'>
                {rules.length === 0 ? (
                    <p>Click on add button to add set of rules for courier preferences</p>
                ) : (
                    rules.map((rule) => (
                        <div className='major-rule-row' key={rule.id}>
                            <div className='d-flex'>
                                <div style={{ width: '100%' }} className='px-2'>
                                    <div className='d-flex gap-3 mb-3'>
                                        <label>
                                            Rule Name
                                            <input className='input-field' type="text" />
                                        </label>
                                        <label>
                                            Rule Priority
                                            <input className='input-field' type="text" />
                                        </label>
                                    </div>
                                    <div className='my-3 d-flex gap-2 flex-column'>
                                        <RuleRow />
                                    </div>
                                </div>
                                <div style={{ width: '100%' }} className='px-2'>
                                    <div className='priority-container'>
                                        {[1, 2, 3, 4].map(priority => (
                                            <label key={priority}>
                                                Priority {priority}
                                                <select
                                                    className='select-field'
                                                    name=""
                                                    id=""
                                                >
                                                    <option value="">Select Partner</option>
                                                    <option value="shadow_fax">Shadowfax</option>
                                                    <option value="delhivery_surface">Delhivery</option>
                                                    <option value="dtdc_surface">DTDC</option>
                                                    <option value="xpressbees_surface">Xpressbees A</option>
                                                    <option value="xpressbees_surface_1kg">XpressBees 1 KG</option>
                                                    <option value="xpressbees_surface_10kg">XpressBees 10 KG</option>
                                                    <option value="xpressbees_surface_3kg">XpressBees 3 KG</option>
                                                    <option value="xpressbees_surface_5kg">XpressBees 5 KG</option>
                                                    <option value="xpressbees_sfc">XpressBees</option>
                                                    <option value="dtdc_10kg">DTDC 10 KG</option>
                                                    <option value="ecom_express">Ecom Express</option>
                                                    <option value="amazon_swa_1kg">Amazon SWA Surface</option>
                                                    <option value="amazon_swa_3kg">Amazon SWA 3 KG</option>
                                                    <option value="amazon_swa_5kg">Amazon SWA 5 KG</option>
                                                    <option value="amazon_swa_10kg">Amazon SWA 10 KG</option>
                                                    <option value="delhivery_surface_2kg">Delhivery 2 KG</option>
                                                    <option value="delhivery_surface_5kg">Delhivery_5KG</option>
                                                    <option value="delhivery_surface_10kg">Delhivery 5 KG</option>
                                                    <option value="delhivery_surface_20kg">Delhivery 10 KG</option>
                                                    <option value="ecom_express_3kg">Ecom Express 3 KG</option>
                                                    <option value="dtdc_3kg">DTDC 3 KG</option>
                                                    <option value="dtdc_5kg">DTDC 5 KG</option>
                                                    <option value="bluedart">BlueDart Air</option>
                                                    <option value="smartr">Smartrlogistics</option>
                                                    <option value="ekart">Ekart Logistics</option>
                                                    <option value="ekart_2kg">Ekart 2KG</option>
                                                    <option value="dtdc_1kg">DTDC 1KG</option>
                                                    <option value="shree_maruti_ecom">SMC</option>
                                                    <option value="ekart_1kg">Ekart 1KG</option>
                                                    <option value="delhivery_air">Delhivery A</option>
                                                    <option value="xindus">ShipEase Cross Border</option>
                                                    <option value="shree_maruti_ecom_1kg">SMC 1KG</option>
                                                    <option value="movin">Movin 10 KG</option>
                                                    <option value="movin_a">Movin A 2 KG</option>
                                                    <option value="bluedart_surface">BlueDart Surface</option>
                                                    <option value="delhivery_lite">Delhivery Lite</option>
                                                    <option value="ecom_express_rvp">EcomEx ROS</option>
                                                    <option value="ecom_express_3kg_rvp">EcomEx 3KG ROS</option>
                                                    <option value="tpc_surface">The Professional Courier</option>
                                                    <option value="tpc_1kg">The Professional Courier 1KG</option>
                                                    <option value="pick_del">Pikndel</option>
                                                </select>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className='d-flex align-items-end'>
                                    <button className='btn delete-btn' onClick={() => deleteRuleRow(rule.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className={`d-flex mt-4 ${rules.length === 0 ? '' : 'justify-content-end w-100'}`}>
                <button className='btn main-button' onClick={addRuleRow}>Add Rule</button>
            </div>
        </>
    );
};

export default SetPreferenceRules;
