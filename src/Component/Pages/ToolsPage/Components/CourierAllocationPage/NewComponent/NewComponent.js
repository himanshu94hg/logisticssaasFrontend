import axios from 'axios';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';
import '../CourierAllocationPage.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import NavTabs from '../navTabs/NavTabs';
import SetPreferenceRules from '../SetPreferenceRules';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';

const NewComponent = () => {
    const [activeTab, setActiveTab] = useState("Courier Preferences");
    const [pool, setPool] = useState([]);
    const [sequenceOne, setSequenceOne] = useState([]);
    const [sequenceTwo, setSequenceTwo] = useState([]);
    let authToken = Cookies.get("access_token");
    const [allocatedData, setAllocatedData] = useState([]);

    useEffect(() => {
        if (activeTab === "Courier Preferences") {
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
                .catch((error) => {
                    customErrorFunction(error)
                });
        }
    }, [activeTab]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

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
            toast.error("You can not move")
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

    const handleClick = async () => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/tools/save-general-preference/`, allocatedData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success("Preference update successfully!")
            }
        } catch (error) {
            customErrorFunction(error)
        }
    }

    const debounceClick = useCallback(
        debounce(() => handleClick(), 700)
    )

    const handleSubmit = async () => {
        debounceClick()
    }


    useEffect(() => {
        if (sequenceOne || sequenceTwo) {
            const tempOne = sequenceOne?.map((item, index) => ({
                courier_category: item.courier_category_id,
                priority: index + 1,
                partner: item?.id
            })) || [];

            const tempTwo = sequenceTwo?.map((item, index) => ({
                courier_category: item.courier_category_id,
                priority: index + 1,
                partner: item?.id
            })) || [];

            const combined = [...tempOne, ...tempTwo];

            const uniqueCombined = combined.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.partner === item.partner
                ))
            )
            setAllocatedData(uniqueCombined);
        }
    }, [sequenceOne, sequenceTwo]);


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
