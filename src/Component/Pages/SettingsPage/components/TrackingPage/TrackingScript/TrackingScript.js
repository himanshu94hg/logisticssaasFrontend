import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './TrackingScript.css';

const TrackingScript = () => {
    const [script, setScript] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState(false);

    const generateScript = () => {
        const trackingScript = `
        <script>
        window.addEventListener('DOMContentLoaded', (event) => {
            var createOrderTrackCss = document.createElement('link');
            createOrderTrackCss.setAttribute('rel', 'stylesheet');
            createOrderTrackCss.setAttribute('href', 'https://app.shipease.in/assets/css/shipease_order_track.css');
            document.body.appendChild(createOrderTrackCss);

            var createOrderTrackScript = document.createElement('script');
            createOrderTrackScript.setAttribute('onload', 'changeElement()');
            createOrderTrackScript.setAttribute('src', 'https://app.shipease.in/assets/js/shipease_order_track.js');
            createOrderTrackScript.setAttribute('subdom', 'shipease');
            document.body.appendChild(createOrderTrackScript);
        });

        function changeElement() {
            document.getElementsByClassName('track-button-ship')[0].style.background = '';
            document.getElementsByClassName('track-button-ship')[0].style.color = '';
            document.getElementsByClassName('order-ship-box-ship')[0].style.backgroundColor = '';
            document.querySelector('.order-ship-box-ship h1').style.color = '';
            document.querySelector('.search-input-wrp-ship').style.backgroundColor = '';
            document.querySelector('.search-button-wrp-ship').style.color = '';
            document.querySelector('#input_search').style.setProperty('--c', '');
            document.querySelector('#input_search').style.color = '';
            document.querySelector('.search-button-wrp-ship').style.backgroundColor = '';
        }
        </script>
        `;
        setScript(trackingScript);
        setError(false); // Reset error when the script is generated
    };

    const handleCopy = () => {
        if (!script) {
            setError(true); // Show error if no script is generated
        } else {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <>
            <div className='box-shadow shadow-sm p10 tracking-script-page'>
                <div className='d-flex justify-content-between'>
                    <h4>Tracking Script</h4>
                    <button className='btn main-button' onClick={generateScript}>Generate Script</button>
                </div>

                <div className='mt-4'>
                    <h6 className='fw-bold'>Add this code in the Footer of the web page</h6>
                    <textarea
                        value={script}
                        placeholder='Click on Generate Script to get this script...'
                        disabled
                        className='input-field tracking-code-textarea'
                    />
                    <div className='d-flex justify-content-end w-100 mt-4 position-relative'>
                        <CopyToClipboard text={script} onCopy={handleCopy}>
                            <button className='btn main-button'>
                                Copy Tracking Code
                            </button>
                        </CopyToClipboard>
                        {isCopied && (
                            <div className='copy-feedback position-absolute'>
                                Copied to clipboard!
                            </div>
                        )}
                        {error && !script && (
                            <div className='error-feedback position-absolute'>
                                Please generate the script first.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrackingScript;
