import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddRuleSidePanel = ({ setRulePanel, ruleName, setRuleName, formErrors, priorityOptions, courierPartnerData, priority, handlePriorityChange, selectedPartners, handlePartnerChange, RuleRow, conditions, setConditions, setOnRowsChange, handleSubmit }) => {
    return (
        <>
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
                        <input placeholder='Enter the rule name' className='input-field' type="text" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
                        <div className="custom-error">{formErrors["ruleName"]}</div>
                    </label>

                    <label>
                        Set Priority for this rule
                        <select className='select-field' value={priority} onChange={(e) => handlePriorityChange(e)}>
                            <option value="">Select Priority</option>
                            {priorityOptions?.map(option => (
                                <option key={option?.value} value={option?.value}>{option?.value}</option>
                            ))}
                        </select>
                        <div className="custom-error">{formErrors["priority"]}</div>
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
                                    {courierPartnerData?.data?.map((partner) => (
                                        <option key={partner.id} value={partner.keyword}>{partner.title}</option>
                                    ))}
                                </select>
                                <div className="custom-error">{formErrors["selectedPartners"]}</div>
                            </label>
                        ))}
                    </div>
                </div>
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