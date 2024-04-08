import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import RuleRow from './RuleRow';
import './SetPreferenceRules.css';

const SetPreferenceRules = () => {
    const dispatch = useDispatch();
    const [rulePanel, setRulePanel] = useState(false);
    const [ruleName, setRuleName] = useState('');
    const [priority, setPriority] = useState('');
    const [selectedPartners, setSelectedPartners] = useState(Array(4).fill(''));
    const [conditions, setConditions] = useState([]);
    const [editingRuleId, setEditingRuleId] = useState(null);
    const [isActive, setIsActive] = useState([]);
    const [allRules, setAllRules] = useState([]);

    const courierRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleData);
    const courierEditRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleEditData);

    useEffect(() => {
        if (courierRules?.data) {
            setAllRules(courierRules.data);
            initializeIsActiveState(courierRules.data);
        }
    }, [courierRules]);

    const initializeIsActiveState = (rules) => {
        const initialActiveState = rules.map(rule => rule.status);
        setIsActive(initialActiveState);
    };

    const handleToggle = (index, id) => {
        const newIsActive = [...isActive];
        newIsActive[index] = !newIsActive[index];
        setIsActive(newIsActive);
        dispatch({ type: "COURIER_ALLOCATION_RULE_STATUS_ACTION", payload: { togglestatus: newIsActive[index], id: id } });
    };

    const addRuleRow = () => {
        setRulePanel(true);
        setEditingRuleId(null);
        setRuleName('');
        setPriority('');
        setSelectedPartners(Array(4).fill(''));
        setConditions([]);
        dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
    };

    const editRuleRow = (id) => {
        setRulePanel(true);
        setEditingRuleId(id);
        dispatch({ type: "COURIER_ALLOCATION_RULE_EDIT_ACTION", payload: id });
    };

    useEffect(() => {
        if (editingRuleId && courierEditRules && courierEditRules.data) {
            const rule = courierEditRules.data;
            setRuleName(rule.rule_name);
            setPriority(rule.priority);
            setSelectedPartners([rule.priority_1, rule.priority_2, rule.priority_3, rule.priority_4]);
            if (rule.preference_choices && Array.isArray(rule.preference_choices)) {
                setConditions(rule.preference_choices.map(condition => ({
                    condition: condition.condition_type,
                    condition_type: condition.criteria,
                    match_type: condition.match_type,
                    match_value: condition.match_value
                })));
            } else {
                setConditions([]);
            }
        }
    }, [editingRuleId, courierEditRules]);

    const handleRuleDelete = (id) => {
        if (id !== null) {
            const updatedRules = allRules.filter(rule => rule.id !== id);
            setAllRules(updatedRules);
            dispatch({ type: "COURIER_ALLOCATION_RULE_DELETE_ACTION", payload: id });
        }
    };
    

    const handleSubmit = () => {
        const requestData = {
            rule_name: ruleName,
            priority: priority,
            priority_1: selectedPartners[0],
            priority_2: selectedPartners[1],
            priority_3: selectedPartners[2],
            priority_4: selectedPartners[3],
            rules: conditions.map(condition => ({
                condition: condition.condition,
                condition_type: condition.condition_type,
                match_type: condition.match_type,
                match_value: condition.match_value
            }))
        };

        if (editingRuleId) {
            dispatch({ type: "COURIER_ALLOCATION_RULE_EDIT_POST_ACTION", payload: { id: editingRuleId, requestData } });
        } else {
            dispatch({ type: "COURIER_ALLOCATION_RULE_POST_ACTION", payload: requestData });
        }
        dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
        setRulePanel(false);
    };

    useEffect(() => {
        dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
    }, [dispatch]);

    const handlePartnerChange = (index, value) => {
        const updatedPartners = [...selectedPartners];
        updatedPartners[index] = value;
        setSelectedPartners(updatedPartners);
    };

    const handlePriorityChange = (e) => {
        const selectedValue = e.target.value;
        setPriority(selectedValue);
    };

    const priorityOptions = Array.from({ length: allRules.length + 1 }, (_, index) => ({
        value: index + 1
    }));

    return (
        <>
            <div className='set-of-rules'>
                <p>Create Custom Courier Allocation Rules for Efficient Delivery Management.</p>
            </div>
            <div className={`d-flex mt-2 ${courierRules?.length === 0 ? '' : 'justify-content-end w-100'}`}>
                <button className='btn main-button' onClick={addRuleRow}><FontAwesomeIcon icon={faPlus} /> Add Rule</button>
            </div>
            <div className='create-rules-section'>
                {allRules?.map((rule, index) => (
                    <div key={index} className='created-rules'>
                        <div className='cr-rule-name'>
                            <div className='rule-name'>
                                <p>Rule Name: {rule?.rule_name}</p>
                                <p>Priority: #{rule?.priority}</p>
                            </div>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    id={`toggle-${index}`}
                                    checked={isActive[index]}
                                    onChange={() => handleToggle(index, rule?.id)}
                                />
                                <label htmlFor={`toggle-${index}`} className={`toggle-label ${isActive[index] ? 'checked' : ''}`}>
                                    <span className="toggle-inner" />
                                    <span className="toggle-switch" />
                                </label>
                            </div>

                        </div>
                        <div className='cr-rule-conditions'>
                            <div className='rule-row text-capitalize'>
                                {rule?.preference_choices?.map((condition, index) => (

                                    <div key={index} className='rule-item'>
                                        {console.log(index, "this is rule data", index, condition)}
                                        <p>{condition.criteria}</p>
                                        <p>{condition.match_type}</p>
                                        <p className={`${rule?.preference_choices.length < 2 ? 'match-value-item' : ''}`}>{condition.match_value}</p>
                                        <p className="rule-condition">{condition.condition_type}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='rule-preference text-capitalize'>
                                <p>Preference 1: {rule?.priority_1}</p>
                                <p>Preference 2: {rule?.priority_2}</p>
                                <p>Preference 3: {rule?.priority_3}</p>
                                <p>Preference 4: {rule?.priority_4}</p>
                            </div>
                            <div className='rules-action-btn'>
                                <button className='btn main-button' onClick={() => editRuleRow(rule?.id)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button className='btn main-button ms-2' onClick={() => handleRuleDelete(rule?.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
                            <input className='input-field' type="text" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
                        </label>

                        <label>
                            Set Priority for this rule
                            <select className='select-field' value={priority} onChange={(e) => handlePriorityChange(e)}>
                                <option value="">Select Priority</option>
                                {priorityOptions?.map(option => (
                                    <option key={option?.value} value={option?.value}>{option?.value}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div style={{ width: '100%' }} className='mb-5'>
                        <div className='priority-container'>
                            {[1, 2, 3, 4].map((priority, index) => (
                                <label key={priority}>
                                    Priority {priority}
                                    <select
                                        className='select-field'
                                        value={selectedPartners[index]}
                                        onChange={(e) => handlePartnerChange(index, e.target.value)}
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
                        <RuleRow initialRows={conditions} setConditions={setConditions} />
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
