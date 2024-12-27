import axios from 'axios';
import Cookies from "js-cookie";
import ListIcon from './ListIcon';
import './BusinessPlanPageNew.css';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import ListCrossIcon from './ListCrossIcon';
import React, { useEffect, useState } from 'react';
import { BASE_URL_CORE } from '../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../../customFunction/errorHandling';


const BusinessPlanPageNew = () => {
    const dispatch = useDispatch()
    const [plans, setPlans] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const token = Cookies.get('access_token');
    const [planId, setPlanId] = useState("");
    const [refresh, setRefresh] = useState(null);
    const [activeHeading, setActiveHeading] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/subscriptions/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setPlans(response.data);
                }
            } catch (error) {
                customErrorFunction(error);
            }
        };
        fetchPlans();
    }, [token, refresh]);

    const toggleActiveHeading = (index) => {
        setActiveHeading((prev) => (prev === index ? null : index));
    };

    const [planType, setPlanType] = useState('')

    const hanldeShow = (id, isPlan, planTy) => {
        setPlanId(id)
        setPlanType(planTy)
        if (!isPlan) {
            setShow(true)
        }
    }

    const handleSubmit = async () => {
        setShow(false);
        if (planType !== "Downgrade" && planId !== null) {
            try {
                const payload = { plan_id: planId };
                const response = await axios.post(
                    `${BASE_URL_CORE}/core-api/seller/purchase-plan/`,
                    payload,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status === 200) {
                    toast.success("Plan purchased successfully!");
                    dispatch({ type: "PAYMENT_DATA_ACTION" });
                    setRefresh(new Date())
                }
            } catch (error) {
                customErrorFunction(error);
            }
        } else {
            toast.error("Can't update plan")
        }
    };


    return (
        <section className='business-plan-page-new'>
            <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
            <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
            <div className='plans-container'>
                {plans.slice(0, 3).map((plan, planIndex) => {
                    return (
                        <div key={planIndex} className='plan-item'>
                            <div className='plan-item-heading'>
                                <h4>{plan.title} {plan?.is_most_popular && <span>Most Popular</span>}</h4>
                                <div className='plan-price-container'>
                                    <p className='plan-price'>{plan.price}<span> per month</span></p>
                                    <p className='plan-tag-line'>{plan.description}</p>
                                </div>
                            </div>
                            <div className='plans-features'>
                                <button className={`btn change-plan ${plan.current_plan ? "active" : ""}`} onClick={() => hanldeShow(plan.id, plan.current_plan, plan.button_label)}>{plan.button_label}</button>
                                <ul className='active my-3'>
                                    <li><span>₹{plan.rates || 0} Per/kg</span> Shipping Rates</li>
                                    <li><span>{plan.period} {plan.period == 0 ? "" : <>{plan.period > 1 ? "Day" : "Day"}</>}</span> Minimum Signup Period</li>
                                    <li><span>{plan.partners}{plan.partners > 1 && "+"}</span> Courier Partners</li>
                                    <li><span>{plan.warehouse_create}</span> Multiple Pickup Address</li>
                                    <li><span>{plan.sales_channel}</span> Sales Channel Integration</li>
                                </ul>
                                <hr />
                                {plan.categories?.map((category, categoryIndex) => (
                                    <div key={categoryIndex}>
                                        <p
                                            onClick={() => toggleActiveHeading(categoryIndex)}
                                            className={`list-heading ${activeHeading === categoryIndex ? 'active' : ''}`}
                                        >
                                            {category.name}
                                            <FontAwesomeIcon
                                                className={`${activeHeading === categoryIndex ? 'active' : ''}`}
                                                icon={faChevronDown}
                                            />
                                        </p>
                                        <ul className={`${activeHeading === categoryIndex ? 'active' : ''}`}>
                                            {category.features?.map((feature, featureIndex) => (
                                                <li key={featureIndex} className={feature.status ? '' : 'non-active'}>
                                                    {feature.status ? <ListIcon /> : <ListCrossIcon />}
                                                    {feature.name}
                                                </li>
                                            ))}
                                        </ul>
                                        <hr />
                                    </div>
                                ))}
                                <ul className='active mt-5'>
                                    {plan.features?.map((feature, featureIndex) => (
                                        <li key={featureIndex} className={feature.status ? '' : 'non-active'}>
                                            {feature.status ? <ListIcon /> : <ListCrossIcon />}
                                            {feature.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='book-demo-sec'>
                <p className='mb-0'>Grab It Fast to Get Special Price!</p>
                <button className='btn'>Book Demo Now!</button>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                className='confirmation-modal'
            >
                <Modal.Header>
                    <Modal.Title>Confirmation Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to upgrade the plan ?
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn main-button" onClick={handleSubmit} >Continue</button>
                    </div>
                </Modal.Footer>
            </Modal>

        </section>
    );
};

export default BusinessPlanPageNew;
