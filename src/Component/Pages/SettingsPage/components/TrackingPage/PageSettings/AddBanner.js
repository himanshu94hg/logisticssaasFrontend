import React from 'react';

const AddBanner = ({ banner_alt_text, banner_mobile, banner_desktop, banner_link, handleChange, handleFileUpload }) => {

    return (
        <>
            <label>
                Banner Image (Desktop):
                <input
                    className='form-control input-field'
                    type="file"
                    name="banner_desktop"
                    accept="image/*"
                    onChange={handleFileUpload}
                />
                {banner_desktop && <p style={{fontSize:12}}>Selected File: <span className='text-success'> {banner_desktop.slice(54)}</span></p>}
            </label>
            <label>
                Banner Image (Mobile):
                <input
                    className='form-control input-field'
                    type="file"
                    name="banner_mobile"
                    accept="image/*"
                    onChange={handleFileUpload}
                />
                {banner_mobile && <p style={{fontSize:12}}>Selected File: <span className='text-success'> {banner_mobile?.slice(54)}</span></p>}
            </label>
            <label>
                Banner Alt Text:
                <input
                    className='input-field'
                    type="text"
                    name="banner_alt_text"
                    value={banner_alt_text}
                    onChange={handleChange}
                />
            </label>
            <label>
                Banner Link:
                <input
                    className='input-field'
                    type="text"
                    name="banner_link"
                    value={banner_link}
                    onChange={handleChange}
                />
            </label>
        </>
    );
};

export default AddBanner;
