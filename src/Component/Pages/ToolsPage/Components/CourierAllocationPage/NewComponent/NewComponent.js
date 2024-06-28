import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../CourierAllocationPage.css';
import NavTabs from '../navTabs/NavTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import SetPreferenceRules from '../SetPreferenceRules';
import globalDebouncedClick from '../../../../../../debounce';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { has } from 'lodash';

const NewComponent = () => {
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("Courier Preferences");
    const [formData, setFormData] = useState(null);

    const [pool, setPool] = useState([]);
    const [sequenceOne, setSequenceOne] = useState([]);
    const [sequenceTwo, setSequenceTwo] = useState([]);
    let authToken = Cookies.get("access_token")


    console.log(pool,sequenceTwo,"this is a sequence pool data",sequenceOne)


    useEffect(() => {
        // Fetch data from API
        fetch('https://uat.shipease.in/core-api/features/courier-category-new/', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const poolData = data.find(item => item.title === "Buffer Pool")?.partners || [];
                const b2cData = data.find(item => item.title === "B2C")?.partners || [];
                const b2bData = data.find(item => item.title === "B2B")?.partners || [];

                setPool(poolData);
                setSequenceOne(b2cData);
                setSequenceTwo(b2bData);

            })
            .catch(error => console.error('Error fetching data:', error));
    }, [authToken, setPool, setSequenceOne, setSequenceTwo]);

    const onDragEnd = (result) => {
        // console.log(result,"resultresultresultresult")
        // return false
        const { source, destination, draggableId } = result;

        console.log(source, destination, draggableId, "ppppppppppppppppppp");

        if (!destination) return;

        const getList = (id) => {
            switch (id) {
                case '0':
                    return pool;
                case '1':
                    return sequenceOne;
                case '2':
                    return sequenceTwo;
                default:
                    return [];
            }
        };

        const setList = (id, items) => {
            switch (id) {
                case '0':
                    setPool(items);
                    break;
                case '1':
                    setSequenceOne(items);
                    break;
                case '2':
                    setSequenceTwo(items);
                    break;
                default:
                    break;
            }
        };

        const sourceItems = Array.from(getList(source.droppableId));
        const destinationItems = Array.from(getList(destination.droppableId));
        const [movedItem] = sourceItems.splice(source.index, 1);
        console.log(movedItem, "pppppppppppppppppppppppppppp")

        if(!(movedItem.courier_category_id.toString() === destination.droppableId.toString() || destination.droppableId.toString() === "0"))
        {
            alert('You can not move');
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = Array.from(getList(source.droppableId));
            const [movedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, movedItem);
            setList(source.droppableId, items);
        } else {
            const sourceItems = Array.from(getList(source.droppableId));
            const destinationItems = Array.from(getList(destination.droppableId));
            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);

            setList(source.droppableId, sourceItems);
            setList(destination.droppableId, destinationItems);
        }
    };

    const removeAllFromSequenceOne = () => {
        setPool([...pool, ...sequenceOne]);
        setSequenceOne([]);
    };

    const removeAllFromSequenceTwo = () => {
        setPool([...pool, ...sequenceTwo]);
        setSequenceTwo([]);
    };

    const handleSubmit = () => {
        dispatch({ type: "COURIER_ALLOCATION_PARTNER_POST_ACTION", payload: formData });
    }

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <section className={`courier-preference box-shadow shadow-sm white-block p10 mb-3 ${activeTab === "Courier Preferences" ? "d-block" : "d-none"}`}>
                <div className='courier-preference-list'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="0">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>Pool</h2>
                                    {pool.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    {courier.title}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="1">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between'>
                                        <h2 className='mb-0'>B2C</h2>
                                        <button className='btn main-button-outline' onClick={removeAllFromSequenceTwo}>Remove All</button>
                                    </div>
                                    {sequenceOne.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    {courier.title}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="2">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between'>
                                        <h2 className='mb-0'>B2B</h2>
                                        <button className='btn main-button-outline' onClick={removeAllFromSequenceOne}>Remove All</button>
                                    </div>
                                    {sequenceTwo.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    {courier.title}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    </DragDropContext>
                </div>
                <div className='cp-or-line'>
                    <hr />
                    <span>OR</span>
                </div>
                <div className='default-sorting-section'>
                    <label className='d-flex gap-3 align-items-center'>
                        Sort by default sorting options:
                        <select className='select-field' name="" id="">
                            <option value="">Select</option>
                            <option value="">Sort as Cheapest</option>
                            <option value="">Sort as Fastest</option>
                        </select>
                    </label>
                    <div>
                        <button className='btn main-button' onClick={() => globalDebouncedClick(() => handleSubmit())}>Save Courier Preference</button>
                    </div>
                </div>
            </section>

            <section className={`box-shadow shadow-sm white-block p10 mb-3 ${activeTab === "Set preference Rules" ? "d-block" : "d-none"}`}>
                <SetPreferenceRules />
            </section>
        </>
    );
};

export default NewComponent;