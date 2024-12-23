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


const tempdata = [
    {
        "id": 1,
        "title": "Standard",
        "price": "99",
        "description": "Default features",
        "rates": "28",
        "period": "365",
        "partners": "5",
        "warehouse_create": 2,
        "sales_channel": 5,
        "current_plan": false,
        "is_most_popular": true,
        "categories": [
            {
                "name": "Test89",
                "features": []
            },
            {
                "name": "Test Category By HB",
                "features": [
                    {
                        "name": "Sample",
                        "status": false
                    }
                ]
            },
            {
                "name": "Testing",
                "features": []
            },
            {
                "name": "sample",
                "features": [
                    {
                        "name": "Sample Feature",
                        "status": false
                    }
                ]
            },
            {
                "name": "Dashboard",
                "features": [
                    {
                        "name": "Test Feature Basic",
                        "status": true
                    }
                ]
            },
            {
                "name": "Test by Manoj",
                "features": [
                    {
                        "name": "Test Category Feature By Manoj",
                        "status": true
                    }
                ]
            },
            {
                "name": "Test",
                "features": []
            },
            {
                "name": "Test By Nitesh",
                "features": []
            },
            {
                "name": "Setting Page",
                "features": [
                    {
                        "name": "SKU Upload, Label Customize ,Manages Warehouse",
                        "status": false
                    }
                ]
            },
            {
                "name": "Category 2",
                "features": [
                    {
                        "name": "Test",
                        "status": false
                    },
                    {
                        "name": "Demo Test",
                        "status": false
                    }
                ]
            }
        ],
        "features": [
            {
                "name": "Test Feature By Satyam",
                "status": false
            },
            {
                "name": "Test by Nitesh",
                "status": true
            },
            {
                "name": "test new feature",
                "status": false
            },
            {
                "name": "Test Outside",
                "status": true
            }
        ]
    },
    {
        "id": 9,
        "title": "Pro",
        "price": "199.00",
        "description": "Pro Plan",
        "rates": "10",
        "period": "10",
        "partners": "10",
        "warehouse_create": 2,
        "sales_channel": 2,
        "current_plan": false,
        "is_most_popular": false,
        "categories": [
            {
                "name": "Test89",
                "features": []
            },
            {
                "name": "Test Category By HB",
                "features": [
                    {
                        "name": "Sample",
                        "status": false
                    }
                ]
            },
            {
                "name": "Testing",
                "features": []
            },
            {
                "name": "sample",
                "features": [
                    {
                        "name": "Sample Feature",
                        "status": false
                    }
                ]
            },
            {
                "name": "Dashboard",
                "features": [
                    {
                        "name": "Test Feature Basic",
                        "status": false
                    }
                ]
            },
            {
                "name": "Test by Manoj",
                "features": [
                    {
                        "name": "Test Category Feature By Manoj",
                        "status": false
                    }
                ]
            },
            {
                "name": "Test",
                "features": []
            },
            {
                "name": "Test By Nitesh",
                "features": []
            },
            {
                "name": "Setting Page",
                "features": [
                    {
                        "name": "SKU Upload, Label Customize ,Manages Warehouse",
                        "status": false
                    }
                ]
            },
            {
                "name": "Category 2",
                "features": [
                    {
                        "name": "Test",
                        "status": false
                    },
                    {
                        "name": "Demo Test",
                        "status": false
                    }
                ]
            }
        ],
        "features": [
            {
                "name": "Test Feature By Satyam",
                "status": false
            },
            {
                "name": "Test by Nitesh",
                "status": false
            },
            {
                "name": "test new feature",
                "status": false
            },
            {
                "name": "Test Outside",
                "status": false
            }
        ]
    },
    {
        "id": 10,
        "title": "Pro Plus",
        "price": "299",
        "description": "Test Pro Plus Plan on Dev Portal By Himanshu Batra",
        "rates": "2",
        "period": "5",
        "partners": "10",
        "warehouse_create": 2,
        "sales_channel": 2,
        "current_plan": true,
        "is_most_popular": false,
        "categories": [
            {
                "name": "Test89",
                "features": []
            },
            {
                "name": "Test Category By HB",
                "features": [
                    {
                        "name": "Sample",
                        "status": false
                    }
                ]
            },
            {
                "name": "Testing",
                "features": []
            },
            {
                "name": "sample",
                "features": [
                    {
                        "name": "Sample Feature",
                        "status": false
                    }
                ]
            },
            {
                "name": "Dashboard",
                "features": [
                    {
                        "name": "Test Feature Basic",
                        "status": false
                    }
                ]
            },
            {
                "name": "Test by Manoj",
                "features": [
                    {
                        "name": "Test Category Feature By Manoj",
                        "status": false
                    }
                ]
            },
            {
                "name": "Test",
                "features": []
            },
            {
                "name": "Test By Nitesh",
                "features": []
            },
            {
                "name": "Setting Page",
                "features": [
                    {
                        "name": "SKU Upload, Label Customize ,Manages Warehouse",
                        "status": false
                    }
                ]
            },
            {
                "name": "Category 2",
                "features": [
                    {
                        "name": "Test",
                        "status": false
                    },
                    {
                        "name": "Demo Test",
                        "status": false
                    }
                ]
            }
        ],
        "features": [
            {
                "name": "Test Feature By Satyam",
                "status": false
            },
            {
                "name": "Test by Nitesh",
                "status": false
            },
            {
                "name": "test new feature",
                "status": false
            },
            {
                "name": "Test Outside",
                "status": false
            }
        ]
    }
]

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
                {plans.slice(0, 3).map((plan, planIndex) => {
                    // Find the index of the current active plan
                    const currentPlanIndex = plans.findIndex((p) => p.current_plan);

                    return (
                        <div key={planIndex} className='plan-item'>
                            <div className='plan-item-heading'>
                                <h4>{plan.title}</h4>
                                <div className='plan-price-container'>
                                    <p className='plan-price'>{plan.price}<span> per month</span></p>
                                    <p className='plan-tag-line'>{plan.description}</p>
                                </div>
                            </div>
                            <div className='plans-features'>
                                {/* Button Logic */}
                                {plan.current_plan ? (
                                    <button className="btn change-plan active">Current Plan</button>
                                ) : (
                                    <>
                                        {planIndex < currentPlanIndex ? (
                                            <button className="btn change-plan downgrade">Downgrade</button>
                                        ) : (
                                            <button className="btn change-plan downgrade">Downgrade</button>
                                        )}
                                    </>
                                )}

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
                    );
                })}
            </div>

            <div className='book-demo-sec'>
                <p className='mb-0'>Grab It Fast to Get Special Price!</p>
                <button className='btn'>Book Demo Now!</button>
            </div>
        </section>
    );
};

export default BusinessPlanPageNew;
