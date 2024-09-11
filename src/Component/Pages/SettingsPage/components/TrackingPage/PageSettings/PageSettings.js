import axios from 'axios';
import './PageSettings.css';
import Cookies from 'js-cookie';
import AddBanner from './AddBanner';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import AddHeaderMenu from './AddHeaderMenu';
import { awsAccessKey } from '../../../../../../config';
import TrackingPagePreview from './TrackingPagePreview';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import { getFileData, uploadImageData } from '../../../../../../awsUploadFile';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';

const PageSettings = () => {
    const [errors, setErrors] = useState({})
    const authToken = Cookies.get("access_token");
    const [logoError, setLogoError] = useState("")

    const [settings, setSettings] = useState({
        subdomain: '',
        website_url: '',
        support_phone: '',
        support_email: '',
        privacy_policy: '',
        logo_file: '',
        show_logo: false,
        banner_desktop: '',
        banner_mobile: '',
        banner_alt_text: '',
        banner_link: '',
        show_banner: false,
        show_menu: false,
        show_footer: false,
        menus: [{ title: '', link: '' }],
        // footerLinks: [{ name: '', link: '' }],
    });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    

    const handleFileUpload = async (e) => {
        const { name, files } = e.target;
        console.log(e.target.name, e.target.files[0], 'this is a uploaded data')
        const file = e.target.files[0];
        const logoFileSize = parseFloat((file?.size / (1024 * 1024)).toFixed(2));

        console.log(logoFileSize, "logoFileSizelogoFileSize")

        if (name === "logo_file" || name === "banner_desktop" || name === "banner_mobile") {
            try {
                const responseData = await getFileData(`brandedTracking/${e.target.files[0].name.replace(/\s/g, "")}`);
                const awsUrl = responseData.data.url.url
                const formData = new FormData();
                formData.append('key', responseData.data.url.fields.key);
                formData.append('file', e.target.files[0]);
                formData.append('AWSAccessKeyId', awsAccessKey);
                formData.append('policy', responseData.data.url.fields.policy);
                formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
                const additionalData = await uploadImageData(awsUrl, formData);
                if (additionalData?.status == 204) {
                    const imageUrl = responseData?.data?.url?.url + "brandedTracking/" + e.target.files[0]?.name.replace(/\s/g, "")
                    setSettings({
                        ...settings,
                        [name]: imageUrl,
                    });
                }
            } catch (error) {
                customErrorFunction(error)
            }
        }
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMenus = [...settings.menus];
        updatedMenus[index][name] = value;
        setSettings({ ...settings, menus: updatedMenus });
    };

    const addMenu = () => {
        setSettings({ ...settings, menus: [...settings.menus, { title: '', link: '' }] });
    };

    const deleteMenu = (index) => {
        const updatedMenus = settings.menus.filter((_, i) => i !== index);
        setSettings({ ...settings, menus: updatedMenus });
    };



    const handleFooterLinkChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFooterLinks = [...settings.footerLinks];
        updatedFooterLinks[index][name] = value;
        setSettings({ ...settings, footerLinks: updatedFooterLinks });
    };

    const addFooterLink = () => {
        setSettings({ ...settings, footerLinks: [...settings.footerLinks, { title: '', link: '' }] });
    };

    const deleteFooterLink = (index) => {
        const updatedFooterLinks = settings.footerLinks.filter((_, i) => i !== index);
        setSettings({ ...settings, footerLinks: updatedFooterLinks });
    };

    const handleSave = async () => {
        const newErrors = {}
        if (!settings.subdomain) {
            newErrors.subdomain = "Subdomain is required!"
        }
        if (!settings.website_url) {
            newErrors.website_url = "Website url is required!"
        }
        if (!settings.support_phone) {
            newErrors.support_phone = "Phone no is required!"
        }
        if (!settings.support_email) {
            newErrors.support_email = "Subdomain is required!"
        }
        if (!settings.privacy_policy) {
            newErrors.privacy_policy = "Privacy Policy is required!"
        }
        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post(`${BASE_URL_CORE}/core-api/crm-app/page-settings/`, settings, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (response?.status === 201) {
                    toast.success(response?.data?.message);
                    setSettings({
                        subdomain: '',
                        website_url: '',
                        support_phone: '',
                        support_email: '',
                        privacy_policy: '',
                        logo_file: '',
                        show_logo: false,
                        banner_desktop: '',
                        banner_mobile: '',
                        banner_alt_text: '',
                        banner_link: '',
                        show_banner: false,
                        show_menu: false,
                        show_footer: false,
                        menus: [{ title: '', link: '' }],
                    })
                }
            } catch (error) {
                customErrorFunction(error);
            }
        }
    };

    const handleKeyPress = (e) => {
        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
        if (e.key === ' ' && e.target.value.endsWith(' ')) {
            e.preventDefault();
        } else if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }
    console.log(settings, "jjjjjjjjjjjjjjjjjjjjj")

    return (
        <div className="page-settings-container box-shadow shadow-sm p10">
            <h1>Customize Your Tracking Page</h1>
            <div className='d-flex gap-2 w-100'>
                <div className='w-100'>
                    {/* subdomain and Contact Info Section */}
                    <div className="customization-form">
                        <label>
                            Subdomain:
                            <input
                                type="text"
                                name="subdomain"
                                maxLength={100}
                                onChange={handleChange}
                                value={settings.subdomain}
                                onKeyPress={handleKeyPress}
                                className={`input-field ${errors.subdomain && 'input-field-error'}`}
                            />
                            {errors.subdomain && <span className="text-danger">{errors.subdomain}</span>}
                        </label>
                        <div className='two-column-inputs'>
                            <label>
                                Website URL:
                                <input
                                    type="text"
                                    maxLength={100}
                                    name="website_url"
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    value={settings.website_url}
                                    className={`input-field ${errors.website_url && 'input-field-error'}`}
                                />
                                {errors.website_url && <span className="text-danger">{errors.website_url}</span>}
                            </label>
                            <label>
                                Support Phone No:
                                <input
                                    type="text"
                                    maxLength={10}
                                    name="support_phone"
                                    onChange={handleChange}

                                    value={settings.support_phone}
                                    className={`input-field ${errors.support_email && 'input-field-error'}`}
                                    onKeyPress={(e) => {
                                        const allowedCharacters = /^[0-9\b.]+$/;
                                        if (!allowedCharacters.test(e.key)) {
                                            e.preventDefault()
                                        }
                                    }}
                                />
                                {errors.support_phone && <span className="text-danger">{errors.support_phone}</span>}
                            </label>
                            <label>
                                Support Email:
                                <input
                                    type="email"
                                    maxLength={100}
                                    name="support_email"
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    value={settings.support_email}
                                    className={`input-field ${errors.support_email && 'input-field-error'}`}
                                />
                                {errors.support_email && <span className="text-danger">{errors.support_email}</span>}
                            </label>
                            <label>
                                Privacy Policy Link:
                                <input
                                    type="text"
                                    maxLength={100}
                                    name="privacy_policy"
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    value={settings.privacy_policy}
                                    className={`input-field ${errors.privacy_policy && 'input-field-error'}`}
                                />
                                {errors.privacy_policy && <span className="text-danger">{errors.privacy_policy}</span>}
                            </label>
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div className="customization-form">
                        <label>
                            <input
                                type="checkbox"
                                name="show_logo"
                                checked={settings.show_logo}
                                onChange={handleChange}
                            />
                            Show Logo
                        </label>
                        {settings.show_logo && (
                            <>
                                <label>
                                    Upload Logo:
                                    <input
                                        className='form-control input-field'
                                        type="file"
                                        name="logo_file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                    {/* {logoError && <div className="custom-error">{logoError}</div>} */}
                                </label>
                            </>
                        )}
                    </div>

                    {/* Banner Section */}
                    <div className="customization-form add-banner-section">
                        <label>
                            <input
                                type="checkbox"
                                name="show_banner"
                                checked={settings.show_banner}
                                onChange={handleChange}
                            />
                            Show Banner
                        </label>

                        {settings.show_banner && (
                            <AddBanner
                                banner_desktop={settings.banner_desktop}
                                banner_mobile={settings.banner_mobile}
                                banner_alt_text={settings.banner_alt_text}
                                banner_link={settings.banner_link}
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
                                name="show_menu"
                                checked={settings.show_menu}
                                onChange={handleChange}
                            />
                            Add Header Menu
                        </label>
                        {settings.show_menu && (
                            <AddHeaderMenu
                                menus={settings.menus}
                                handleMenuChange={handleMenuChange}
                                addMenu={addMenu}
                                deleteMenu={deleteMenu}
                            />
                        )}
                    </div>

                    {/* Footer Section */}
                    {/* <div className="customization-form">
                        <label>
                            <input
                                type="checkbox"
                                name="showFooter"
                                checked={settings.showFooter}
                                onChange={handleChange}
                            />
                            Add Footer
                        </label>
                        {settings.show_footer && (
                            <AddHeaderMenu
                                menus={settings.footerLinks}
                                handleMenuChange={handleFooterLinkChange}
                                addMenu={addFooterLink}
                                deleteMenu={deleteFooterLink}
                            />
                        )}
                    </div> */}

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
