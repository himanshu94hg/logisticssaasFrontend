import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import NavTabs from '../navTabs/NavTabs';
import SetPreferenceRules from '../SetPreferenceRules';
import DragIcon from '../../../../../common/Icons/DragIcon';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import '../CourierAllocationPage.css';
import LoaderScreen from '../../../../../LoaderScreen/LoaderScreen';

const DROPPABLE_IDS = {
    POOL: '0',
    B2C: '1',
    B2B: '2',
};

const TABS = {
    COURIER_PREFERENCES: 'Courier Preferences',
    SET_PREFERENCE_RULES: 'Set preference Rules',
};

const NewComponent = () => {
    const [activeTab, setActiveTab] = useState(TABS.COURIER_PREFERENCES);
    const [pool, setPool] = useState([]);
    const [loader, setLoader] = useState(false)
    const [sequenceOne, setSequenceOne] = useState([]);
    const [sequenceTwo, setSequenceTwo] = useState([]);
    const [allocatedData, setAllocatedData] = useState([]);
    const authToken = Cookies.get('access_token');


    useEffect(() => {
        setLoader(true)
        if (activeTab) {
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }
    }, [activeTab])

    useEffect(() => {
        if (activeTab === TABS.COURIER_PREFERENCES) {
            fetch(`${BASE_URL_CORE}/core-api/features/courier-category-new/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setPool(data.find((item) => item.title === 'Buffer Pool')?.partners || []);
                    setSequenceOne(data.find((item) => item.title === 'B2C')?.partners || []);
                    setSequenceTwo(data.find((item) => item.title === 'B2B')?.partners || []);
                })
                .catch(customErrorFunction);
        }
    }, [activeTab, authToken]);

    const getList = (id) => {
        switch (id) {
            case DROPPABLE_IDS.POOL:
                return pool;
            case DROPPABLE_IDS.B2C:
                return sequenceOne;
            case DROPPABLE_IDS.B2B:
                return sequenceTwo;
            default:
                return [];
        }
    };

    const setList = (id, items) => {
        switch (id) {
            case DROPPABLE_IDS.POOL:
                setPool(items);
                break;
            case DROPPABLE_IDS.B2C:
                setSequenceOne(items);
                break;
            case DROPPABLE_IDS.B2B:
                setSequenceTwo(items);
                break;
            default:
                break;
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceItems = Array.from(getList(source.droppableId));
        const destinationItems = Array.from(getList(destination.droppableId));
        const [movedItem] = sourceItems.splice(source.index, 1);

        if (movedItem.courier_category_id.toString() !== destination.droppableId.toString() && destination.droppableId !== DROPPABLE_IDS.POOL) {
            toast.error(`This Courier doesn't belong to ${destination.droppableId === DROPPABLE_IDS.B2C ? 'B2C' : 'B2B'} category`);
            return;
        }

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, movedItem);
            setList(source.droppableId, sourceItems);
        } else {
            destinationItems.splice(destination.index, 0, movedItem);
            setList(source.droppableId, sourceItems);
            setList(destination.droppableId, destinationItems);
        }
    };

    const removeAllFromSequence = (sequence, setSequence) => {
        setPool([...pool, ...sequence]);
        setSequence([]);
    };

    const handleClick = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/tools/save-general-preference/`, allocatedData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Preference updated successfully!');
                setLoader(false)
            }
        } catch (error) {
            customErrorFunction(error);
            setLoader(false)
        }
    };

    const debounceClick = useCallback(debounce(handleClick, 700), [allocatedData]);

    const handleSubmit = async () => {
        debounceClick();
    };

    useEffect(() => {
        const tempOne = sequenceOne?.map((item, index) => ({
            courier_category: item.courier_category_id,
            priority: index + 1,
            partner: item?.id,
        })) || [];

        const tempTwo = sequenceTwo?.map((item, index) => ({
            courier_category: item.courier_category_id,
            priority: index + 1,
            partner: item?.id,
        })) || [];

        const combined = [...tempOne, ...tempTwo];
        const uniqueCombined = combined.filter(
            (item, index, self) => index === self.findIndex((t) => t.partner === item.partner)
        );

        setAllocatedData(uniqueCombined);
    }, [sequenceOne, sequenceTwo]);

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <section className={`courier-preference box-shadow shadow-sm p10 ${activeTab === TABS.COURIER_PREFERENCES ? 'd-block' : 'd-none'}`}>
                <div className='courier-preference-list'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={DROPPABLE_IDS.POOL}>
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between mb-3'>
                                        <h2 className='mb-0'>Pool</h2>
                                    </div>
                                    <div className='couriers-list'>
                                        {pool.map((courier, index) => (
                                            <Draggable key={courier.id} draggableId={courier.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="courier"
                                                    >
                                                        <span><DragIcon /></span><img src={courier.image} alt="" />{courier.title}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId={DROPPABLE_IDS.B2C}>
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between mb-3'>
                                        <h2 className='mb-0'>B2C</h2>
                                        <button className='btn main-button-outline' onClick={() => removeAllFromSequence(sequenceOne, setSequenceOne)}>Remove All</button>
                                    </div>
                                    <div className='couriers-list'>
                                        {sequenceOne.map((courier, index) => (
                                            <Draggable key={courier.id} draggableId={courier.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="courier"
                                                    >
                                                        <span><DragIcon /></span><img src={courier.image} alt="" />{courier.title}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId={DROPPABLE_IDS.B2B}>
                            {(provided) => (
                                <div className="Weight-slab" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className='d-flex gap-2 align-items-center justify-content-between mb-3'>
                                        <h2 className='mb-0'>B2B</h2>
                                        <button className='btn main-button-outline' onClick={() => removeAllFromSequence(sequenceTwo, setSequenceTwo)}>Remove All</button>
                                    </div>
                                    <div className='couriers-list'>
                                        {sequenceTwo.map((courier, index) => (
                                            <Draggable key={courier.id} draggableId={courier.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="courier"
                                                    >
                                                        <span><DragIcon /></span><img src={courier.image} alt="" /> {courier.title}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
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
                        <select className='select-field'>
                            <option value="">Select</option>
                            <option value="">Sort as Cheapest</option>
                            <option value="">Sort as Fastest</option>
                        </select>
                    </label>
                    <div>
                        <button className='btn main-button' onClick={handleSubmit}>Save Courier Preference</button>
                    </div>
                </div>
            </section>
            <section className={`box-shadow shadow-sm white-block p10 mb-3 ${activeTab === TABS.SET_PREFERENCE_RULES ? 'd-block' : 'd-none'}`}>
                <SetPreferenceRules activeTab={activeTab} />
            </section>
            <LoaderScreen loading={loader} />
        </>
    );
};

export default NewComponent;
