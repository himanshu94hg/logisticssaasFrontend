import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CourierList = () => {
  const initialCouriers = ['Courier 1', 'Courier 2', 'Courier 3']; // Initial order
  const [couriers, setCouriers] = useState(initialCouriers);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const newCouriers = Array.from(couriers);
    const [removed] = newCouriers.splice(result.source.index, 1);
    newCouriers.splice(result.destination.index, 0, removed);

    setCouriers(newCouriers);
  };

  const handleReset = () => {
    setCouriers(initialCouriers);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="couriers">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {couriers.map((courier, index) => (
                <Draggable key={courier} draggableId={courier} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {courier}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default CourierList;
