import axios from 'axios';
import Cookies from "js-cookie";
import ListIcon from './ListIcon';
import './BusinessPlanPageNew.css';
import ListCrossIcon from './ListCrossIcon';
import React, { useEffect, useState } from 'react';
import { BASE_URL_CORE } from '../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../../customFunction/errorHandling';

const BusinessPlanPageNew = () => {
    const token = Cookies.get('access_token');
    const [activeHeading, setActiveHeading] = useState(null);
    const [plans, setPlans] = useState([]);

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
    }, [token]);

    const toggleActiveHeading = (index) => {
        setActiveHeading((prev) => (prev === index ? null : index));
    };

    return (
        <section className='business-plan-page-new'>
            <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
            <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
            <div className='plans-container'>
                {plans.slice(0, 3).map((plan, planIndex) => (
                    <div key={planIndex} className='plan-item'>
                        <div className='plan-item-heading'>
                            <h4>{plan.title}</h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>{plan.price}<span> per month</span></p>
                                <p className='plan-tag-line'>{plan.description}</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            {(plan.current_plan && planIndex == 0) ?
                                <button className="btn change-plan active">Current Plan</button>
                                :
                                <>
                                    {planIndex === 1 && <button className="btn change-plan">Upgrade</button>}
                                    {planIndex === 2 && <button className="btn change-plan">Upgrade</button>}
                                </>
                            }
                           
                            <ul className='active my-3'>
                                <li><span>₹{plan.rates || 0} Per/kg</span> Shipping Rates</li>
                                <li><span>{plan.period} {plan.period == 0 ? "" : <>{plan.period > 1 ? "Months" : "Month"}</>}</span> Minimum Signup Period</li>
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
                ))}
            </div>

            <div className='book-demo-sec'>
                <p className='mb-0'>Grab It Fast to Get Special Price!</p>
                <button className='btn'>Book Demo Now!</button>
            </div>
        </section>
    );
};

export default BusinessPlanPageNew;
