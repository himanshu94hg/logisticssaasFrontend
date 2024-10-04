import axios from 'axios';
import Cookies from 'js-cookie';
import HeartIcon from './HeartIcon';
import TruckIcon from './TruckIcon';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL_CORE } from '../../../../../axios/config';
import PackageMagnifyingIcon from './PackageMagnifyingIcon';
import Logo from '../../../../../assets/image/integration/whatsappIcon.png';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import TrackYourOrder from '../../../../../assets/image/whatsapp/TrackYourOrder.png';
import WhatsAppChatDomestic from '../../../../../assets/image/whatsapp/WhatsAppChatDomestic.png';
import NDRFlow from '../../../../../assets/image/whatsapp/NDRFlow.png';

const WhatsAppIntegration = () => {
    const [show, setShow] = useState(false);
    const [BotTabs, setBotTabs] = useState("Create Order");
    const authToken = Cookies.get("access_token");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(!show);

    const handleWhattsApp = async () => {
        setShow(false);
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/shipease-admin/other-integration/`, { integration_type: "whatsapp" }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success(response?.data.message);
            }
        } catch (error) {
            customErrorFunction(error);
        }
    };

    const handleHold = () => {
        toast.info("Functionality is not live now!");
    };

    const renderTabContent = (tab) => {
        switch (tab) {
            case "Create Order":
                return (
                    <>
                        <h5>Instant Order Creation</h5>
                        <p>No more hassle of filling long forms. Just provide the product name or code, and our WhatsApp bot will help you create an order swiftly, allowing you to focus more on growing your business.</p>
                    </>
                );
            case "book":
                return (
                    <>
                        <h5>Effortless Order Booking</h5>
                        <p>Simply select the product you need, and our WhatsApp bot will guide you through booking the order seamlessly. Experience a fast and straightforward order booking process right through your chat.</p>
                    </>
                );
            case "track":
                return (
                    <>
                        <h5>Real-Time Order Tracking</h5>
                        <p>Wondering where your order is? Just ask! Our WhatsApp bot provides real-time updates on your order status, ensuring that you know the exact delivery timeline without any guesswork.</p>
                    </>
                );
            case "NDR Flow":
                return (
                    <>
                        <h5>Non-Delivery Resolution (NDR) Assistance</h5>
                        <p>Having trouble with deliveries? Our WhatsApp bot helps you manage Non-Delivery Resolutions effortlessly, so that any delivery issues are resolved quickly, keeping your customers happy.</p>
                    </>
                );
            default:
                return null;
        }
    };

    const chatImages = {
        "Create Order": WhatsAppChatDomestic,
        book: WhatsAppChatDomestic,
        track: TrackYourOrder,
        "NDR Flow": NDRFlow
    };

    return (
        <>
            <div className='whatsapp'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>WhatsApp</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <section style={{ overflow: 'hidden' }} className='box-shadow shadow-sm p-3 my-3'>
                    <ul className='whatsapp-benefits'>
                        <li><HeartIcon />Enhance customer satisfaction by providing real-time updates to buyers.</li>
                        <li className='plus-middle'><hr /></li>
                        <li><TruckIcon />Facilitate timely and efficient deliveries with detailed brand information.</li>
                        <li className='plus-middle'><hr /></li>
                        <li><PackageMagnifyingIcon />Reduce customer inquiries by increasing the visibility of shipment details.</li>
                    </ul>
                    <div className='mt-5 d-flex flex-column align-items-center gap-3'>
                        <h5>Keep your buyers informed with live updates that have a <span>93%</span> read rate.</h5>
                        <p className='font30 py-2'>
                            <span className='text-sh-primary'>&#8377; 0.99</span> <span className='font12 ms-1'>/ message</span>
                            <button className='btn main-button ms-3' onClick={handleShow}>Activate Now</button>
                        </p>
                        <p className='font12 pt-2'>
                            <span className='fw-bold'>Note:</span> Customize real-time tracking updates to share with your buyers for just ₹0.99 per status. Get all status updates for only ₹6.93 per order. By default, all statuses will be selected. Prices are exclusive of GST and non-refundable.
                        </p>
                    </div>
                    <div className='mt-5 d-flex w-100'>
                        <div className='try-it-out'>
                            <div style={{ zIndex: '1' }}>
                                <h3 className='mb-3'>Experience It Now!</h3>
                                <h5 className='mb-2'>Enter your number to receive live tracking updates via WhatsApp.</h5>
                                <label className='whatsapp-get-started'>
                                    <input type="text" placeholder='Enter 10 Digit Mobile Number' />
                                    <button onClick={handleHold}>Get Demo Now</button>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h3>Seamless Experience with Our WhatsApp Bot</h3>
                        <p>Say hello to effortless shopping with our new WhatsApp Bot! Now, managing your orders is as easy as sending a message. Here’s how our WhatsApp integration can enhance your shopping experience:</p>
                        <div className='row'>
                            <div className='col-3'>
                                <iframe src="https://lottie.host/embed/e0f8cbb6-1125-43dc-bfe2-85d1f2515588/cQ51N3voCq.json"
                                    style={{ width: '320px', height: '320px', border: 'none' }}></iframe>
                            </div>

                            <div className='col-6'>
                                <ul className='additional-features-nav'>
                                    <li onClick={() => setBotTabs("Create Order")} className={`${BotTabs === "Create Order" && 'active'}`}>Create Order</li>
                                    <li onClick={() => setBotTabs("book")} className={`${BotTabs === "book" && 'active'}`}>Book Order</li>
                                    <li onClick={() => setBotTabs("track")} className={`${BotTabs === "track" && 'active'}`}>Track Order</li>
                                    <li onClick={() => setBotTabs("NDR Flow")} className={`${BotTabs === "NDR Flow" && 'active'}`}>NDR Flow</li>
                                </ul>
                                <div className="additional-features">
                                    {renderTabContent(BotTabs)}
                                    <div>
                                        <button className='btn main-button float-end' onClick={handleHold}>Activate Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 chat-window">
                                {chatImages[BotTabs] && <img src={chatImages[BotTabs]} alt="WhatsApp Chat Screen" />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                className='confirmation-modal'
            >
                <Modal.Header>
                    <Modal.Title>Confirmation Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to activate WhatsApp integration?
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn main-button" onClick={handleWhattsApp}>Continue</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WhatsAppIntegration;
