import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCourierRules = () => {
    const dispatch = useDispatch();
    const [allRules, setAllRules] = useState([]);
    const [isActive, setIsActive] = useState([]);
    const [editingRuleId, setEditingRuleId] = useState(null);

    const courierRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleData);
    const courierEditRules = useSelector(state => state?.toolsSectionReducer?.courierAllocationRuleEditData);
    const courierPartnerData = useSelector(state => state?.toolsSectionReducer?.courierPartnerData);

    useEffect(() => {
        if (courierRules?.data) {
            setAllRules(courierRules.data);
            initializeIsActiveState(courierRules.data);
        }
    }, [courierRules]);

    useEffect(() => {
        dispatch({ type: "COURIER_ALLOCATION_RULE_ACTION" });
    }, [dispatch]);

    const initializeIsActiveState = (rules) => {
        const initialActiveState = rules.map(rule => rule.status);
        setIsActive(initialActiveState);
    };

    return {
        allRules,
        setAllRules,
        isActive,
        setIsActive,
        editingRuleId,
        setEditingRuleId,
        courierEditRules,
        courierPartnerData
    };
};

export default useCourierRules;
