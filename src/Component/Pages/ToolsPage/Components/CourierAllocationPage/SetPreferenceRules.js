import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RuleRow from './RuleRow';
import './SetPreferenceRules.css';
import AddRuleSidePanel from './AddRuleSidePanel';
import { BASE_URL_CORE } from '../../../../../axios/config';

import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

const SetPreferenceRules = ({ activeTab }) => {
    const dispatch = useDispatch();
    const [rulePanel, setRulePanel] = useState(false);
    const [ruleName, setRuleName] = useState('');
    const [priority, setPriority] = useState('');
    const [selectedPartners, setSelectedPartners] = useState(Array(4).fill(''));
    const [conditions, setConditions] = useState([]);
    const [editingRuleId, setEditingRuleId] = useState(null);
    const [isActive, setIsActive] = useState([]);
    const [allRules, setAllRules] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [onRowsChange, setOnRowsChange] = useState([]);
    const authToken = Cookies.get('access_token');
    const [preferData, setPreferData] = useState([])
    const [refresh, setRefresh] = useState("")

    const courierRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleData);
    const courierEditRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleEditData);
    const courierPostRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRulePostData);
    const courierDeleteRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleDeleteData);
    const courierEditPostRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleEditPostData);
    const courierPartnerData = useSelector(state => state?.toolsSectionReducer?.courierPartnerData);


    useEffect(() => {
        if (courierRules?.data) {
            setAllRules(courierRules.data);
            initializeIsActiveState(courierRules.data);
        }
    }, [courierRules]);

    useEffect(() => {
        if (courierPostRules && courierPostRules.data && courierPostRules.data.status === true) {
            dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
            resetForm();
        }
    }, [courierPostRules]);

    useEffect(() => {
        if (courierDeleteRules && courierDeleteRules.data && courierDeleteRules.data.status === true) {
            dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
        }
    }, [courierDeleteRules]);

    useEffect(() => {
        if (courierEditPostRules && courierEditPostRules.data && courierEditPostRules.data.status === true) {
            dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
            resetForm();
        }
    }, [courierEditPostRules]);

    useEffect(() => {
        dispatch({ type: "COURIER_PARTNER_ACTION" });
    }, [dispatch]);


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
        let errors = {};
        let formIsValid = true;

        if (!ruleName) {
            formIsValid = false;
            errors["ruleName"] = "Rule Name cannot be empty";
        }

        // if (!priority) {
        //     formIsValid = false;
        //     errors["priority"] = "Priority cannot be empty";
        // }

        for (let i = 0; i < selectedPartners.length; i++) {
            if (!selectedPartners[i]) {
                formIsValid = false;
                errors["selectedPartners"] = "Partner should be selected for each priority";
                break;
            }
        }

        for (let i = 0; i < onRowsChange.length; i++) {
            const condition = onRowsChange[i];
            console.log('Validating condition:', condition);
            if (!condition.condition_type || !condition.match_type || !condition.match_value) {
                formIsValid = false;
                errors["conditions"] = "All condition fields are required!";
                break;
            }
        }

        if (!formIsValid) {
            setFormErrors(errors);
            return;
        }

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
            setTrigger(true)
        }
        setRulePanel(false);
        resetForm();
    };

    const resetForm = () => {
        setFormErrors({});
        setRuleName('');
        setPriority('');
        setSelectedPartners(Array(4).fill(''));
        setConditions([]);
    };

    useEffect(() => {
        if (activeTab === "Set preference Rules" || refresh) {
            dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
            setFormErrors({})
        }
    }, [activeTab, refresh]);

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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedRules = Array.from(allRules);
        const [movedRule] = reorderedRules.splice(result.source.index, 1);
        reorderedRules.splice(result.destination.index, 0, movedRule);

        setAllRules(reorderedRules);
    };

    useEffect(() => {
        if (rulePanel) {
            setFormErrors({})
        }
    }, [rulePanel])

    useEffect(() => {
        if (allRules) {
            const temp = []
            allRules?.map((item, index) => {
                temp.push({
                    rule_id: item.id,
                    position: index + 1
                })
            })
            setPreferData(temp)
        }
    }, [allRules])


    const handleSaveRule = async () => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/features/courier-allocation/rules/save-rule-positions/`, preferData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                toast.success('Priority updated successfully!');
                setRefresh(new Date())
            }
        } catch (error) {
            customErrorFunction(error);
        }
    }

    return (
        <>
            <div className='set-of-rules'>
                <p>Create Custom Courier Allocation Rules for Efficient Delivery Management.</p>
            </div>
            <div className={`d-flex mt-2 gap-3 ${allRules?.length > 0 ? 'justify-content-end w-100' : ''}`}>
                <button className='btn main-button' onClick={handleSaveRule}>Save Changes</button>
                <button className='btn main-button' onClick={addRuleRow}><FontAwesomeIcon icon={faPlus} />Add Rule</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="rules">
                    {(provided) => (
                        <div
                            className='create-rules-section'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {allRules?.map((rule, index) => (
                                <Draggable key={rule.id} draggableId={rule.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className='created-rules'
                                        >
                                            <div className='cr-rule-name'>
                                                <div className='rule-name'>
                                                    <p>Rule Name: {rule?.rule_name}</p>
                                                    <p>Priority: #{index + 1}</p>
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
                                                            <p>{condition.criteria}</p>
                                                            <p>{condition.match_type}</p>
                                                            <p className={`${rule?.preference_choices.length < 2 ? 'match-value-item' : ''}`}>{condition.match_value}</p>
                                                            <p className="rule-condition">{condition.condition_type}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='rule-preference text-capitalize'>
                                                    <p><span>01</span> <img src={rule?.courier_image_1} alt="" /> {rule?.priority_1}</p>
                                                    <p><span>02</span> <img src={rule?.courier_image_2} alt="" /> {rule?.priority_2}</p>
                                                    <p><span>03</span> <img src={rule?.courier_image_3} alt="" /> {rule?.priority_3}</p>
                                                    <p><span>04</span> <img src={rule?.courier_image_4} alt="" /> {rule?.priority_4}</p>
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
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="d-flex justify-content-end my-3">
                <button className='btn main-button' onClick={handleSaveRule}>Save Changes</button>

            </div>
            {/* Add Rule Side Panel */}
            <section className={`add-rule-panel ${rulePanel ? 'open' : ''}`}>
                <AddRuleSidePanel
                    setRulePanel={setRulePanel}
                    setRuleName={setRuleName}
                    ruleName={ruleName}
                    formErrors={formErrors}
                    priorityOptions={priorityOptions}
                    courierPartnerData={courierPartnerData}
                    priority={priority}
                    handlePriorityChange={handlePriorityChange}
                    selectedPartners={selectedPartners}
                    handlePartnerChange={handlePartnerChange}
                    RuleRow={RuleRow}
                    conditions={conditions}
                    setConditions={setConditions}
                    setOnRowsChange={setOnRowsChange}
                    handleSubmit={handleSubmit}
                />
            </section>
            <div onClick={() => setRulePanel(false)} className={`backdrop ${rulePanel ? 'd-block' : 'd-none'}`}></div>

        </>
    );
};

export default SetPreferenceRules;
