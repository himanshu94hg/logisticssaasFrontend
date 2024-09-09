import React, { useState } from 'react';
import AddHeaderMenu from './AddHeaderMenu';
import AddBanner from './AddBanner';
import TrackingPagePreview from './TrackingPagePreview'; // Preview component
import './PageSettings.css';

const PageSettings = () => {
    const [settings, setSettings] = useState({
        subdomain: '',
        websiteUrl: '',
        supportPhone: '',
        supportEmail: '',
        privacyPolicy: '',
        logoFile: '',
        showLogo: true,
        showSupportInfo: true,
        showPrivacyPolicy: true,
        bannerDesktop: '',
        bannerMobile: '',
        bannerAltText: '',
        bannerLink: '',
        showBanner: false,
        showMenu: false,
        menus: [{ name: '', link: '' }],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileUpload = (e) => {
        const { name, files } = e.target;
        setSettings({
            ...settings,
            [name]: URL.createObjectURL(files[0]),
        });
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMenus = [...settings.menus];
        updatedMenus[index][name] = value;
        setSettings({ ...settings, menus: updatedMenus });
    };

    const addMenu = () => {
        setSettings({ ...settings, menus: [...settings.menus, { name: '', link: '' }] });
    };

    const deleteMenu = (index) => {
        const updatedMenus = settings.menus.filter((_, i) => i !== index);
        setSettings({ ...settings, menus: updatedMenus });
    };

    const handleSave = () => {
        // Logic to save the settings (e.g., API call)
        console.log('Settings saved:', settings);
    };

    return (
        <div className="page-settings-container box-shadow shadow-sm p10">
            <h1>Customize Your Tracking Page</h1>
            <div className='d-flex gap-2 w-100'>
                <div className='w-100'>
                    {/* Subdomain and Contact Info Section */}
                    <div className="customization-form">
                        <label>
                            Subdomain:
                            <input
                                className='input-field'
                                type="text"
                                name="subdomain"
                                value={settings.subdomain}
                                onChange={handleChange}
                            />
                        </label>
                        <div className='two-column-inputs'>
                            <label>
                                Website URL:
                                <input
                                    className='input-field'
                                    type="text"
                                    name="websiteUrl"
                                    value={settings.websiteUrl}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Support Phone No:
                                <input
                                    className='input-field'
                                    type="text"
                                    name="supportPhone"
                                    value={settings.supportPhone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Support Email:
                                <input
                                    className='input-field'
                                    type="email"
                                    name="supportEmail"
                                    value={settings.supportEmail}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Privacy Policy Link:
                                <input
                                    className='input-field'
                                    type="text"
                                    name="privacyPolicy"
                                    value={settings.privacyPolicy}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div className="customization-form">
                        <label>
                            <input
                                type="checkbox"
                                name="showLogo"
                                checked={settings.showLogo}
                                onChange={handleChange}
                            />
                            Show Logo
                        </label>
                        {settings.showLogo && (
                            <label>
                                Upload Logo:
                                <input
                                    className='form-control input-field'
                                    type="file"
                                    name="logoFile"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        )}
                    </div>

                    {/* Banner Section */}
                    <div className="customization-form">
                        <label>
                            <input
                                type="checkbox"
                                name="showBanner"
                                checked={settings.showBanner}
                                onChange={handleChange}
                            />
                            Show Banner
                        </label>

                        {settings.showBanner && (
                            <AddBanner
                                bannerDesktop={settings.bannerDesktop}
                                bannerMobile={settings.bannerMobile}
                                bannerAltText={settings.bannerAltText}
                                bannerLink={settings.bannerLink}
                                handleChange={handleChange}
                                handleFileUpload={handleFileUpload}
                            />
                        )}
                    </div>

                    {/* Menu Section */}
                    <div className="customization-form">
                        <label>
                            <input
                                type="checkbox"
                                name="showMenu"
                                checked={settings.showMenu}
                                onChange={handleChange}
                            />
                            Add Header Menu
                        </label>

                        {settings.showMenu && (
                            <AddHeaderMenu
                                menus={settings.menus}
                                handleMenuChange={handleMenuChange}
                                addMenu={addMenu}
                                deleteMenu={deleteMenu}
                            />
                        )}
                    </div>
                    {/* Save Button */}
                    <div className="save-button-container">
                        <button className='btn main-button' onClick={handleSave}>Save Settings</button>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="live-preview w-100">
                    <TrackingPagePreview settings={settings} />
                </div>
            </div>
        </div>
    );
};

export default PageSettings;
