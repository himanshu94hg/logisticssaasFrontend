import React from 'react';
import './TrackingPagePreview.css';
import ProgressBar from './ProgressBar';
import ShipmentProgress from './ShipmentProgress';

const TrackingPagePreview = ({ settings }) => {
    return (
        <div className="tracking-page-preview">
            <header>

                {/* Menu Preview */}
                {settings.show_menu && (
                    <nav className='menu-nav'>
                        <ul>
                            {settings.menus.map((menu, index) => (
                                <li key={index}>
                                    <a href={menu.link || '#'}>{menu.title || 'Menu'}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
                {settings.showBanner && (
                    <div className="banner-preview">
                        <a href={settings.banner_link || '#'}>
                            {settings.bannerDesktop && (
                                <img src={settings.banner_desktop} alt={settings.bannerAltText} className="banner-desktop" />
                            )}
                            {settings.bannerMobile && (
                                <img src={settings.banner_mobile} alt={settings.bannerAltText} className="banner-mobile" />
                            )}
                        </a>
                    </div>
                )}
                <div className='d-flex flex-column align-items-center'>
                    {settings.show_logo && settings.logo_file && (
                        <img src={settings.logo_file} alt="Logo" className="brand-logo mt-3" />
                    )}
                    <h1 className='mb-0 font20 mt-3'>Track Your Order</h1>
                </div>
                <ProgressBar />
            </header>



            <div className="tracking-info-preview">
                <div className='prview-info'>
                    <p>Order Number: <strong>Abcd-1234</strong></p>
                    <p>Order Date: <strong>1 Sep, 2024 || 10:00 AM</strong></p>
                    <p>Couier: <strong>Bluedart</strong></p>
                    <p>AWB number: <strong>GSWYU1234</strong></p>
                </div>
                <hr />
                <div className='prview-info'>
                    <ShipmentProgress />
                </div>
            </div>

            <div className='d-flex gap-3 mx-2 justify-content-between'>
                {settings.support_phone &&
                    <p><strong>Support Phone:</strong> {settings.support_phone}</p>
                }
                {
                    settings.supportEmail &&
                    <p><strong>Support Email:</strong> <a href={`mailto:${settings.support_email}`}>{settings.support_email}</a></p>
                }
                {settings.privacy_policy &&
                    <p><strong>Privacy Policy:</strong> <a href={settings.privacy_policy} target='_blank'>View</a></p>
                }
            </div>


            {/* Footer Preview */}
            {/* {settings.show_footer && (
                <nav className='footer-nav'>
                    <ul>
                        {settings.footerLinks.map((menu, index) => (
                            <li key={index}>
                                <a href={menu.link || '#'} target='_blank'>{menu.name || 'Link'}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )} */}
        </div>


    );
};

export default TrackingPagePreview;
