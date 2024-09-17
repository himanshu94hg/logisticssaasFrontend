import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddRuleSidePanel = ({ setRulePanel, formType, selectedPartners1, selectedPartners2, selectedPartners3, selectedPartners4, ruleName, setRuleName, formErrors, courierPartnerData, handlePartnerChange, RuleRow, conditions, setConditions, setOnRowsChange, handleSubmit }) => {

    return (
        <>
            <div id='sidepanel-closer' onClick={() => setRulePanel(false)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <section className='edit-order-header'>
                <div>
                    <h5 className='mb-0'>{formType ? "Edit" : "Create"} a rule to set preference for Courier!</h5>
                </div>
            </section>
            <section className='ar-panel-body'>
                <div className='rule-name-container'>
                    <label>
                        Rule Name
                        <input
                            type="text"
                            value={ruleName}
                            className={`input-field ${formErrors.ruleName && "input-field-error"} `}
                            placeholder='Enter the rule name'
                            onChange={(e) => setRuleName(e.target.value)}
                        />
                        <div className="custom-error">{formErrors["ruleName"]}</div>
                    </label>
                </div>
                <div style={{ width: '100%' }} className='mb-3'>
                    <div className='priority-container'>
                        <label >
                            Priority 1
                            <select
                                name={"priority_1"}
                                className={`select-field ${formErrors.priority && "input-field-error"} `}
                                value={selectedPartners1}
                                onChange={handlePartnerChange}
                            >
                                <option value="">Select Partner</option>
                                {courierPartnerData?.map((partner) => (
                                    <option key={partner.id} value={partner.keyword}>{partner.title}</option>
                                ))}
                            </select>
                        </label>
                        <label >
                            Priority 2
                            <select
                                name={"priority_2"}
                                className={`select-field ${formErrors.priority && "input-field-error"} `}
                                value={selectedPartners2}
                                onChange={handlePartnerChange}
                            >
                                <option value="">Select Partner</option>
                                {courierPartnerData?.map((partner) => (
                                    <option key={partner.id} value={partner.keyword}>{partner.title}</option>
                                ))}
                            </select>
                        </label>
                        <label >
                            Priority 3
                            <select
                                name={"priority_3"}
                                className={`select-field ${formErrors.priority && "input-field-error"} `}
                                value={selectedPartners3}
                                onChange={handlePartnerChange}
                            >
                                <option value="">Select Partner</option>
                                {courierPartnerData?.map((partner) => (
                                    <option key={partner.id} value={partner.keyword}>{partner.title}</option>
                                ))}
                            </select>
                        </label>
                        <label >
                            Priority 4
                            <select
                                name={"priority_4"}
                                className={`select-field ${formErrors.priority && "input-field-error"} `}
                                value={selectedPartners4}
                                onChange={handlePartnerChange}
                            >
                                <option value="">Select Partner</option>
                                {courierPartnerData?.map((partner) => (
                                    <option key={partner.id} value={partner.keyword}>{partner.title}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="py-3" style={{ color: "#FC3B3B", fontSize: 12 }}>{formErrors.priority}</div>
                <div className='ar-items-scroll mt-3 d-flex gap-3 flex-column position-relative'>
                    <RuleRow initialRows={conditions} setConditions={setConditions} formErrors={formErrors} setOnRowsChange={setOnRowsChange} />
                    <div className="text-danger mt-2 me-3 font12">{formErrors["conditions"]}</div>
                </div>
                <div className='d-flex justify-content-end my-3'>
                    <button onClick={handleSubmit} className='btn main-button'>Submit</button>
                </div>
            </section>
        </>
    )
}

export default AddRuleSidePanel