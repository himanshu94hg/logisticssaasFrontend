import React, { useState, useEffect } from 'react';
import NavTabs from './navTabs/NavTabs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './CourierAllocationPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import SetPreferenceRules from './SetPreferenceRules';
import { useDispatch, useSelector } from "react-redux";
import globalDebouncedClick from '../../../../../debounce';

const CourierAllocationPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null)
  const [activeTab, setActiveTab] = useState("Courier Preferences");
  const partnersData = useSelector(state => state?.toolsSectionReducer.courierAllocation);

  useEffect(() => {
    dispatch({ type: "COURIER_ALLOCATION_PARTNER_ACTION" });
  }, [dispatch]);

  useEffect(() => {
    const storedData = localStorage.getItem('partnersData');
    if (storedData) {
      dispatch({ type: "GET_COURIER_ALLOCATION_DATA", payload: JSON.parse(storedData) });
    }
  }, [dispatch]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const categoryIndex = parseInt(source.droppableId, 10);
      const newPartnersData = [...partnersData];
      const partners = newPartnersData[categoryIndex].partners;
      const [removed] = partners.splice(source.index, 1);
      partners.splice(destination.index, 0, removed);

      const formattedPayload = newPartnersData.reduce((acc, category) => {
        return acc.concat(category.partners.map((partner, index) => ({
          courier_category: category.id,
          partner: partner.id,
          priority: index + 1
        })));
      }, []);
      setFormData(formattedPayload)

    }
  };

  const handleSubmit = () => {
    dispatch({ type: "COURIER_ALLOCATION_PARTNER_POST_ACTION", payload: formData });
  }

  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={`courier-preference box-shadow shadow-sm white-block p10 mb-3 ${activeTab === "Courier Preferences" ? "d-block" : "d-none"}`}>
        <div className='courier-preference-list'>
          <DragDropContext onDragEnd={handleDragEnd}>
            {partnersData?.map((category, index) => (
              <div className='Weight-slab' key={category.id}>
                <h5>{category.title}</h5>
                <Droppable droppableId={index.toString()}>
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {category.partners.map((partner, index) => (
                        <Draggable key={partner.id.toString()} draggableId={partner.id.toString()} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                              <img style={{ border: "1px solid #E3E3E3", borderRadius: "50%" }} src={partner.image} alt="" />{partner.title}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            ))}
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
}

export default CourierAllocationPage;
