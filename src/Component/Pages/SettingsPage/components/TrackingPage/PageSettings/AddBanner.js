import React from 'react';

const AddBanner = ({ bannerDesktop, bannerMobile, bannerAltText, bannerLink, handleChange, handleFileUpload }) => {
    return (
        <>
            <label>
                Banner Image (Desktop):
                <input
                    className='form-control input-field'
                    type="file"
                    name="bannerDesktop"
                    accept="image/*"
                    onChange={handleFileUpload}
                />
            </label>
            <label>
                Banner Image (Mobile):
                <input
                    className='form-control input-field'
                    type="file"
                    name="bannerMobile"
                    accept="image/*"
                    onChange={handleFileUpload}
                />
            </label>
            <label>
                Banner Alt Text:
                <input
                    className='input-field'
                    type="text"
                    name="bannerAltText"
                    value={bannerAltText}
                    onChange={handleChange}
                />
            </label>
            <label>
                Banner Link:
                <input
                    className='input-field'
                    type="text"
                    name="bannerLink"
                    value={bannerLink}
                    onChange={handleChange}
                />
            </label>
        </>
    );
};

export default AddBanner;
