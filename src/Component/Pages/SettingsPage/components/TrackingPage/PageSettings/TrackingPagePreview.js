import React from 'react';
import './TrackingPagePreview.css';
import ProgressBar from './ProgressBar';
import ShipmentProgress from './ShipmentProgress';
import FeedbackForm from './FeedbackForm';
import ProductCarousel from './ProductCarousel';
import ShipeaseLogo from '../../../../../../assets/image/logo/logo.svg'

const TrackingPagePreview = ({ settings }) => {
    return (
        <div className="tracking-page-preview">
            <header>
                <nav className='menu-nav'>
                    <div className="logo">
                        {settings.show_logo && settings.logo_file && (
                            <img src={settings.logo_file} alt="Logo" className="brand-logo" />
                        )}
                    </div>
                    {/* Menu Preview */}
                    {settings.show_menu && (
                        <ul>
                            {settings.menus.map((menu, index) => (
                                <li key={index}>
                                    <a href={menu.link || '#'}>{menu.title || 'Menu'}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
                {settings.show_banner && (
                    <div className="banner-preview">
                        <a href={settings.banner_link || '#'}>
                            {settings.banner_desktop && (
                                <img src={settings.banner_desktop} alt={settings.banner_alt_text} className="banner-desktop" />
                            )}
                            {settings.banner_mobile && (
                                <img src={settings.banner_mobile} alt={settings.banner_alt_text} className="banner-mobile" />
                            )}
                        </a>
                    </div>
                )}
                <div className='d-flex flex-column align-items-center mt-3'>
                    <h1 className='title'>Estimated Time Of Delivery: October 21, 2024</h1>
                </div>
                <ProgressBar />
            </header>
            <div className="tracking-info-preview">
                <FeedbackForm />
                <hr />
                <ShipmentProgress />
            </div>
            <div>
                {/* <ProductCarousel /> */}
            </div>

            <div className='footer'>
                <div className="support-info">
                    {
                        settings.support_phone &&
                        <>
                            <p>
                                <strong>Support Phone:</strong> {settings.support_phone}
                            </p>
                            {(settings.support_email || settings.privacy_policy) &&
                                <span> || </span>
                            }
                        </>
                    }
                    {
                        settings.support_email &&
                        <>
                            <p>
                                <strong>Email us at:</strong>
                                <a href={`mailto:${settings.support_email}`}>{settings.support_email}</a>
                            </p>
                            {settings.privacy_policy &&
                                <span> || </span>
                            }

                        </>
                    }
                    {settings.privacy_policy &&
                        <>
                            <a href={settings.privacy_policy}><strong>Privacy Policy</strong></a>
                        </>
                    }
                </div>
                <div className="powered-by">
                    Powered By <img src={ShipeaseLogo} height="25px" alt="" />
                </div>
            </div>

        </div >
    );
};

export default TrackingPagePreview;
