import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../CourierAllocationPage.css'
import NavTabs from '../navTabs/NavTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import SetPreferenceRules from '../SetPreferenceRules';
import globalDebouncedClick from '../../../../../../debounce';
import { useDispatch } from 'react-redux';
// import globalDebouncedClick from '../../../../../debounce';


const initialPool = [
    { id: 'courier-1', name: 'Courier 1' },
    { id: 'courier-2', name: 'Courier 2' },
    { id: 'courier-3', name: 'Courier 3' },
    { id: 'courier-4', name: 'Courier 4' },
    { id: 'courier-5', name: 'Courier 5' },
    { id: 'courier-6', name: 'Courier 6' },
    { id: 'courier-7', name: 'Courier 7' },
    { id: 'courier-8', name: 'Courier 8' },
    // Add more couriers as needed
];

const initialSequenceOne = [];
const initialSequenceTwo = [];

const NewComponent = () => {
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("Courier Preferences");
    const [formData, setFormData] = useState(null)

    const [pool, setPool] = useState(initialPool);
    const [sequenceOne, setSequenceOne] = useState(initialSequenceOne);
    const [sequenceTwo, setSequenceTwo] = useState(initialSequenceTwo);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const getList = (id) => {
            switch (id) {
                case 'pool':
                    return pool;
                case 'sequenceOne':
                    return sequenceOne;
                case 'sequenceTwo':
                    return sequenceTwo;
                default:
                    return [];
            }
        };

        const setList = (id, items) => {
            switch (id) {
                case 'pool':
                    setPool(items);
                    break;
                case 'sequenceOne':
                    setSequenceOne(items);
                    break;
                case 'sequenceTwo':
                    setSequenceTwo(items);
                    break;
                default:
                    break;
            }
        };

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
                        <Droppable droppableId="pool">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>Pool</h2>
                                    {pool.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    {courier.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="sequenceOne">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between'>
                                        <h2 className='mb-0'>B2B</h2>
                                        <button className='btn main-button-outline' onClick={removeAllFromSequenceOne}>Remove All</button>
                                    </div>
                                    {sequenceOne.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    {courier.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="sequenceTwo">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between'>
                                        <h2 className='mb-0'>B2C</h2>
                                        <button className='btn main-button-outline' onClick={removeAllFromSequenceTwo}>Remove All</button>
                                    </div>
                                    {sequenceTwo.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    {courier.name}
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
                        Sort by default sorting options
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

export default NewComponent