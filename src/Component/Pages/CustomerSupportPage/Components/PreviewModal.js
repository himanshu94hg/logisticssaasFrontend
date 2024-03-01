import React, { useRef } from 'react';
import "./previewModal.css"

// PreviewModal component
const PreviewModal = ({ fileUrl, onClose }) => {
    

        return (
            <div className="preview-modal-overlay">
                <div className="preview-modal">
                    <button onClick={onClose} className="close-preview">Close Preview</button>
                    {fileUrl.endsWith('.pdf') ? (
                        // Display PDF using an iframe
                        <iframe src={fileUrl} width="100%" height="500px" title="PDF Preview" />
                    ) : (
                        // Display image
                        <img src={fileUrl} alt="File Preview" />
                    )}
                </div>
            </div>
        );
    };

    export default PreviewModal;
