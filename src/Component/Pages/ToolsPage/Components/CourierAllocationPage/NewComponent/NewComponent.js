import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../CourierAllocationPage.css'
import NavTabs from '../navTabs/NavTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const initialPool = [
    { id: 'courier-1', name: 'Courier 1' },
    { id: 'courier-2', name: 'Courier 2' },
    { id: 'courier-3', name: 'Courier 3' },
    // Add more couriers as needed
];

const initialSequence = [];

const NewComponent = () => {
    const [activeTab, setActiveTab] = useState("Courier Preferences");

    const [pool, setPool] = useState(initialPool);
    const [sequence, setSequence] = useState(initialSequence);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'pool') {
                const items = Array.from(pool);
                const [movedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, movedItem);
                setPool(items);
            } else {
                const items = Array.from(sequence);
                const [movedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, movedItem);
                setSequence(items);
            }
        } else {
            const sourceItems = source.droppableId === 'pool' ? Array.from(pool) : Array.from(sequence);
            const destinationItems = destination.droppableId === 'pool' ? Array.from(pool) : Array.from(sequence);
            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);

            if (source.droppableId === 'pool') {
                setPool(sourceItems);
                setSequence(destinationItems);
            } else {
                setPool(destinationItems);
                setSequence(sourceItems);
            }
        }
    };

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
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    <img style={{ border: "1px solid #E3E3E3", borderRadius: "50%" }} src={courier?.name} alt={courier?.name} />
                                                    {courier.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="sequence">
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>Sequence</h2>
                                    {sequence.map((courier, index) => (
                                        <Draggable key={courier.id} draggableId={courier.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="courier"
                                                >
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    <img style={{ border: "1px solid #E3E3E3", borderRadius: "50%" }} src={courier?.name} alt={courier?.name} />
                                                    {courier.name}                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {/* </div>q */}
                    </DragDropContext>
                </div>
            </section>
        </>
    );
};

export default NewComponent