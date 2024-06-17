import React, { useState } from 'react'
import './SettingsPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCrown } from '@fortawesome/free-solid-svg-icons'
import CompanyBG from '../../../assets/image/settingsBG/CompanyBG.png'
import AdressBG from '../../../assets/image/settingsBG/AdressBG.png'
import codBG from '../../../assets/image/settingsBG/codBG.png'
import BillingBG from '../../../assets/image/settingsBG/BillingBG.png'
import CourierBG from '../../../assets/image/settingsBG/CourierBG.png'
import LabelBG from '../../../assets/image/settingsBG/LabelBG.png'
import NotificationBG from '../../../assets/image/settingsBG/NotificationBG.png'
import ShipmentBG from '../../../assets/image/settingsBG/ShipmentBG.png'
import InternationalBG from '../../../assets/image/settingsBG/InternationalBG.png'
import UserRoleBG from '../../../assets/image/settingsBG/UserRoleBG.png'
import TrackingBG from '../../../assets/image/settingsBG/TrackingBG.png'
import ReturnBG from '../../../assets/image/settingsBG/codBG.png'
import ApiBG from '../../../assets/image/settingsBG/ApiBG.png'
import SubAccountBG from '../../../assets/image/settingsBG/SubAccountBG.png'
import PanelCustomizationBG from '../../../assets/image/settingsBG/PanelCustomization.png'
import { Link, useNavigate } from 'react-router-dom'
import Handle from 'rc-slider/lib/Handles/Handle'
import { BillingAddressPattern, LabelCustomizationPattern, ManageSubAccountPattern, ShipeaseBankDetailsPattern, ThemeCustomizationPattern, customerPattern, gstInvoicingPattern, manageWarehousesPattern } from '../../../Routes'

const SettingsPage = () => {

    let Navigate = useNavigate()

    const [ChangePasswordPop, setChangePasswordPop] = useState(false)

    const handleChangePasswordPop = () => {
        setChangePasswordPop(!ChangePasswordPop)
    }

    const handlePasswordSubmit = () => {
        setChangePasswordPop(!ChangePasswordPop)
    }

    return (
        <>
            <section className='row settings-page-container'>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Company</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate(customerPattern, { state: { activeTab: "Basic Information" } })}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Company Profile
                                    </li>
                                    <li onClick={() => Navigate(customerPattern, { state: { activeTab: "KYC Information" } })}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        KYC
                                    </li>
                                    <li onClick={handleChangePasswordPop}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Change Password
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={CompanyBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Pickup Address</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate(manageWarehousesPattern)}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Manage Pickup Addresses
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={AdressBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>COD Payments</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate(customerPattern, { state: { activeTab: "Account Information" } })}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Bank Details
                                    </li>
                                    {/* <li onClick={() => Navigate(customerPattern, { state: { activeTab: "KYC Information" } })}> */}
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Early COD
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Postpaid
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={codBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Label, Invoice & POD</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate(LabelCustomizationPattern)}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Customize Label
                                        <span className='paid-service'><FontAwesomeIcon icon={faCrown} /><span>Elite</span></span>
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Customize Invoice
                                        <span className='paid-service'><FontAwesomeIcon icon={faCrown} /><span>Elite</span></span>
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Proof of Delivery (POD)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={LabelBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Billing</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate(gstInvoicingPattern)}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        GSTIN Invoicing
                                    </li>
                                    <li onClick={() => Navigate(BillingAddressPattern)}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Billing Address
                                    </li>
                                    {/* <li onClick={() => Navigate(ShipeaseBankDetailsPattern)}> */}
                                    <li>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Shipease Bank Details
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={BillingBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Sub Accounts Management</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    {/* <li onClick={() => Navigate(ManageSubAccountPattern)}> */}
                                    <li>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Manage Sub Accounts
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={SubAccountBG} alt="SubAccountBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Panel Customization</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    {/* <li onClick={() => Navigate(ThemeCustomizationPattern)}> */}
                                    <li>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Theme
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Customization
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={PanelCustomizationBG} alt="SubAccountBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>User Role Management</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    {/* <li onClick={() => Navigate('/manage-user-role')}> */}
                                    <li>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Manage Users
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={UserRoleBG} alt="CompanyBG" />
                </div>

                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Notifications</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Buyer Communication
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Seller Notifications
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={NotificationBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Shipment Features</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Split Shipment
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        COD to Prepaid
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Order Verification
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Secure Shipment
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Activate Direct Ship
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        RTO Score
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Delivery Boost
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={ShipmentBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Tracking Page</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Page Settings
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Themes
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Promotional Banners
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Product Recommendation
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Header Links
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        NPS Report
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Tracking Script
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={TrackingBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Return</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Return Settings
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Refund Settings
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={ReturnBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>API</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Configure
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Webhooks
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={ApiBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>International Settings</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        KYC International
                                    </li>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        International Order Preference
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={InternationalBG} alt="CompanyBG" />
                </div>
                <div className="col main-container">
                    <div className='tile'>
                        <div className="tile-content">
                            <div className='tile-heading'>
                                <h3>Courier</h3>
                            </div>
                            <div className='tile-body'>
                                <ul>
                                    <li onClick={() => Navigate()}>
                                        <span className='icon-container'>
                                            <FontAwesomeIcon icon={faAnglesRight} />
                                        </span>
                                        Courier Selection
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img src={CourierBG} alt="CompanyBG" />
                </div>
            </section>

            <section className={`change-password-pop ${ChangePasswordPop && 'open'}`}>
                <div className='cp-header'>
                    <h5>Change Your Password Here!</h5>
                </div>
                <div className='cp-body'>
                    <label>
                        Current Password
                        <input placeholder='Enter your current password' className='input-field' type="password" />
                    </label>
                    <label>
                        New Password
                        <input placeholder='Enter your new Password' className='input-field' type="password" />
                    </label>
                    <label>
                        Confirm New Password
                        <input placeholder='Re-enter your new password' className='input-field' type="password" />
                    </label>
                    <div className='d-flex justify-content-end'>
                        <button onClick={handlePasswordSubmit} className='btn main-button'>Submit</button>
                    </div>
                </div>
            </section>
            <div onClick={handleChangePasswordPop} className={`backdrop ${!ChangePasswordPop && 'd-none'}`}></div>
        </>
    )
}

export default SettingsPage