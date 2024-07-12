import axios from 'axios';
import Cookies from 'js-cookie';
import RuleRow from './RuleRow';
import './SetPreferenceRules.css';
import { toast } from 'react-toastify';
import AddRuleSidePanel from './AddRuleSidePanel';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_CORE } from '../../../../../axios/config';
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SetPreferenceRules = ({ activeTab }) => {
    const dispatch = useDispatch();
    const [rulePanel, setRulePanel] = useState(false);
    const [ruleName, setRuleName] = useState('');
    const [priority, setPriority] = useState('');
    const [selectedPartners1, setSelectedPartners1] = useState("");
    const [selectedPartners2, setSelectedPartners2] = useState("");
    const [selectedPartners3, setSelectedPartners3] = useState("");
    const [selectedPartners4, setSelectedPartners4] = useState("");
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
    const [loader, setLoader] = useState(false)
    const [ruleId, setRuleId] = useState('')
    const [show, setShow] = useState(false);

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
    }, []);

    useEffect(() => {
        if (activeTab === "Set preference Rules" || refresh) {
            dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
            setFormErrors({})
        }
    }, [activeTab, refresh]);

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
                    position: index + 1,
                    status: item.status
                })
            })
            setPreferData(temp)
        }
    }, [allRules])

    useEffect(() => {
        if (editingRuleId && courierEditRules && courierEditRules.data) {
            const rule = courierEditRules.data;
            setRuleName(rule.rule_name);
            setPriority(rule.priority);
            setSelectedPartners1(rule.priority_1);
            setSelectedPartners2(rule.priority_2);
            setSelectedPartners3(rule.priority_3);
            setSelectedPartners4(rule.priority_4);
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

    const initializeIsActiveState = (rules) => {
        const initialActiveState = rules.map(rule => rule.status);
        setIsActive(initialActiveState);
    };

    const handleToggle = (index, id, value) => {
        const newIsActive = [...isActive];
        newIsActive[index] = !newIsActive[index];
        setIsActive(newIsActive);
        setAllRules(prevRules =>
            prevRules.map(rule =>
                rule.id === id ? { ...rule, status: !rule.status } : rule
            )
        );
    };

    const addRuleRow = () => {
        setRulePanel(true);
        setEditingRuleId(null);
        setRuleName('');
        setPriority('');
        setSelectedPartners1("");
        setSelectedPartners2("");
        setSelectedPartners3("");
        setSelectedPartners4("");
        setConditions([]);
        dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
    };

    const [formType, setFormType] = useState("")

    const editRuleRow = (id, args) => {
        setFormType(args)
        setRulePanel(true);
        setEditingRuleId(id);
        dispatch({ type: "COURIER_ALLOCATION_RULE_EDIT_ACTION", payload: id });
    };

    const handleRuleDelete = (id) => {
        setRuleId(id)
        setShow(true)
    };

    const handleSubmit = () => {
        let errors = {};
        let formIsValid = true
        const selectedPartners = [selectedPartners1, selectedPartners2, selectedPartners3, selectedPartners4];
        const hasEmptyValue = selectedPartners.every(value => value === '');

        if (!ruleName) {
            formIsValid = false;
            errors["ruleName"] = "Rule Name cannot be empty";
        }
        if (hasEmptyValue) {
            formIsValid = false;
            errors.priority = "Atleast 1 Priority  is required!"
        }

        if (conditions.length > 0) {
            conditions.map((item, index) => {
                if (item.condition) {
                    formIsValid = false;
                    errors.conditions = "All fields are mandatory!";
                }
                if (!item.condition_type) {
                    formIsValid = false;
                    errors.conditions = "All fields are mandatory!";
                }
                if (!item.match_type) {
                    formIsValid = false;
                    errors.conditions = "All fields are mandatory!";
                }
                if (!item.match_value) {
                    formIsValid = false;
                    errors.conditions = "All fields are mandatory!";
                }
            });
        } else {
            formIsValid = false;
            errors.conditions = "At least one condition is required!";
        }


        if (!formIsValid) {
            setFormErrors(errors);
            return;
        }

        const requestData = {
            rule_name: ruleName,
            priority: priority,
            priority_1: selectedPartners1,
            priority_2: selectedPartners2,
            priority_3: selectedPartners3,
            priority_4: selectedPartners4,
            rules: conditions.map(item => ({
                condition: item.condition,
                condition_type: item.condition_type,
                match_type: item.match_type,
                match_value: item.match_value
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
        setSelectedPartners1("");
        setSelectedPartners2("");
        setSelectedPartners3("");
        setSelectedPartners4("");
        setConditions([]);
    };

    const handlePartnerChange = (e) => {
        const { name, value } = e.target
        if (name === "priority_1") {
            setSelectedPartners1(value)
        }
        if (name === "priority_2") {
            setSelectedPartners2(value)
        }
        if (name === "priority_3") {
            setSelectedPartners3(value)
        }
        if (name === "priority_4") {
            setSelectedPartners4(value)
        }
    };

    const handlePriorityChange = (e) => {
        const selectedValue = e.target.value;
        setPriority(selectedValue);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedRules = Array.from(allRules);
        const [movedRule] = reorderedRules.splice(result.source.index, 1);
        reorderedRules.splice(result.destination.index, 0, movedRule);
        setAllRules(reorderedRules);
    };

    const handleSaveRule = async () => {
        setLoader(true)
        if (preferData.length > 0) {
            try {
                const response = await axios.post(`${BASE_URL_CORE}/core-api/features/courier-allocation/rules/save-rule-positions/`, preferData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    toast.success('Rule Positions Saved Successfully!');
                    setRefresh(new Date())
                    setLoader(false)
                }
            } catch (error) {
                customErrorFunction(error);
                setLoader(false)
            }
        }
        else {
            toast.error("Please add rule first!")
            setLoader(false)
        }
    }

    const priorityOptions = Array.from({ length: allRules.length + 1 }, (_, index) => ({
        value: index + 1
    }));

    const handleClose = () => {
        setShow(false)
        setRuleId("")
    };

    const makeApiCall = () => {
        if (ruleId !== '') {
            const updatedRules = allRules.filter(rule => rule.id !== ruleId);
            setAllRules(updatedRules);
            dispatch({ type: "COURIER_ALLOCATION_RULE_DELETE_ACTION", payload: ruleId });
            setShow(false)
            setRuleId("")
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
                                                </div>
                                                <div className="toggle-switch">
                                                    <input
                                                        type="checkbox"
                                                        id={`toggle-${index}`}
                                                        checked={isActive[index]}
                                                        onChange={(e) => handleToggle(index, rule?.id, e.target.checked)}
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
                                                    <p><span>01</span> <img src={rule?.courier_image_1} alt="" /> {rule?.courier_title_1}</p>
                                                    <p><span>02</span> <img src={rule?.courier_image_2} alt="" /> {rule?.courier_title_2}</p>
                                                    <p><span>03</span> <img src={rule?.courier_image_3} alt="" /> {rule?.courier_title_3}</p>
                                                    <p><span>04</span> <img src={rule?.courier_image_4} alt="" /> {rule?.courier_title_4}</p>
                                                </div>
                                                <div className='rules-action-btn'>
                                                    <button className='btn main-button' onClick={() => editRuleRow(rule?.id, "edit-rule")}>
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
            {allRules.length > 10 &&
                <div className="d-flex justify-content-end my-3">
                    <button className='btn main-button' onClick={handleSaveRule}>Save Changes</button>
                </div>
            }
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
                    handlePartnerChange={handlePartnerChange}
                    RuleRow={RuleRow}
                    formType={formType}
                    conditions={conditions}
                    setConditions={setConditions}
                    setOnRowsChange={setOnRowsChange}
                    handleSubmit={handleSubmit}
                    selectedPartners1={selectedPartners1}
                    selectedPartners2={selectedPartners2}
                    selectedPartners3={selectedPartners3}
                    selectedPartners4={selectedPartners4}
                />
            </section>
            <div onClick={() => setRulePanel(false)} className={`backdrop ${rulePanel ? 'd-block' : 'd-none'}`}></div>
            <LoaderScreen loading={loader} />
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete the rule ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" className="px-5" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" className="px-5" onClick={makeApiCall}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default SetPreferenceRules;
