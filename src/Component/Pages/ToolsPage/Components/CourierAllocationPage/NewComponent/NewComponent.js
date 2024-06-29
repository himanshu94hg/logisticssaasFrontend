import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../CourierAllocationPage.css';
import NavTabs from '../navTabs/NavTabs';
import SetPreferenceRules from '../SetPreferenceRules';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL_CORE } from '../../../../../../axios/config';

const NewComponent = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Courier Preferences");
    const [pool, setPool] = useState([]);
    const [sequenceOne, setSequenceOne] = useState([]);
    const [sequenceTwo, setSequenceTwo] = useState([]);
    let authToken = Cookies.get("access_token");
    const [dd, setDd] = useState([]);

    const [formData, setFormData] = useState([
        {
            id: 1,
            title: "B2C",
            weight: 500.0,
            partners: []
        },
        {
            id: 2,
            title: "B2B",
            weight: 500.0,
            partners: []
        }
    ]);

    useEffect(() => {
        fetch(`${BASE_URL_CORE}/core-api/features/courier-category-new/`, {
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
    }, [authToken]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
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

        if (!(movedItem.courier_category_id.toString() === destination.droppableId.toString() || destination.droppableId.toString() === "0")) {
            alert('You can not move');
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = Array.from(getList(source.droppableId));
            items.splice(destination.index, 0, movedItem);
            setList(source.droppableId, items);
        } else {
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
        setPool([...pool, ...sequenceOne]);
        setSequenceTwo([]);
    };



    useEffect(() => {
        setFormData((prev) => prev?.map(item =>
            item.title === "B2C" ? { ...item, partners: sequenceOne } : item
        ));
    }, [sequenceOne]);

    useEffect(() => {
        setFormData((prev) => prev?.map(item =>
            item.title === "B2B" ? { ...item, partners: sequenceTwo } : item
        ));
    }, [sequenceTwo]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/tools/save-general-preference/`, dd, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {

            }
        } catch (error) {

        }
    }
    

    useEffect(() => {
        if (sequenceOne || sequenceTwo) {
            const tempOne = sequenceOne?.map((item) => ({
                courier_category: item.courier_category_id,
                priority: item?.priority,
                partner: 1
            })) || [];
    
            const tempTwo = sequenceTwo?.map((item) => ({
                courier_category: item.courier_category_id,
                priority: item?.priority,
                partner: 2
            })) || [];
    
            const combined = [...tempOne, ...tempTwo];
    
            // Using a Map to keep unique objects based on courier_category and priority
            const uniqueCombined = combined.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.courier_category === item.courier_category && t.priority === item.priority
                ))
            );
    
            setDd(uniqueCombined);
        }
    }, [sequenceOne, sequenceTwo]);
    
    
    
            console.log(dd,  "this is a pool data")

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
                                        <button className='btn main-button-outline' onClick={removeAllFromSequenceOne}>Remove All</button>
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
                                        <button className='btn main-button-outline' onClick={() => removeAllFromSequenceTwo}>Remove All</button>
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
                        <button className='btn main-button' onClick={() => handleSubmit()}>Save Courier Preference</button>
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
