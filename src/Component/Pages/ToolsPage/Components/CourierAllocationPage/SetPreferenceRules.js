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
                            <div className='my-3'>
                                <RuleRow />
                            </div>
                            <div className='d-flex gap-3'>
                                {[1, 2, 3, 4].map(priority => (
                                    <label key={priority}>
                                        Priority {priority}
                                        <select
                                            className='select-field'
                                            name=""
                                            id=""
                                        >
                                            <option value="">Select</option>
                                            <option value="Shadowfax">Shadowfax</option>
                                            <option value="Delhivery">Delhivery</option>
                                            <option value="Other1">DTDC</option>
                                            <option value="Other2">Xpressbees</option>
                                        </select>
                                    </label>
                                ))}
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn delete-btn' onClick={() => deleteRuleRow(rule.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
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
