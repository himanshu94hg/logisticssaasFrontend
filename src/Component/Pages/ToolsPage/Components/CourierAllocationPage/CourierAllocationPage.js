import React, { useState } from 'react'
import NavTabs from './navTabs/NavTabs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './CourierAllocationPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const CourierAllocationPage = () => {
  const [activeTab, setActiveTab] = useState("Courier Preferences");
  const initialCouriers = [
    'courier_Blue Dart',
    'courier_Blue Dart Surface',
    'courier_Xpressbees',
    'courier_Xpressbees Surface',
    'courier_Ekart',
    'courier_Delhivery',
    'courier_DTDC',
    'courier_Ecom Express',
    'courier_ShadowFax',
  ];
  const [couriers, setCouriers] = useState(initialCouriers);

  const initialList1 = [
    'list1_Blue Dart',
    'list1_Blue Dart Surface',
    'list1_Xpressbees',
    'list1_Xpressbees Surface',
    'list1_Ekart',
    'list1_Delhivery',
    'list1_DTDC',
    'list1_Ecom Express',
    'list1_ShadowFax',
  ];
  const [list1, setList1] = useState(initialList1);

  const initialList2 = [
    'list2_Blue Dart',
    'list2_Blue Dart Surface',
    'list2_Xpressbees',
    'list2_Xpressbees Surface',
    'list2_Ekart',
    'list2_Delhivery',
    'list2_DTDC',
    'list2_Ecom Express',
    'list2_ShadowFax',
  ];
  const [list2, setList2] = useState(initialList2);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    switch (source.droppableId) {
      case 'couriers':
        const newCouriers = Array.from(couriers);
        const [removedCourier] = newCouriers.splice(source.index, 1);
        newCouriers.splice(destination.index, 0, removedCourier);
        setCouriers(newCouriers);
        break;
      case 'list1':
        const newList1 = Array.from(list1);
        const [removedList1] = newList1.splice(source.index, 1);
        newList1.splice(destination.index, 0, removedList1);
        setList1(newList1);
        break;
      case 'list2':
        const newList2 = Array.from(list2);
        const [removedList2] = newList2.splice(source.index, 1);
        newList2.splice(destination.index, 0, removedList2);
        setList2(newList2);
        break;
      default:
        break;
    }
  };

  const handleResetCouriers = () => {
    setCouriers(initialCouriers);
  };

  const handleResetList1 = () => {
    setList1(initialList1);
  };

  const handleResetList2 = () => {
    setList2(initialList2);
  };

  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={`courier-preference box-shadow shadow-sm white-block p10 ${activeTab === "Courier Preferences" ? "d-block" : "d-none"}`}>
        <div className='courier-preference-list'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className='Weight-slab'>
              <h5>For Weight 0 to 1.5</h5>
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
                            <FontAwesomeIcon icon={faEllipsisVertical} /> {courier}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <button className='btn main-button me-3' onClick={handleResetCouriers}>Sort As Cheapest</button>
              <button className='btn main-button' onClick={handleResetCouriers}>Sort As Fastest</button>
            </div>
            <div className='Weight-slab'>
              <h5>For Weight 0 to 1.5</h5>
              <Droppable droppableId="list1">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {list1.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FontAwesomeIcon icon={faEllipsisVertical} /> {item}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <button className='btn main-button me-3' onClick={handleResetList1}>Sort As Cheapest</button>
              <button className='btn main-button' onClick={handleResetList1}>Sort As Fastest</button>
            </div>
            <div className='Weight-slab'>
              <h5>For Weight 0 to 1.5</h5>
              <Droppable droppableId="list2">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {list2.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FontAwesomeIcon icon={faEllipsisVertical} /> {item}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <button className='btn main-button me-3' onClick={handleResetList2}>Sort As Cheapest</button>
              <button className='btn main-button' onClick={handleResetList2}>Sort As Fastest</button>
            </div>
          </DragDropContext>
        </div>
      </section>

      <section className={`box-shadow shadow-sm white-block p10 ${activeTab === "Set preference Rules" ? "d-block" : "d-none"}`}>

      </section>

    </>
  )
}

export default CourierAllocationPage;
