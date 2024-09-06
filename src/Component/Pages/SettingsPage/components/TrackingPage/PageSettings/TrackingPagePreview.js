import React from 'react';
import './TrackingPagePreview.css';

const TrackingPagePreview = ({ settings }) => {
    return (
        <div className="tracking-page-preview">
            <header>
                {settings.showLogo && settings.logoFile && (
                    <img src={settings.logoFile} alt="Logo" className="brand-logo" />
                )}
                <h1>{settings.subdomain ? `${settings.subdomain}.example.com` : 'Track Your Order'}</h1>

                {/* Menu Preview */}
                {settings.showMenu && (
                    <nav>
                        <ul>
                            {settings.menus.map((menu, index) => (
                                <li key={index}>
                                    <a href={menu.link || '#'}>{menu.name || 'Menu'}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </header>

            {settings.showBanner && (
                <div className="banner-preview">
                    <a href={settings.bannerLink || '#'}>
                        {settings.bannerDesktop && (
                            <img src={settings.bannerDesktop} alt={settings.bannerAltText} className="banner-desktop" />
                        )}
                        {settings.bannerMobile && (
                            <img src={settings.bannerMobile} alt={settings.bannerAltText} className="banner-mobile" />
                        )}
                    </a>
                </div>
            )}

            <div className="tracking-info-preview">
                {settings.showSupportInfo && (
                    <>
                        <p><strong>Support Phone:</strong> {settings.supportPhone || 'N/A'}</p>
                        <p><strong>Support Email:</strong> {settings.supportEmail || 'N/A'}</p>
                    </>
                )}
                {settings.showPrivacyPolicy && (
                    <p><strong>Privacy Policy:</strong> <a href={settings.privacyPolicy}>View</a></p>
                )}
            </div>
        </div>
    );
};

export default TrackingPagePreview;
