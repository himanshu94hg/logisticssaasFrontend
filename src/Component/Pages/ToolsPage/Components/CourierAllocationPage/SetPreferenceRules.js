import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import RuleRow from './RuleRow';
import './SetPreferenceRules.css'
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const SetPreferenceRules = () => {
    const [rules, setRules] = useState([]);
    const [rulePanel, setRulePanel] = useState(false)
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
        console.log(isActive)
    };

    useEffect(() => {
        const savedRules = JSON.parse(localStorage.getItem('rules'));
        if (savedRules) {
            setRules(savedRules);
        }
    }, []);

    const addRuleRow = () => {
        // const newRule = { id: Date.now() };
        // const updatedRules = [...rules, newRule];
        // setRules(updatedRules);
        // localStorage.setItem('rules', JSON.stringify(updatedRules));
        setRulePanel(true)
    };

    const deleteRuleRow = (id) => {
        const updatedRules = rules.filter(rule => rule.id !== id);
        setRules(updatedRules);
        localStorage.setItem('rules', JSON.stringify(updatedRules));
    };

    const handleSubmit = () => {
        setRules(1)
        setRulePanel(false)
    }

    return (
        <>
            <div className='set-of-rules'>
                <h4>Click on add button to add set of rules for courier preferences</h4>
            </div>
            <div className={`d-flex mt-2 ${rules.length === 0 ? '' : 'justify-content-end w-100'}`}>
                <button className='btn main-button' onClick={addRuleRow}><FontAwesomeIcon icon={faPlus} /> Add Rule</button>
            </div>
            {rules.length !== 0 &&
                <div className='create-rules-section'>
                    <div className='created-rules'>
                        <div className='rule-row'>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>AND</p>
                            </div>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>OR</p>
                            </div>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>AND</p>
                            </div>
                        </div>
                        <div className='rule-preference'>
                            <p>Preference 1: Courier 1</p>
                            <p>Preference 2: Courier 2</p>
                            <p>Preference 3: Courier 3</p>
                            <p>Preference 4: Courier 4</p>
                        </div>
                        <div className='rules-action-btn'>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    id="toggle"
                                    checked={isActive}
                                    onChange={handleToggle}
                                />
                                <label htmlFor="toggle" className={`toggle-label ${isActive ? 'checked' : ''}`}>
                                    <span className="toggle-inner" />
                                    <span className="toggle-switch" />
                                </label>
                            </div>
                            <div>
                                <button className='btn main-button'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button className='btn main-button ms-2'><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        </div>
                    </div>
                    <div className='created-rules'>
                        <div className='rule-row'>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>AND</p>
                            </div>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>OR</p>
                            </div>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>OR</p>
                            </div>
                        </div>
                        <div className='rule-preference'>
                            <p>Preference 1: Courier 1</p>
                            <p>Preference 2: Courier 2</p>
                            <p>Preference 3: Courier 3</p>
                            <p>Preference 4: Courier 4</p>
                        </div>
                        <div className='rules-action-btn'>
                            <button className='btn main-button'><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className='btn main-button ms-2'><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                    </div>
                    <div className='created-rules'>
                        <div className='rule-row'>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>AND</p>
                            </div>
                            <div className='rule-item'>
                                <p>Order Amount</p>
                                <p>Is</p>
                                <p>₹ 100</p>
                                <p className='rule-condition'>OR</p>
                            </div>
                        </div>
                        <div className='rule-preference'>
                            <p>Preference 1: Courier 1</p>
                            <p>Preference 2: Courier 2</p>
                            <p>Preference 3: Courier 3</p>
                            <p>Preference 4: Courier 4</p>
                        </div>
                        <div className='rules-action-btn'>
                            <button className='btn main-button'><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className='btn main-button ms-2'><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                    </div>
                </div>
            }



            {/* Add Rule Side Panel */}
            <section className={`add-rule-panel ${rulePanel ? 'open' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setRulePanel(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='edit-order-header'>
                    <div>
                        <h5 className='mb-0'>Create a rule to set preference for Courier!</h5>
                    </div>
                </section>
                <section className='ar-panel-body'>
                    <div className='rule-name-container'>
                        <label>
                            Rule Name
                            <input className='input-field' type="text" />
                        </label>

                        <label>
                            Set Priority for this rule
                            <select className='select-field' name="" id="">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </label>
                    </div>


                    <div style={{ width: '100%' }} className='mb-5'>
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
                    <div className='ar-items-scroll my-3 d-flex gap-3 flex-column'>
                        <RuleRow />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button onClick={handleSubmit} className='btn main-button'>Submit</button>
                    </div>
                </section>

            </section>
            <div onClick={() => setRulePanel(false)} className={`backdrop ${rulePanel ? 'd-block' : 'd-none'}`}></div>

        </>
    );
};

export default SetPreferenceRules;
